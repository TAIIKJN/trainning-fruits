import { Prisma, PrismaClient } from "@prisma/client";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Request,
  Route,
  Security,
  SuccessResponse,
} from "tsoa";
import HttpError from "../interfaces/http-error";
import HttpStatus from "../interfaces/http-status";

const prisma = new PrismaClient();

export interface Orders {
  OrderCode: string;
  CustomerUserName: string;
  EmployeeUserName: string;
  OrderDate: string;
  TotalPrice: number;
  State: string;
  TableId?: string;
  TypeService?: string;
  OrderDetail: OrderDetail[];
}

export interface OrderDetail {
  Discount: number;
  ProductId: string;
  Quantity: number;
  UnitPrice: string;
}

export interface OrdersUpdate {
  CustomerId: string;
  EmployeeId: string;
  OrderDate: string;
  TotalPrice: number;
  State: string;
  TableId?: string;
  TypeService?: string;
  OrderDetail: OrderDetailUpdate[];
}
export interface OrderDetailUpdate extends OrderDetail {
  Id?: string;
  OrderId?: string;
}
@Route("Order")
export class orderController extends Controller {
  @Get()
  public async getOrderAll() {
    const data = prisma.order.findMany({
      include: {
        OrderDetail: {
          include: {
            Product: true,
          },
        },
        Customer: true,
        Employee: true,
        Table: true,
      },
    });
    return data;
  }

  @Get("{id}")
  public async getOrderById(@Path() id: string) {
    const dataOrder = await prisma.order.findFirst({
      where: {
        Id: id,
      },
      include: {
        OrderDetail: true,
        Table: true,
      },
    });

    if (dataOrder) {
      return dataOrder;
    } else {
      return "ไม่พบข้อมูล";
    }
  }

  @Post()
  @Security("keycloak")
  @SuccessResponse("201", "Created")
  public async createOrder(
    @Body() requestBody: Orders,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isSupplier = req.user.role.some((item) => item === "supplier");

      if (isSupplier) {
        return "ผู้ใช้งานนี้ไม่สามารถเพิ่มข้อมูลได้";
      }

      const dataCustomer = await prisma.customer.findFirst({
        where: {
          UserName: requestBody.CustomerUserName,
        },
      });

      if (!dataCustomer) {
        return "ไม่พบข้อมูลลูกค้า";
      }

      const dataEmployee = await prisma.employee.findFirst({
        where: {
          UserName: requestBody.EmployeeUserName,
        },
      });

      if (!dataEmployee) {
        return "ไม่พบข้อมูลพนักงาน";
      }

      const code =
        requestBody.TypeService === "Dine-in"
          ? `D-${new Date()}`
          : `T-${new Date()}`;
      const dataOrder = await prisma.order.create({
        data: {
          OrderCode: code,
          CustomerId: dataCustomer?.Id,
          EmployeeId: dataEmployee?.Id,
          OrderDate: requestBody?.OrderDate,
          TotalPrice: requestBody?.TotalPrice,
          State: requestBody?.State,
          TypeService: requestBody.TypeService,
          TableId: requestBody.TableId,
        },
      });
      console.log("dataOrder", dataOrder);

      const orderDetailsData = await Promise.all(
        requestBody.OrderDetail.map(async (item) => {
          const product = await prisma.product.findFirst({
            where: {
              Id: item.ProductId,
            },
          });
          console.log("product", product);

          if (!product) {
            throw new Error(`ไม่พบข้อมูลสินค้า: ${item.ProductId}`);
          }

          return {
            Discount: item?.Discount,
            ProductId: product?.Id,
            Quantity: item?.Quantity,
            UnitPrice: item?.UnitPrice,
            OrderId: dataOrder.Id,
          };
        })
      );

      const dataOrderDetail = await prisma.orderDetail.createManyAndReturn({
        data: orderDetailsData,
      });

      console.log(dataOrder, dataOrderDetail);
      return { order: dataOrder, orderDetails: dataOrderDetail };
    } catch (e) {
      // ตรวจสอบข้อผิดพลาดจาก Prisma Client
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return { status: 400, message: `Prisma error: ${e.message}` };
      }
      // ในกรณีที่เกิดข้อผิดพลาดทั่วไป
      return { status: 500, message: "Internal server error", error: e };
    }
  }

  @Patch("{id}")
  @SuccessResponse("200", "Update")
  public async updateOrder(
    @Path() id: string,
    @Body() requestBody: OrdersUpdate
  ) {
    try {
      const statusOrder = ["Done", "done"];
      const dataCustomer = await prisma.customer.findFirst({
        where: {
          Id: requestBody.CustomerId,
        },
      });

      if (!dataCustomer) {
        return "ไม่พบข้อมูลลูกค้า";
      }

      const dataEmployee = await prisma.employee.findFirst({
        where: {
          Id: requestBody.EmployeeId,
        },
      });

      if (!dataEmployee) {
        return "ไม่พบข้อมูลพนักงาน";
      }

      const dataOrder = await prisma.order.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataOrder) {
        const dataOrder = await prisma.order.update({
          data: {
            TotalPrice: requestBody?.TotalPrice,
            State: requestBody?.State,
            TypeService: requestBody.TypeService,
            TableId: requestBody.TableId,
          },
          where: {
            Id: id,
          },
        });
        console.log("dataOrder", dataOrder);

        const dataOrderDetail = await Promise.all(
          requestBody.OrderDetail.map(async (item) => {
            const product = await prisma.product.findFirst({
              where: {
                Id: item.ProductId,
              },
            });
            console.log("product", product);

            if (!product) {
              throw new Error(`ไม่พบข้อมูลสินค้า: ${item.ProductId}`);
            }

            if (item.Id) {
              const dataDetail = await prisma.orderDetail.update({
                where: {
                  Id: item.Id,
                },
                data: {
                  Discount: item?.Discount,
                  ProductId: item?.ProductId,
                  Quantity: item?.Quantity,
                  UnitPrice: item?.UnitPrice,
                  OrderId: item.OrderId,
                },
              });

              if (statusOrder.includes(requestBody.State)) {
                let sumProductInStock = product.UnitsInStock - item.Quantity;
                let sumProductOnOrder = product.UnitsOnOrder + item.Quantity;

                await prisma.product.update({
                  where: {
                    Id: item?.ProductId,
                  },
                  data: {
                    UnitsInStock: sumProductInStock,
                    UnitsOnOrder: sumProductOnOrder,
                  },
                });
              }

              return dataDetail;
            } else {
              const dataDetail = await prisma.orderDetail.create({
                data: {
                  Discount: item?.Discount,
                  ProductId: product?.Id,
                  Quantity: item?.Quantity,
                  UnitPrice: item?.UnitPrice,
                  OrderId: dataOrder.Id,
                },
              });

              return dataDetail;
            }
          })
        );

        console.log(dataOrder, dataOrderDetail);

        return { order: dataOrder, orderDetails: dataOrderDetail };
      } else {
        return "ไม่พบข้อมูล";
      }
    } catch (e) {
      // ตรวจสอบข้อผิดพลาดจาก Prisma Client
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return { status: 400, message: `Prisma error: ${e.message}` };
      }
      // ในกรณีที่เกิดข้อผิดพลาดทั่วไป
      return { status: 500, message: "Internal server error", error: e };
    }
  }
}

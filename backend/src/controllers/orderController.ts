import { Prisma, PrismaClient } from "@prisma/client";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
} from "tsoa";

const prisma = new PrismaClient();

export interface Orders {
  CustomerId: string;
  EmployeeId: string;
  OrderDate: string;
  TotalPrice: number;
  Address: string;
  State: string;
  OrderDetail: OrderDetail[];
}

export interface OrderDetail {
  Discount: number;
  ProductId: string;
  Quantity: number;
  UnitPrice: string;
}

@Route("Order")
export class orderController extends Controller {
  @Get()
  public async getOrderAll() {
    const data = prisma.order.findMany({
      include: {
        OrderDetail: true,
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
      },
    });

    if (dataOrder) {
      return dataOrder;
    } else {
      return "ไม่พบข้อมูล";
    }
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async createOrder(@Body() requestBody: Orders) {
    try {
      const dataCustomer = await prisma.customer.findFirst({
        where: {
          Id: requestBody.CustomerId,
        },
      });

      if (!dataCustomer) {
        return "ไม่พบข้อมูลประเภทสินค้า";
      }

      const dataEmployee = await prisma.employee.findFirst({
        where: {
          Id: requestBody.EmployeeId,
        },
      });

      if (!dataEmployee) {
        return "ไม่พบข้อมูลพนักงาน";
      }

      const dataOrder = await prisma.order.create({
        data: {
          CustomerId: requestBody?.CustomerId,
          EmployeeId: requestBody?.EmployeeId,
          OrderDate: requestBody?.OrderDate,
          TotalPrice: requestBody?.TotalPrice,
          Address: requestBody?.Address,
          State: requestBody?.State,
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
  public async updateOrder(@Path() id: string, @Body() requestBody: Orders) {
    try {
      const dataOrder = await prisma.order.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataOrder) {
        const data = await prisma.order.update({
          data: {
            TotalPrice: requestBody?.TotalPrice,
            Address: requestBody?.Address,
            State: requestBody?.State,
          },
          where: {
            Id: id,
          },
        });
        console.log(data);
        return data;
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

  @Delete("{id}")
  @SuccessResponse("200", "Delete")
  public async deleteOrder(@Path() id: string) {
    const dataOrder = await prisma.order.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataOrder) {
      await prisma.order.delete({
        where: {
          Id: id,
        },
      });
      return `ลบข้อมูลสำเร็จ`;
    } else {
      return "ไม่พบข้อมูล";
    }
  }
}

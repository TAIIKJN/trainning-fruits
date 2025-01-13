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

export interface Produucts {
  categoryId: string;
  discontinued: boolean;
  productName: string;
  quantityPerUnit: string;
  supplierId: string;
  unitPrice: string;
  unitsInStock: number;
  unitsOnOrder: number;
}

@Route("Product")
export class productController extends Controller {
  @Get()
  @Security("keycloak")
  public async getProductAll(
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const roleUser = req.user.role;
      console.log("45 roleUser", roleUser);

      if (roleUser.includes("admin")) {
        const data = await prisma.product.findMany({
          include: {
            Category: true,
          },
        });
        return data;
      } else {
        const data = await prisma.product.findMany({
          where: {
            Discontinued: false,
          },
          include: {
            Category: true,
          },
        });
        return data;
      }
    } catch (e) {
      return e;
    }
  }

  @Get("{id}")
  public async getProductById(@Path() id: string) {
    try {
      const dataProduct = await prisma.product.findFirst({
        where: {
          Id: id,
        },
        include: {
          Category: true,
          Supplier: true,
        },
      });

      if (dataProduct) {
        return dataProduct;
      } else {
        return "ไม่พบข้อมูล";
      }
    } catch (e) {
      return e;
    }
  }

  @Post()
  @Security("keycloak")
  @SuccessResponse("201", "Created")
  public async createProduuct(
    @Body() requestBody: Produucts,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isCreate = req.user.role.some(
        (item) => item === "admin" || item === "supplier"
      );

      if (!isCreate) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถเพิ่มข้อมูลได้"
        );
      }

      const dataCategory = await prisma.category.findFirst({
        where: {
          Id: requestBody.categoryId,
        },
      });

      const dataSupplier = requestBody.supplierId
        ? await prisma.supplier.findFirst({
            where: {
              Id: requestBody.supplierId,
            },
          })
        : null;
      console.log("dataSupplier", dataSupplier, requestBody.supplierId);

      if (dataCategory) {
        const data = await prisma.product.create({
          data: {
            CategoryId: requestBody.categoryId,
            Discontinued: requestBody.discontinued,
            ProductName: requestBody.productName,
            QuantityPerUnit: requestBody.quantityPerUnit,
            SupplierId: dataSupplier?.Id,
            UnitPrice: requestBody.unitPrice,
            UnitsInStock: requestBody.unitsInStock,
            UnitsOnOrder: requestBody.unitsOnOrder,
          },
        });

        console.log(data);
        return data;
      } else {
        return "ไม่่พบข้อมุลประเภท";
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

  @Patch("{id}")
  @Security("keycloak")
  @SuccessResponse("200", "Update")
  public async updataProduuct(
    @Path() id: string,
    @Body() requestBody: Produucts,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isCreate = req.user.role.some(
        (item) => item === "admin" || item === "supplier"
      );

      if (!isCreate) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถแก้ไขข้อมูลได้"
        );
      }

      const dataProduct = await prisma.product.findFirst({
        where: {
          Id: id,
        },
        include: {
          Category: true,
        },
      });

      let dataCategory: string = dataProduct?.Category?.Id?.toString() ?? "";
      const idCategory = dataProduct?.Category?.Id !== requestBody.categoryId;
      if (idCategory) {
        const data = await prisma.category.findFirst({
          where: {
            Id: requestBody.categoryId,
          },
        });
        if (data?.Id) {
          dataCategory = data.Id.toString(); // ทำให้แน่ใจว่าเป็น string
        } else {
          // สามารถจัดการกรณีไม่พบ data ได้ที่นี่ เช่น การแสดงข้อความหรือจัดการกับ error
          console.log(
            "ไม่พบข้อมูล Category ที่มี Id: ",
            requestBody.categoryId
          );
        }
      }

      const dataSupplier = requestBody.supplierId
        ? await prisma.supplier.findFirst({
            where: {
              Id: requestBody.supplierId,
            },
          })
        : null;

      if (dataProduct && dataCategory !== "") {
        try {
          const data = await prisma.product.update({
            data: {
              CategoryId: requestBody.categoryId,
              Discontinued: requestBody.discontinued,
              ProductName: requestBody.productName,
              QuantityPerUnit: requestBody.quantityPerUnit,
              SupplierId: dataSupplier?.Id,
              UnitPrice: requestBody.unitPrice,
              UnitsInStock: requestBody.unitsInStock,
              UnitsOnOrder: requestBody.unitsOnOrder,
            },
            where: {
              Id: id,
            },
            include: {
              Category: true,
            },
          });

          console.log(data);
          return data;
        } catch (e) {
          // ตรวจสอบข้อผิดพลาดจาก Prisma Client
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return { status: 400, message: `Prisma error: ${e.message}` };
          }
          // ในกรณีที่เกิดข้อผิดพลาดทั่วไป
          return { status: 500, message: "Internal server error", error: e };
        }
      } else {
        return "ไม่่พบข้อมุล";
      }
    } catch (e) {
      return e;
    }
  }

  @Delete("{id}")
  @Security("keycloak")
  @SuccessResponse("200", "Delete")
  public async deleteProduct(
    @Path() id: string,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isCreate = req.user.role.some(
        (item) => item === "admin" || item === "supplier"
      );

      if (!isCreate) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถลบข้อมูลได้"
        );
      }

      const dataProduuct = await prisma.product.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataProduuct) {
        const data = await prisma.product.delete({
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
      return e;
    }
  }
}

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

export interface Produucts {
  categoryId: string;
  discontinued: number;
  productName: string;
  quantityPerUnit: string;
  reorderLevel: number;
  supplierId: string;
  unitPrice: string;
  unitsInStock: number;
  unitsOnOrder: number;
}

@Route("Product")
export class productController extends Controller {
  @Get()
  public async getProduuctAll() {
    const data = await prisma.product.findMany({
      include: {
        Category: true,
      },
    });
    return data;
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async createProduuct(@Body() requestBody: Produucts) {
    try {
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
            ReorderLevel: requestBody.reorderLevel,
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
  @SuccessResponse("200", "Update")
  public async updataProduuct(
    @Path() id: string,
    @Body() requestBody: Produucts
  ) {
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
        console.log("ไม่พบข้อมูล Category ที่มี Id: ", requestBody.categoryId);
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
            ReorderLevel: requestBody.reorderLevel,
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
  }

  @Delete("{id}")
  @SuccessResponse("200", "Delete")
  public async deleteProduct(@Path() id: string) {
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
  }
}

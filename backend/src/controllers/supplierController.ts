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

export interface Suppliers {
  address: string;
  city: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  country: string;
  fax: string;
  homePage: string;
  phone: string;
  postalCode: string;
  region: string;
}

@Route("Supplier")
export class supplierController extends Controller {
  @Get()
  public async getSupplierAll() {
    const data = await prisma.supplier.findMany({
      include: {
        Product: true,
      },
    });
    return data;
  }

  @Get("{id}")
  public async getSupplierById(@Path() id: string) {
    const dataSupplier = await prisma.supplier.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataSupplier) {
      return dataSupplier;
    } else {
      return "ไม่พบข้อมูล";
    }
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async createSupplier(@Body() requestBody: Suppliers) {
    try {
      const data = await prisma.supplier.create({
        data: {
          Address: requestBody.address,
          City: requestBody.city,
          CompanyName: requestBody.companyName,
          ContactName: requestBody.contactName,
          ContactTitle: requestBody.contactTitle,
          Country: requestBody.country,
          Fax: requestBody.fax,
          HomePage: requestBody.homePage,
          Phone: requestBody.phone,
          PostalCode: requestBody.postalCode,
          Region: requestBody.region,
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
  }

  @Patch("{id}")
  @SuccessResponse("200", "Update")
  public async updateSupplier(
    @Path() id: string,
    @Body() requestBody: Suppliers
  ) {
    try {
      const dataSupplier = await prisma.supplier.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataSupplier) {
        const data = await prisma.supplier.update({
          data: {
            Address: requestBody.address,
            City: requestBody.city,
            CompanyName: requestBody.companyName,
            ContactName: requestBody.contactName,
            ContactTitle: requestBody.contactTitle,
            Country: requestBody.country,
            Fax: requestBody.fax,
            HomePage: requestBody.homePage,
            Phone: requestBody.phone,
            PostalCode: requestBody.postalCode,
            Region: requestBody.region,
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
  public async deleteSupplier(@Path() id: string) {
    const dataSupplier = await prisma.supplier.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataSupplier) {
      const data = await prisma.supplier.delete({
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
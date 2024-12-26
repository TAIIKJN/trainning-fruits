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

export interface Customers {
  Title: string;
  FirstName: string;
  LastName: string;
  BirthDate: string;
  Email: string;
  UserName: string;
  Address: string;
  City: string;
  Country: string;
  PostalCode: string;
  Notes: string;
  Photo: string;
  PhotoPath: string;
  Role: string;
}
@Route("Customer")
export class customerController extends Controller {
  @Get()
  public async getCustomerAll() {
    const data = await prisma.customer.findMany({});
    return data;
  }

  @Get("{id}")
  public async getCustomerById(@Path() id: string) {
    const dataCustomer = await prisma.customer.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataCustomer) {
      return dataCustomer;
    } else {
      return "ไม่พบข้อมูล";
    }
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async createCustomer(@Body() requestBody: Customers) {
    try {
      const dataUser = await prisma.customer.findFirst({
        where: {
          OR: [
            { UserName: requestBody.UserName },
            { Email: requestBody.Email },
          ],
        },
      });

      if (dataUser) {
        return {
          status: 400,
          message: "ชื่อผู้ใช้หรืออีเมลถูกใช้งานแล้ว",
        };
      } else {
        const data = await prisma.customer.create({
          data: {
            Title: requestBody.Title,
            FirstName: requestBody.FirstName,
            LastName: requestBody.LastName,
            BirthDate: requestBody.BirthDate,
            Email: requestBody.Email,
            UserName: requestBody.UserName,
            Address: requestBody.Address,
            City: requestBody.City,
            Country: requestBody.Country,
            PostalCode: requestBody.PostalCode,
            Notes: requestBody.Notes,
            Photo: requestBody.Photo,
            PhotoPath: requestBody.PhotoPath,
            Role: requestBody.Role,
          },
        });

        console.log(data);
        return data;
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
  public async updateCustomer(
    @Path() id: string,
    @Body() requestBody: Customers
  ) {
    try {
      const dataCustomer = await prisma.customer.findFirst({
        where: {
          Id: id,
        },
      });

      const dataUser = await prisma.customer.findFirst({
        where: {
          AND: [
            {
              OR: [
                { UserName: requestBody.UserName },
                { Email: requestBody.Email },
              ],
            },
            { Id: { not: id } },
          ],
        },
      });

      if (dataCustomer) {
        if (dataUser) {
          return {
            status: 400,
            message: "ชื่อผู้ใช้หรืออีเมลถูกใช้งานแล้ว",
          };
        } else {
          const data = await prisma.customer.update({
            data: {
              Title: requestBody.Title,
              FirstName: requestBody.FirstName,
              LastName: requestBody.LastName,
              BirthDate: requestBody.BirthDate,
              Email: requestBody.Email,
              UserName: requestBody.UserName,
              Address: requestBody.Address,
              City: requestBody.City,
              Country: requestBody.Country,
              PostalCode: requestBody.PostalCode,
              Notes: requestBody.Notes,
              Photo: requestBody.Photo,
              PhotoPath: requestBody.PhotoPath,
              Role: requestBody.Role,
            },
            where: {
              Id: id,
            },
          });
          console.log(data);
          return data;
        }
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
  public async deleteCustomer(@Path() id: string) {
    const dataCustomer = await prisma.customer.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataCustomer) {
      await prisma.customer.delete({
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

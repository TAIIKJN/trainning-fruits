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

export interface Employees {
  address: string;
  birthDate: string;
  city: string;
  country: string;
  extension: string;
  firstName: string;
  hireDate: string;
  homePhone: string;
  lastName: string;
  notes: string;
  photo: string;
  photoPath: string;
  postalCode: string;
  region: string;
  reportsTo: string;
  title: string;
  titleOfCourtesy: string;
}

@Route("Employee")
export class employeeController extends Controller {
  @Get()
  public async getEmployeeAll() {
    const data = await prisma.employee.findMany();
    return data;
  }

  @Get("{id}")
  public async getEmployeeById(@Path() id: string) {
    const dataEmployee = await prisma.employee.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataEmployee) {
      return dataEmployee;
    } else {
      return "ไม่พบข้อมูล";
    }
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async createEmployee(@Body() requestBody: Employees) {
    try {
      const data = await prisma.employee.create({
        data: {
          Address: requestBody.address,
          BirthDate: requestBody.birthDate,
          City: requestBody.city,
          Country: requestBody.country,
          Extension: requestBody.extension,
          FirstName: requestBody.firstName,
          HireDate: requestBody.hireDate,
          HomePhone: requestBody.homePhone,
          LastName: requestBody.lastName,
          Notes: requestBody.notes,
          Photo: requestBody.photo,
          PhotoPath: requestBody.photoPath,
          PostalCode: requestBody.postalCode,
          Region: requestBody.region,
          ReportsTo: requestBody.reportsTo,
          Title: requestBody.title,
          TitleOfCourtesy: requestBody.titleOfCourtesy,
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
  public async updateEmployee(
    @Path() id: string,
    @Body() requestBody: Employees
  ) {
    try {
      const dataEmployee = await prisma.employee.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataEmployee) {
        const data = await prisma.employee.update({
          data: {
            Address: requestBody.address,
            BirthDate: requestBody.birthDate,
            City: requestBody.city,
            Country: requestBody.country,
            Extension: requestBody.extension,
            FirstName: requestBody.firstName,
            HireDate: requestBody.hireDate,
            HomePhone: requestBody.homePhone,
            LastName: requestBody.lastName,
            Notes: requestBody.notes,
            Photo: requestBody.photo,
            PhotoPath: requestBody.photoPath,
            PostalCode: requestBody.postalCode,
            Region: requestBody.region,
            ReportsTo: requestBody.reportsTo,
            Title: requestBody.title,
            TitleOfCourtesy: requestBody.titleOfCourtesy,
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
  public async deleteEmployee(@Path() id: string) {
    const dataEmployee = await prisma.employee.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataEmployee) {
      const data = await prisma.employee.delete({
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

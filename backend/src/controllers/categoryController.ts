import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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

export interface Categorys {
  categoryName: string;
  description: string;
}

@Route("Category")
export class categoryController extends Controller {
  @Get()
  public async getCategoryAll() {
    const _category = await prisma.category.findMany();
    return _category;
  }

  @Post()
  @Security("keycloak")
  @SuccessResponse("201", "Created")
  public async createCategory(
    @Body() requestBody: Categorys,
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

      const data = await prisma.category.create({
        data: {
          CategoryName: requestBody.categoryName,
          Description: requestBody.description,
        },
      });

      console.log(data);
      return data;
    } catch (e) {
      return e;
    }
  }

  @Patch("{id}")
  @Security("keycloak")
  @SuccessResponse("200", "Update")
  public async updataCategory(
    @Path() id: string,
    @Body() requestBody: Categorys,
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

      const dataCategory = await prisma.category.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataCategory) {
        const data = await prisma.category.update({
          where: {
            Id: id,
          },
          data: {
            CategoryName: requestBody.categoryName,
            Description: requestBody.description,
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

  @Delete("{id}")
  @Security("keycloak")
  @SuccessResponse("200", "Delete")
  public async deleteCategory(
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

      const dataCategory = await prisma.category.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataCategory) {
        const data = await prisma.category.delete({
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

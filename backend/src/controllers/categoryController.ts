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
  Route,
  SuccessResponse,
} from "tsoa";

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
  @SuccessResponse("201", "Created")
  public async createCategory(@Body() requestBody: Categorys) {
    const data = await prisma.category.create({
      data: {
        CategoryName: requestBody.categoryName,
        Description: requestBody.description,
      },
    });

    console.log(data);
    return data;
  }

  @Patch("{id}")
  @SuccessResponse("200", "Update")
  public async updataCategory(
    @Path() id: string,
    @Body() requestBody: Categorys
  ) {
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
  }

  @Delete("{id}")
  @SuccessResponse("200", "Delete")
  public async deleteCategory(@Path() id: string) {
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
  }
}

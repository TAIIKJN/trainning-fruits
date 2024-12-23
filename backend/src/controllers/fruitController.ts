import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
} from "tsoa";

export interface Fruits {
  name: string;
  color: string;
}

@Route("fruits")
export class fruitController extends Controller {
  @Get()
  public async getFruit() {
    const _fruits = await prisma.fruit.findMany();
    console.log(_fruits);
    return _fruits;
  }

  @Get("{id}")
  public async getFruitById(@Path() id: string) {
    console.log("37 id", id);

    const _fruits = await prisma.fruit.findFirst({
      where: {
        id: id,
      },
    });
    if (_fruits) {
      console.log(_fruits);
      return _fruits;
    } else {
      return "ไม่พบข้อมูล";
    }
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async createFruit(@Body() requestBody: Fruits) {
    const _fruits = await prisma.fruit.create({
      data: {
        name: requestBody.name,
        color: requestBody.color,
      },
    });
    console.log(_fruits);
    return _fruits;
  }

  @Patch("{id}")
  @SuccessResponse("200", "Update")
  public async updateFruit(@Path() id: string, @Body() requestBody: Fruits) {
    const afruit = await prisma.fruit.findFirst({
      where: {
        id: id,
      },
    });
    if (afruit) {
      const fruit = {
        name: requestBody.name,
        color: requestBody.color,
      };
      const _fruits = prisma.fruit.update({
        where: {
          id: id,
        },
        data: {
          name: requestBody.name,
          color: requestBody.color,
        },
      });
      console.log(_fruits);
      return _fruits;
    } else {
      return "ไม่พบข้อมูล";
    }
  }

  @Delete("{id}")
  @SuccessResponse("200", "Delete")
  public async deleteFruit(@Path() id: string) {
    const afruit = await prisma.fruit.findFirst({
      where: {
        id: id,
      },
    });
    if (afruit) {
      const _fruits = await prisma.fruit.delete({
        where: {
          id: id,
        },
      });
      console.log(_fruits);
      return "ลบข้อมูลสำเร็จ";
    } else {
      return "ไม่พบข้อมูล";
    }
  }
}

import { PrismaClient } from "@prisma/client";
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

export interface TableDetail {
  Name: string;
  Description: string;
  State?: string;
}

@Route("Table")
export class tableController extends Controller {
  @Get()
  public async getTableAll() {
    const data = await prisma.table.findMany();
    return data;
  }

  @Get("{id}")
  public async getTableById(@Path() id: string) {
    const dataTable = await prisma.table.findFirst({
      where: {
        Id: id,
      },
      include: {
        Order: {
          where: {
            State: { notIn: ["Done", "Cancel", "done", "cancel"] },
          },
        },
      },
    });

    if (dataTable) {
      return dataTable;
    } else {
      return "ไม่พบข้อมูล";
    }
  }

  @Post()
  @Security("keycloak")
  @SuccessResponse("201", "Created")
  public async createTable(
    @Body() requestBody: TableDetail,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isUser = req.user.role.some(
        (item) => item === "admin" || item === "supplier"
      );

      if (!isUser) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถเพิ่มข้อมูลได้"
        );
      }

      const data = await prisma.table.create({
        data: {
          ...requestBody,
        },
      });

      return data;
    } catch (e) {
      return e;
    }
  }

  @Patch("{id}")
  @Security("keycloak")
  @SuccessResponse("200", "Update")
  public async updateTable(
    @Path() id: string,
    @Body() requestBody: TableDetail,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isUser = req.user.role.some(
        (item) => item === "admin" || item === "employee"
      );

      if (!isUser) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถเพิ่มข้อมูลได้"
        );
      }

      const dataTable = await prisma.table.findFirst({
        where: {
          Id: id,
        },
      });
      if (dataTable) {
        const dataUpdate = await prisma.table.update({
          where: {
            Id: id,
          },
          data: {
            ...requestBody,
          },
        });
        return dataUpdate;
      }
    } catch (e) {
      return e;
    }
  }

  @Delete("{id}")
  @Security("keycloak")
  @SuccessResponse("200", "Delete")
  public async deleteTable(
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
        (item) => item === "admin" || item === "employee"
      );

      if (!isCreate) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถลบข้อมูลได้"
        );
      }

      const dataTable = await prisma.table.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataTable) {
        await prisma.table.delete({
          where: {
            Id: id,
          },
        });
        return `ลบข้อมูลสำเร็จ`;
      } else {
        return "ไม่พบข้อมูล";
      }
    } catch (e) {
      return e;
    }
  }
}

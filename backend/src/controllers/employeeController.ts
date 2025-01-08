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
import axios from "axios";
import qs from "qs";

const prisma = new PrismaClient();
const host = "https://identity.frappet.synology.me";
const realm = "taii-aif";
let token = "";

export interface Employees {
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
  Password: string;
  RoleUser: string;
}

export interface SearchEmployees {
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
}

@Route("Employee")
export class employeeController extends Controller {
  @Post("chaeckEmployee")
  @Security("keycloak")
  public async getEmployee(
    @Body() requestBody: SearchEmployees,
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
          "ผู้ใช้งานนี้ไม่สามารถเพิ่มข้อมูลหรือเรียกดูข้อมูลได้"
        );
      }

      if (requestBody) {
        const dataUser = await prisma.employee.findUnique({
          where: {
            UserName: requestBody.UserName,
          },
        });

        if (dataUser) {
          this.setStatus(200);
          return dataUser;
        } else {
          const today = new Date();
          const formattedDate = today.toISOString().split("T")[0];

          const data = await prisma.employee.create({
            data: {
              Title: "",
              FirstName: requestBody.FirstName,
              LastName: requestBody.LastName,
              BirthDate: formattedDate,
              Email: requestBody.Email,
              UserName: requestBody.UserName,
              Address: "",
              City: "",
              Country: "",
              PostalCode: "",
              Notes: "",
              Photo: "",
              PhotoPath: "",
            },
          });
          this.setStatus(201);
          return data;
        }
      } else {
        return "ส่งข้อมูลการเรียกดูไม่ครบ";
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

  @Get()
  public async getEmployeeAll() {
    try {
      const data = await prisma.employee.findMany();
      return data;
    } catch (e) {
      return e;
    }
  }

  @Get("{id}")
  public async getEmployeeById(@Path() id: string) {
    try {
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
    } catch (e) {
      return e;
    }
  }

  @Post()
  @Security("keycloak")
  @SuccessResponse("201", "Created")
  public async createEmployee(
    @Body() requestBody: Employees,
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
          "ผู้ใช้งานนี้ไม่สามารถเพิ่มข้อมูลได้"
        );
      }

      const whereData = {
        OR: [{ UserName: requestBody.UserName }, { Email: requestBody.Email }],
      };
      const dataSupplier = await prisma.supplier.findFirst({
        where: whereData,
      });
      const dataEmployee = await prisma.employee.findFirst({
        where: whereData,
      });
      const dataCustomer = await prisma.customer.findFirst({
        where: whereData,
      });

      if (dataSupplier || dataEmployee || dataCustomer) {
        return {
          status: 400,
          message: "ชื่อผู้ใช้หรืออีเมลถูกใช้งานแล้ว",
        };
      } else {
        const data = await prisma.employee.create({
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
          },
        });

        const dataToken = {
          client_id: "admin-cli",
          username: "admin",
          password: "admin",
          grant_type: "password",
        };
        const tokenKeyCloak = await axios.post(
          `${host}/realms/master/protocol/openid-connect/token`,
          qs.stringify(dataToken),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        token = tokenKeyCloak.data.access_token;

        const dataUserKeyCloak = {
          username: requestBody.UserName,
          email: requestBody.Email,
          firstName: requestBody.FirstName,
          lastName: requestBody.LastName,
          enabled: true,
          credentials: [
            {
              temporary: false,
              type: "password",
              value: requestBody.Password,
            },
          ],
        };

        const response = await postToKeycloak(
          `${host}/admin/realms/${realm}/users`,
          dataUserKeyCloak
        );
        console.log("response", response);

        const dataRole = await axios.get(
          `${host}/admin/realms/taii-aif/roles/${requestBody.RoleUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const locationHeader = response.headers.location;
        const userId = locationHeader.split("/").pop();

        const role = await postToKeycloak(
          `${host}/admin/realms/${realm}/users/${userId}/role-mappings/realm`,
          [dataRole.data]
        );

        // console.log(dataRole);
        return { data: data, keycloakResponse: dataUserKeyCloak };
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
  public async updateEmployee(
    @Path() id: string,
    @Body() requestBody: Employees,
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
          "ผู้ใช้งานนี้ไม่สามารถแก้ไขข้อมูลได้"
        );
      }

      const dataEmployee = await prisma.employee.findFirst({
        where: { Id: id },
      });

      const whereData = {
        AND: [
          {
            OR: [
              { UserName: requestBody.UserName },
              { Email: requestBody.Email },
            ],
          },
          { Id: { not: id } },
        ],
      };
      const dataSupplier = await prisma.supplier.findFirst({
        where: whereData,
      });
      const dataUser = await prisma.employee.findFirst({
        where: whereData,
      });
      const dataCustomer = await prisma.customer.findFirst({
        where: whereData,
      });

      if (dataEmployee) {
        if (dataSupplier || dataUser || dataCustomer) {
          return {
            status: 400,
            message: "ชื่อผู้ใช้หรืออีเมลถูกใช้งานแล้ว",
          };
        } else {
          const data = await prisma.employee.update({
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
  @Security("keycloak")
  @SuccessResponse("200", "Delete")
  public async deleteEmployee(
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

      const dataEmployee = await prisma.employee.findFirst({
        where: {
          Id: id,
        },
      });

      if (dataEmployee) {
        const dataToken = {
          client_id: "admin-cli",
          username: "admin",
          password: "admin",
          grant_type: "password",
        };
        const tokenKeyCloak = await axios.post(
          `${host}/realms/master/protocol/openid-connect/token`,
          qs.stringify(dataToken),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        token = tokenKeyCloak.data.access_token;

        const dataKeyCloak = await axios.get(
          `${host}/admin/realms/${realm}/users/?username=${dataEmployee.UserName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("dataKeyCloak", dataKeyCloak);
        console.log("dataKeyCloakId", dataKeyCloak.data[0].id);

        const dataDelete = await axios.delete(
          `${host}/admin/realms/${realm}/users/${dataKeyCloak.data[0].id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("dataDelete", dataDelete);

        await prisma.employee.delete({
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

async function postToKeycloak(url: string, data: any) {
  try {
    console.log("url", url);

    return await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // ใช้ type assertion หรือ instanceof เพื่อตรวจสอบข้อผิดพลาด
    if (error instanceof Error) {
      console.log(`Keycloak request failed: ${error.message}`);
      throw new Error(`Keycloak request failed: ${error.message}`);
    } else {
      throw new Error("Unknown error occurred during Keycloak request.");
    }
  }
}

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

export interface Suppliers {
  FirstName: string;
  LastName: string;
  Email: string;
  UserName: string;
  Phone: string;
  Address: string;
  City: string;
  Country: string;
  PostalCode: string;
  Notes: string;
  Photo: string;
  Password: string;
}

export interface SearchSupplier {
  FirstName: string;
  LastName: string;
  Email: string;
  UserName: string;
}

@Route("Supplier")
export class supplierController extends Controller {
  @Post("chaeckSupplier")
  @Security("keycloak")
  public async getSupplier(
    @Body() requestBody: SearchSupplier,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isCreate = req.user.role.some((item) => item === "supplier");

      if (!isCreate) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถเพิ่มข้อมูลหรือเรียกดูข้อมูลได้"
        );
      }

      if (requestBody) {
        const dataUser = await prisma.supplier.findUnique({
          where: {
            UserName: requestBody.UserName,
          },
        });

        if (dataUser) {
          this.setStatus(200);
          return dataUser;
        } else {
          const data = await prisma.supplier.create({
            data: {
              FirstName: requestBody.FirstName,
              LastName: requestBody.LastName,
              Email: requestBody.Email,
              UserName: requestBody.UserName,
              Phone: "",
              Address: "",
              City: "",
              Country: "",
              PostalCode: "",
              Notes: "",
              Photo: "",
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
  @Security("keycloak")
  @SuccessResponse("201", "Created")
  public async createSupplier(
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    },
    @Body() requestBody: Suppliers
  ) {
    try {
      const isCreate = req.user.role.some(
        (v) => v === "admin" || v === "supplier"
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
          `${host}/admin/realms/taii-aif/roles/supplier`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const locationHeader = response.headers.location;
        const userId = locationHeader.split("/").pop();
        console.log("dataRole", dataRole.data);

        const role = await postToKeycloak(
          `${host}/admin/realms/${realm}/users/${userId}/role-mappings/realm`,
          [dataRole.data]
        );

        const data = await prisma.supplier.create({
          data: {
            FirstName: requestBody.FirstName,
            LastName: requestBody.LastName,
            Email: requestBody.Email,
            UserName: requestBody.UserName,
            Phone: requestBody.Phone,
            Address: requestBody.Address,
            City: requestBody.City,
            Country: requestBody.Country,
            PostalCode: requestBody.PostalCode,
            Notes: requestBody.Notes,
            Photo: requestBody.Photo,
          },
        });

        console.log(role);
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
  public async updateSupplier(
    @Path() id: string,
    @Body() requestBody: Suppliers,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isCreate = req.user.role.some(
        (v) => v === "admin" || v === "supplier"
      );
      if (!isCreate) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถแก้ไขข้อมูลได้"
        );
      }
      const dataSupplier = await prisma.supplier.findFirst({
        where: {
          Id: id,
        },
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
      const dataUser = await prisma.supplier.findFirst({
        where: whereData,
      });
      const dataEmployee = await prisma.employee.findFirst({
        where: whereData,
      });
      const dataCustomer = await prisma.customer.findFirst({
        where: whereData,
      });

      if (dataSupplier) {
        if (dataEmployee || dataUser || dataCustomer) {
          return {
            status: 400,
            message: "ชื่อผู้ใช้หรืออีเมลถูกใช้งานแล้ว",
          };
        } else {
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
          console.log("token", token);

          const dataKeyCloak = await axios.get(
            `${host}/admin/realms/${realm}/users/?username=${dataSupplier.UserName}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const dataUserKeyCloak = {
            email: requestBody.Email,
            firstName: requestBody.FirstName,
            lastName: requestBody.LastName,
          };

          const dataPasswordKeyCloak = {
            type: "password",
            value: requestBody.Password,
            temporary: false,
          };

          const dataUpdataUser = await axios.put(
            `${host}/admin/realms/${realm}/users/${dataKeyCloak.data[0].id}`,
            dataUserKeyCloak,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const dataUpdataPassword = await axios.put(
            `${host}/admin/realms/${realm}/users/${dataKeyCloak.data[0].id}/reset-password`,
            dataPasswordKeyCloak,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("dataUser", dataUpdataUser, dataUpdataPassword);
          const data = await prisma.supplier.update({
            data: {
              FirstName: requestBody.FirstName,
              LastName: requestBody.LastName,
              Email: requestBody.Email,
              Phone: requestBody.Phone,
              Address: requestBody.Address,
              City: requestBody.City,
              Country: requestBody.Country,
              PostalCode: requestBody.PostalCode,
              Notes: requestBody.Notes,
              Photo: requestBody.Photo,
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
  public async deleteSupplier(
    @Path() id: string,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    const isCreate = req.user.role.some(
      (v) => v === "admin" || v === "supplier"
    );
    if (!isCreate) {
      throw new HttpError(
        HttpStatus.UNAUTHORIZED,
        "ผู้ใช้งานนี้ไม่สามารถลบข้อมูลได้"
      );
    }

    const dataSupplier = await prisma.supplier.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataSupplier) {
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
        `${host}/admin/realms/${realm}/users/?username=${dataSupplier.UserName}`,
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

      await prisma.supplier.delete({
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

async function postToKeycloak(url: string, data: any) {
  try {
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

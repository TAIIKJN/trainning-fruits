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
  Password: string;
}

export interface SearchCustomers {
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
}
@Route("Customer")
export class customerController extends Controller {
  @Post("chaeckCustomer")
  @Security("keycloak")
  public async getCustomer(
    @Body() requestBody: SearchCustomers,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isCustomer = req.user.role.some((item) => item === "customer");

      if (!isCustomer) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถเพิ่มข้อมูลหรือเรียกดูข้อมูลได้"
        );
      }
      if (requestBody) {
        const dataCustomer = await prisma.customer.findUnique({
          where: {
            UserName: requestBody.UserName,
          },
        });

        if (dataCustomer) {
          this.setStatus(200);
          return dataCustomer;
        } else {
          const today = new Date();
          const formattedDate = today.toISOString().split("T")[0];

          const data = await prisma.customer.create({
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
              Role: "General",
            },
          });

          this.setStatus(201);
          return data;
        }
      } else {
        return "ส่งข้อมูลการเรียกดูไม่ครบ";
      }
    } catch (e) {
      return e;
    }
  }

  @Get()
  public async getCustomerAll() {
    try {
      const data = await prisma.customer.findMany({});
      return data;
    } catch (e) {
      return e;
    }
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
  @Security("keycloak")
  @SuccessResponse("201", "Created")
  public async createCustomer(
    @Body() requestBody: Customers,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isCreate = req.user.role.some(
        (item) => item === "admin" || item === "customer"
      );
      console.log("isCreate", isCreate);

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

      console.log(
        "dataSupplier",
        dataSupplier,
        "dataEmployee",
        dataEmployee,
        "dataCustomer",
        dataCustomer
      );

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
          `${host}/admin/realms/taii-aif/roles/customer`,
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
        console.log("data", data);

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
  public async updateCustomer(
    @Path() id: string,
    @Body() requestBody: Customers,
    @Request()
    req: Express.Request & {
      user: {
        role: string[];
      };
    }
  ) {
    try {
      const isCreate = req.user.role.some(
        (item) => item === "admin" || item === "customer"
      );

      if (!isCreate) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถแก้ไขข้อมูลได้"
        );
      }

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
            `${host}/admin/realms/${realm}/users/?username=${dataCustomer.UserName}`,
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

          const data = await prisma.customer.update({
            data: {
              Title: requestBody.Title,
              FirstName: requestBody.FirstName,
              LastName: requestBody.LastName,
              BirthDate: requestBody.BirthDate,
              Email: requestBody.Email,
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
  @Security("keycloak")
  @SuccessResponse("200", "Delete")
  public async deleteCustomer(
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
        (item) => item === "admin" || item === "customer"
      );

      if (!isCreate) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          "ผู้ใช้งานนี้ไม่สามารถลบข้อมูลได้"
        );
      }

      const dataCustomer = await prisma.customer.findFirst({
        where: {
          Id: id,
        },
      });
      console.log("dataCustomer", dataCustomer);

      if (dataCustomer) {
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
          `${host}/admin/realms/${realm}/users/?username=${dataCustomer.UserName}`,
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

        await prisma.customer.delete({
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

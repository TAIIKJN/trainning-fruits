import { PrismaClient } from "@prisma/client";
import { Controller, Delete, Path, Route, SuccessResponse } from "tsoa";

const prisma = new PrismaClient();
@Route("OrderDetail")
export class orderDetailContoller extends Controller {
  @Delete("{id}")
  @SuccessResponse("200", "Delete")
  public async deleteOrderDetail(@Path() id: string) {
    const dataDetail = await prisma.orderDetail.findFirst({
      where: {
        Id: id,
      },
    });

    if (dataDetail) {
      await prisma.orderDetail.delete({
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

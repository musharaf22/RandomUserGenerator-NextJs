import prisma from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  value: { params: { userId: string } }
) => {
  console.log({ value });
  const userId = value.params.userId;
  console.log({ userId, value });
  const del = await prisma.user.deleteOne({ where: { _id: userId } });
  return NextResponse.json({ message: "Deleted Successfully", data: del });
};

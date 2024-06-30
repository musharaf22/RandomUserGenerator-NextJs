import prisma from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  let [page = 1, limit = 10, sortKey, sortValue, filter] = [
    searchParams.get("page") ?? 1,
    searchParams.get("limit") ?? 10,
    searchParams.get("sortKey") ?? null,
    searchParams.get("sortValue") ?? null,
    searchParams.get("filter") ?? null,
  ];
  if (filter) {
    limit = 2;
    (sortKey = "age"), (sortValue = "asc");
  }
  const [allUser, count] = await Promise.all([
    prisma.user.findMany({
      orderBy: sortKey
        ? {
            [sortKey]: sortValue ?? "asc",
          }
        : {
            createdAt: "desc",
          },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    }),
    prisma.user.count(),
  ]);

  return NextResponse.json({
    message: "User fetched successfully",
    data: allUser,
    count: filter ? 2 : count,
  });
}

export async function POST(req: Request) {
  console.log({ body: req.body });
  const resp = await fetch("https://randomuser.me/api");
  const data = await resp.json();
  if (!data) throw new Error("unable to generate user information");

  const userData = data.results[0];
  const userPayload = {
    firstName: userData.name.first,
    lastName: userData.name.last,
    location: `${userData.location.street.name} , ${userData.location.city}`,
    email: userData.email,
    age: userData?.registered?.age,
    images: [
      userData?.picture.large,
      userData?.picture.medium,
      userData?.picture.thumbnail,
    ],
  };
  const createdUser = await prisma.user.create({
    data: userPayload,
  });
  return NextResponse.json({
    message: "user created successfully",
    data: createdUser,
  });
}

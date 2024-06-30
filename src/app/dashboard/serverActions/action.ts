"use server";

import prisma from "@/utils/prismaClient";

interface IUserFilter {
  page: number;
  limit: number;
  sortKey?: string | null;
  sortValue?: string | null;
}
export const getRandomUser = async () => {
  const resp = await fetch("https://randomuser.me/api");
  const data = await resp.json();
  console.log(data);
  return data;
};

//Get All user
export const getAllUser = async (userProps: IUserFilter | any) => {
  Object.entries(userProps).forEach(([key, value]) => {
    if (!value) {
      delete userProps[key];
    }
  });
  const searchParam = new URLSearchParams(Object.entries(userProps)).toString();
  const resp = await fetch(`http://localhost:3000/api/user?${searchParam}`, {
    method: "GET",
  });
  return await resp.json();
};

export const addUser = async () => {
  const resp = await fetch("http://localhost:3000/api/user", {
    method: "POST",
  });
  return await resp.json();
};

export const deleteData = async (id: string): Promise<boolean> => {
  const del = await prisma.user.delete({ where: { id: id } });
  console.log({ del });
  return true;
};

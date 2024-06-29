"use server";
interface IUserFilter {
  page: number;
  limit: number;
  sortKey?: string;
  sortValue?: string;
}
export const getRandomUser = async () => {
  const resp = await fetch("https://randomuser.me/api");
  const data = await resp.json();
  console.log(data);
  return data;
};

//Get All user
export const getAllUser = async (userProps: IUserFilter) => {
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

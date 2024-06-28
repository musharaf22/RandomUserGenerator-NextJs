"use server";

export const getRandomUser = async () => {
  const resp = await fetch("https://randomuser.me/api");
  const data = await resp.json();
  console.log(data);
  return data;
};

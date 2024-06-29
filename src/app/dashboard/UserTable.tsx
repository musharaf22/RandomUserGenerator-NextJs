"use client";
import React, { useEffect, useState } from "react";
import { getAllUser, getRandomUser } from "./serverActions/action";

interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  location: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
const UserTable = () => {
  const [user, setUser] = useState<IUser[] | []>([]);
  const getUser = async () => {
    const user = await getAllUser({ page: 1, limit: 10 });
    if (user) {
      setUser(user.data);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <table className="w-full ">
        {/* // table heading  */}
        <tr className="text-center p-2">
          {[
            "SL",
            "Image",
            "First Name",
            "Last Name",
            "Email",
            "Age",
            "Location",
          ].map((e, i: number) => {
            return (
              <th key={i} className="p-2">
                {e}
              </th>
            );
          })}
        </tr>
        {/* // Table content  */}

        {user.map((u: IUser, i: number) => {
          return (
            <tr
              className={`text-center ${
                i + 1 / 2 === 0 ? "bg-slate-500" : "bg-white"
              } p-2 `}
              key={u.id}
            >
              <td className="p-2">{i + 1}</td>
              <td className="p-2">
                <img
                  src={u.images[0]}
                  alt=""
                  className="rounded-full w-[100px] h-[100px]  mx-auto"
                />
              </td>
              <td className="p-2">{u.firstName}</td>
              <td className="p-2">{u.lastName}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.age}</td>
              <td className="p-2">{u.location}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UserTable;

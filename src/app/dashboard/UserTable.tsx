"use client";
import React, { useEffect } from "react";
import { getRandomUser } from "./serverActions/action";

const UserTable = () => {
  const getUser = async () => {
    const user = await getRandomUser();
    console.log({ user });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <table className="w-full ">
        {/* // table heading  */}
        <tr className="text-center p-2">
          {["Name", "Email", "Phone"].map((e, i: number) => {
            return (
              <th key={i} className="p-2">
                {e}
              </th>
            );
          })}
        </tr>
        {/* // Table content  */}
        <tr className="text-center bg-slate-300 p-2 ">
          <td className="p-2">Alfreds Futterkiste</td>
          <td className="p-2">Maria Anders</td>
          <td className="p-2">Germany</td>
        </tr>
      </table>
    </div>
  );
};

export default UserTable;

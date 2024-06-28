import React from "react";

const UserTable = () => {
  return (
    <div>
      <table className="border-2 border-yellow-500 w-full ">
        <tr className="text-center p-2">
          <th className="p-2">Company</th>
          <th className="p-2">Contact</th>
          <th className="p-2">Country</th>
        </tr>
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

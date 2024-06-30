"use client";
import Paginations from "@/components/Paginations";
import FilterIcon from "@/utils/logo/FilterIcon";
import RefreshIcon from "@/utils/logo/RefreshIcon";
import SortingIcon from "@/utils/logo/SortingIcon";
import { useEffect, useState } from "react";
import { addUser, deleteData, getAllUser } from "./serverActions/action";
import Swal from "sweetalert2";

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
  //states
  const [user, setUser] = useState<IUser[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const getUser = async () => {
    const user = await getAllUser({ page, limit: 8 });
    if (user) {
      setUser(user.data);
      setTotalCount(user.count);
    }
  };
  useEffect(() => {
    getUser();
  }, [page]);

  const handleGenerateUser = async () => {
    const el = document.getElementById("refreshIcon");
    console.log({ el });
    if (el) {
      el.classList.add("animate-spin");
      await addUser();
      await getUser();
      el.classList.remove("animate-spin");
    }
  };

  // handle delete
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData(id);
        await getUser();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "black",
        });
      }
    });
  };
  return (
    <div className="border-2 border-gray-500 rounded-xl p-4">
      <div className="flex justify-end items-center mr-10 mb-4">
        <button
          onClick={handleGenerateUser}
          className="p-2 mr-4 flex items-center text-white bg-black rounded-lg  w-[190px] "
        >
          <p> Generate Random user </p>
          <div id="refreshIcon" className="ml-4 ">
            <RefreshIcon />
          </div>
        </button>
        <button className="p-1 mr-4 flex items-center text-white bg-black rounded-lg hover:bg-white hover:text-black w-[80px] hover:border-2">
          <FilterIcon /> <p className="ml-2">Sort</p>
        </button>
        <button className="p-1 flex items-center text-white bg-black rounded-lg hover:bg-white hover:text-black w-[80px] hover:border-2">
          <SortingIcon /> <p className="ml-2">Filter</p>
        </button>
      </div>
      <table className="w-full ">
        {/* // table heading  */}
        <tbody>
          <tr className="text-center p-1">
            {[
              "SL",
              "Image",
              "First Name",
              "Last Name",
              "Email",
              "Age",
              "Location",
              "Actions",
            ].map((e, i: number) => {
              return (
                <th key={i} className="p-1">
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
                  (i + 1) % 2 === 0 ? "bg-gray-200" : "bg-white"
                } p-1 `}
                key={u.id}
              >
                <td className="p-1">{i + 1}</td>
                <td className="p-1">
                  <img
                    src={u.images[0]}
                    alt=""
                    className="rounded-full w-[50px] h-[50px]  mx-auto"
                  />
                </td>
                <td className="p-1">{u.firstName}</td>
                <td className="p-1">{u.lastName}</td>
                <td className="p-1">{u.email}</td>
                <td className="p-1">{u.age}</td>
                <td className="p-1">{u.location}</td>
                <td className="p-1">
                  <div className="flex justify-evenly items-center">
                    <button className="p-1 text-white bg-black rounded-lg hover:bg-white hover:text-black w-[70px] hover:border-2">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-1 text-white bg-black rounded-lg hover:bg-white hover:text-black hover:border-2 w-[70px]"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className={`${user.length === 0 ? "hidden" : "block"} flex justify-end`}
      >
        <Paginations
          currPage={page}
          noOfPages={Math.ceil(totalCount / 8)}
          setPageId={setPage}
          refetch={getUser}
        />
      </div>
    </div>
  );
};

export default UserTable;

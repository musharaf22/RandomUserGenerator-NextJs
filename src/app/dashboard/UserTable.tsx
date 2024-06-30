"use client";
import Paginations from "@/components/Paginations";
import SortingCard from "@/components/SortingCard";
import FilterIcon from "@/utils/logo/FilterIcon";
import RefreshIcon from "@/utils/logo/RefreshIcon";
import SortingIcon from "@/utils/logo/SortingIcon";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addUser, deleteData, getAllUser } from "./serverActions/action";
import FilterCard from "@/components/FilterCard";
import EditModal from "@/components/EditModal";
import Loading from "./loading";

export interface IUser {
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
  const [loading, setLoading] = useState<boolean>();
  const [user, setUser] = useState<IUser[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [showSortingCard, setShowSortingCard] = useState<boolean>(false);
  const [showFilterCard, setShowFilterCard] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editableValue, setEditableValue] = useState<IUser | null>(null);
  const [sortingValues, setSortingValues] = useState<{
    sortKey: string | null;
    sortValue: string | null;
  }>({ sortKey: null, sortValue: null });

  const getUser = async () => {
    setLoading(true);
    const user = await getAllUser({
      page,
      limit: 8,
      sortKey: sortingValues.sortKey,
      sortValue: sortingValues.sortValue,
      filter: filter,
    });
    if (user) {
      setUser(user.data);
      setTotalCount(user.count);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [page, sortingValues, filter]);

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
    <>
      {/* // Edit Modal  */}
      {showEditModal && (
        <EditModal
          handleClose={() => setShowEditModal(false)}
          userDetails={editableValue}
          getUser={getUser}
        />
      )}
      <div
        className={`border-2 border-gray-500 rounded-xl p-4 ${
          showEditModal ? "blur" : ""
        } `}
        onClick={() => {
          setShowSortingCard(false);
          setShowFilterCard(false);
        }}
      >
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
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFilterCard(false);
                setShowSortingCard((prev) => !prev);
              }}
              className="p-1 mr-4 flex items-center text-white bg-black rounded-lg "
            >
              <FilterIcon /> <p className="ml-2">Sort</p>
            </button>
            {showSortingCard && (
              <div className="absolute -left-4">
                <SortingCard setValue={setSortingValues} />
              </div>
            )}
          </div>
          {/* // Filter button  */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSortingCard(false);
                setShowFilterCard((prev) => !prev);
              }}
              className="p-1 flex items-center text-white bg-black rounded-lg"
            >
              <SortingIcon /> <p className="ml-2">Filter</p>
            </button>
            {showFilterCard && (
              <div className="absolute right-0">
                <FilterCard setValue={setFilter} />
              </div>
            )}
          </div>
        </div>
        {/* //Loading   */}
        {loading && <Loading />}
        {!loading && (
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
                        <button
                          className="p-1 text-white bg-black rounded-lg hover:bg-white hover:text-black w-[70px] hover:border-2"
                          onClick={() => {
                            setEditableValue(u);
                            setShowEditModal(true);
                          }}
                        >
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
        )}
        <div
          className={`${
            user.length === 0 ? "hidden" : "block"
          } flex justify-end`}
        >
          <Paginations
            currPage={page}
            noOfPages={Math.ceil(totalCount / 8)}
            setPageId={setPage}
            refetch={getUser}
          />
        </div>
      </div>
    </>
  );
};

export default UserTable;

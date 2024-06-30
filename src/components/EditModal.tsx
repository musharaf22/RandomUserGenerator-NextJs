import { IUser } from "@/app/dashboard/UserTable";
import { updateUser } from "@/app/dashboard/serverActions/action";
import RefreshIcon from "@/utils/logo/RefreshIcon";
import React, { useEffect, useState } from "react";

interface IProps {
  handleClose: () => void;
  userDetails: Partial<IUser> | null;
  getUser: () => void;
}
const EditModal = ({ handleClose, userDetails, getUser }: IProps) => {
  const [formData, setFormData] = useState<Partial<IUser>>({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    location: "",
  });
  useEffect(() => {
    if (userDetails) {
      setFormData({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        age: userDetails.age,
        location: userDetails.location,
      });
    }
  }, [userDetails]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "age") {
        return { ...prev, [name]: Number(value) };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleSubmit = async () => {
    const el = document.getElementById("updateRefresh");
    if (!userDetails || !el) return;
    el.classList.add("animate-spin");
    await updateUser(formData, userDetails.id ?? "");
    getUser();
    el.classList.remove("animate-spin");
    handleClose();
  };
  return (
    <div className="absolute bg-white border-2 border-gray-300 rounded-xl p-4 left-1/2 top-1/2 h-[50vh] w-[50vw] z-10 transform -translate-x-1/2 -translate-y-1/2 blur-none">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Edit User Details</h1>
        <p onClick={handleClose} className="cursor-pointer text-xl font-bold">
          X
        </p>
      </div>
      {/* // form  */}
      <div className=" h-full justify-evenly flex flex-col items-center">
        <div className="flex items-center">
          <p className="text-lg">First Name :</p>
          <input
            type="text"
            value={formData.firstName}
            className="outline-none border-2 border-gray-400 rounded-lg p-1 w-[300px] ml-4"
            name="firstName"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center">
          <p className="text-lg">Last Name :</p>
          <input
            type="text"
            value={formData.lastName}
            className="outline-none border-2 border-gray-400 rounded-lg p-1 w-[300px] ml-4"
            name="lastName"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center">
          <p className="text-lg">Age : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
          <input
            type="number"
            value={formData.age}
            className="outline-none border-2 border-gray-400 rounded-lg p-1 w-[300px] ml-4"
            name="age"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center">
          <p className="text-lg">Email : &nbsp; &nbsp; &nbsp; &nbsp;</p>
          <input
            type="email"
            value={formData.email}
            className="outline-none border-2 border-gray-400 rounded-lg p-1 w-[300px] ml-4"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center">
          <p className="text-lg">Location : &nbsp; &nbsp;</p>
          <input
            type="text"
            value={formData.location}
            className="outline-none border-2 border-gray-400 rounded-lg p-1 w-[300px] ml-4"
            name="location"
            onChange={handleChange}
          />
        </div>
        {/* //button */}
        <button
          className="p-2  flex items-center justify-center text-white bg-black rounded-lg  w-[190px] "
          onClick={handleSubmit}
        >
          <p>Update </p>
          <div id="updateRefresh" className="ml-4 ">
            <RefreshIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default EditModal;

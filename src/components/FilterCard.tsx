"use client";
import { useRef } from "react";

const FilterCard = ({ setValue }: any) => {
  const curValueRef = useRef<any>("");
  const handleChange = (e: any) => {
    const { value } = e.target;
    curValueRef.current = value;
    if (value.includes("Two")) {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  return (
    <div
      className="bg-white p-4 rounded-lg w-[220px] border-2 border-gray-200  "
      onClick={(e) => e.stopPropagation()}
    >
      {["Two youngest user", "None"].map((v: string, i: number) => {
        return (
          <div key={i} className="flex items-center mt-4">
            <input
              type="radio"
              onChange={handleChange}
              value={v}
              checked={curValueRef.current === v}
            />
            {/* <label htmlFor="sorting" className="ml-3">
                {v}{" "}
              </label> */}
            <p className="ml-3">{v}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FilterCard;

"use client";
import React from "react";

const SortingCard = ({ setValue }: any) => {
  const handleChange = (e: any) => {
    const { value } = e.target;
    if (value.includes("Increasing")) {
      setValue(() => {
        return { sortKey: "age", sortValue: "asc" };
      });
    }

    if (value.includes("Decrease")) {
      setValue(() => {
        return { sortKey: "age", sortValue: "desc" };
      });
    }

    if (value.includes("None")) {
      setValue(() => {
        return { sortKey: null, sortValue: null };
      });
    }
  };
  return (
    <div
      className="bg-white p-4 rounded-lg w-[220px] border-2 border-gray-200  "
      onClick={(e) => e.stopPropagation()}
    >
      {["Increasing order of age", "Decrease order of age", "None"].map(
        (v: string, i: number) => {
          return (
            <div key={i} className="flex items-center mt-4">
              <input
                type="radio"
                name="sorting"
                onChange={handleChange}
                value={v}
              />
              <p className="ml-3">{v}</p>
            </div>
          );
        }
      )}
    </div>
  );
};

export default SortingCard;

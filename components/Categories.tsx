"use client";
import {useEffect, useState} from "react";
import Pagination from "./Pagination";

interface Data {
  id: string;
  name: string;
}

export default function Categories({
  data,
  interestedIn,
  totalPages,
  totalCount,
}: any) {
  const [interestedCategory, setInterestedCategory] =
    useState<string[]>(interestedIn);

  function handleChange(e: React.FormEvent<EventTarget>) {
    if ((e.target as HTMLInputElement).checked) {
      setInterestedCategory([
        ...interestedCategory,
        (e.target as HTMLInputElement).name,
      ]);
    } else {
      const filterTheCategory = interestedCategory.filter(
        (ele) => ele !== (e.target as HTMLInputElement).name
      );
      setInterestedCategory(filterTheCategory);
    }
  }

  useEffect(() => {
    async function addCategory() {
      const response = await fetch(`/api/categories`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
          category: interestedCategory,
        }),
      });
    }
    addCategory();
  }, [interestedCategory]);

  return (
    <div className="w-full flex items-center justify-center p-5 mt-4 box-border">
      <form className="bg-white shadow-md p-12 mb-4 h-[658px] w-[576px] rounded-[20px] border-[1px] border-[#C1C1C1] space-y-7 flex flex-col">
        <div className=" text-[32px] font-[600] space-y-7 text-center">
          <section>Please mark your interest!</section>
          <section>
            <p className="text-[16px] font-[400]">We will keep you notified</p>
          </section>
        </div>
        <p className="text-[20px] font-[500]">My saved interests!</p>
        {data.map((category: Data) => (
          <div key={category.id} className="flex gap-2">
            <input
              type="checkbox"
              id={category.id}
              defaultChecked={interestedIn.includes(category.name)}
              name={category.name}
              onChange={handleChange}
              className=" appearance-none w-[24px] h-[24px] rounded-[4px]  bg-[#CCCCCC] checked:block border-gray-300 checked:bg-black"
            />
            <label htmlFor={category.id} className="text-[16px] font-[400]">
              {category.name}
            </label>
          </div>
        ))}
        <Pagination totalPages={totalPages} />
      </form>
    </div>
  );
}

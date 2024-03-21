"use client";

import {getCurrentUser} from "@/lib/user";
import {useEffect, useState} from "react";

interface Data {
  id: string;
  name: string;
}

export default function Categories({data, interestedIn}: any) {
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
    <div>
      <form>
        {data.map((category: Data) => (
          <div key={category.id}>
            <input
              type="checkbox"
              id={category.id}
              defaultChecked={interestedIn.includes(category.name)}
              name={category.name}
              onChange={handleChange}
            />
            <span>{category.name}</span>
          </div>
        ))}
      </form>
    </div>
  );
}

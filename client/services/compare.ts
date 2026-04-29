import { CompareResponse } from "@/types/compare";

export const fetchCompare = async (): Promise<CompareResponse> => {
  const res = await fetch("http://localhost:8000/compare", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.data;
};
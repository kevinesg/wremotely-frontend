import { useLocation } from "react-router-dom";
import { PostCollection } from "@/components/PostCollection";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get("q") || "";

  return (
    <div className="w-full py-8 flex flex-col items-center">
      <div className="w-full max-w-screen-xl px-4 sm:px-6">
        <h1 className="text-2xl font-bold mb-4 text-left">
          Search Results for "{query}"
        </h1>
      </div>
      <PostCollection search={query} />
    </div>
  );
}

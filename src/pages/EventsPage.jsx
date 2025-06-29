import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import DataErrorPage from "../components/DataErrorPage";
import { IoSearch } from "react-icons/io5";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";

function EventsPage() {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data.data;
    },
  });

  if (isLoading) return <Loader />;
  // if (error) return <DataErrorPage />;

  // const filteredEvents = data.filter((event) => {
  //   const isTitleMatch = event.title
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  //   const isCategoryMatch =
  //     category === "all" ||
  //     event.category.toLowerCase().includes(category.toLowerCase());

  //   return isTitleMatch && isCategoryMatch;
  // });

  return (
    <div className="w-full min-h-screen text-white">
      <main className="mx-auto flex flex-col items-center justify-center h-full py-10 px-6">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize">
          Events
        </h1>

        <div className="flex items-center bg-accent px-3 py-2 rounded-sm border border-border mt-3 gap-3 flex-col md:flex-row">
          <div className="flex items-center gap-0 w-full">
            <label className="pr-3" htmlFor="searchEvent">
              <IoSearch siz e={20} />
            </label>

            <input
              id="searchEvent"
              type="text"
              className="flex-1 border border-primary px-2 rounded-lg py-1 focus:outline-primary focus:outline-1"
              placeholder="Search Events"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
          {data.map((event) => (
            <EventCard event={event} key={event._id} refetch={refetch} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default EventsPage;

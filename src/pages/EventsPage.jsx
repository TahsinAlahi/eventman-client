import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataError from "../components/DataError";
import { IoSearch } from "react-icons/io5";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";
import getDateRange from "../utils/getDateRange";

function EventsPage() {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (searchQuery) {
        const res = await axiosSecure.get(`/events/search?q=${searchQuery}`);
        return res.data.data;
      }

      const { startDate, endDate } = getDateRange(dateFilter);
      if (startDate && endDate) {
        const res = await axiosSecure.get(
          `/events/filter?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        return res.data.data;
      }

      const res = await axiosSecure.get("/events");
      return res.data.data;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <DataError />;

  return (
    <div className="w-full min-h-screen text-neutral-300 bg-black">
      <main className="mx-auto flex flex-col items-center justify-center h-full py-10 px-6">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize">
          Events
        </h1>

        <div className="flex items-center bg-accent px-3 py-2 border border-border mt-3 gap-3 flex-col md:flex-row">
          <div className="flex items-center gap-0 w-full">
            <label className="pr-3" htmlFor="searchEvent">
              <IoSearch size={20} />
            </label>

            <input
              id="searchEvent"
              type="text"
              className="flex-1 border border-primary px-2 py-1 focus:outline-primary focus:outline-1"
              placeholder="Search Events"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-3 lg:mt-0">
            <select
              className="border border-primary px-2 py-1 md text-inherit"
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="thisWeek">This Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </div>
          <button
            className="bg-primary px-2 py-1 cursor-pointer"
            onClick={refetch}
          >
            Search
          </button>
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

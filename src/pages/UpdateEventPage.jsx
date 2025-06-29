import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

function UpdateEventPage() {
  const { eventId: id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await axiosSecure.get(`/events/${id}`);
        const event = res.data.data;

        console.log(event);

        if (event) {
          const date = new Date(event.dateTime);
          const formattedDate = date.toISOString().split("T")[0];
          const formattedTime = date.toTimeString().slice(0, 5);

          setValue("title", event.title);
          setValue("description", event.description);
          setValue("location", event.eventLocation);
          setValue("date", formattedDate);
          setValue("fromTime", formattedTime);
        }
      } catch (error) {
        toast.error("Failed to fetch event data.");
      }
    }

    fetchEvent();
  }, [axiosSecure, id, setValue]);

  async function onSubmit(data) {
    setIsUpdating(true);
    try {
      const { date, fromTime } = data;
      const dateTime = new Date(`${date}T${fromTime}`);

      const updatedData = {
        title: data.title,
        description: data.description,
        eventLocation: data.location,
        dateTime,
      };

      const res = await axiosSecure.put(`/events/${id}`, updatedData);

      if (res.status === 200) {
        toast.success("Event updated successfully!");
        queryClient.invalidateQueries(["my-events"]);
        navigate("/my-events");
      }
    } catch (error) {
      toast.error("Failed to update event.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <main className="bg-slate-950 text-white min-h-screen max-w-screen-xl mx-auto py-10 px-4 font-poppins">
      <h1 className="text-3xl font-semibold border-b-2 border-white text-center w-fit mx-auto pb-1 mb-10 font-rubik">
        Update Event
      </h1>

      <form
        className="w-full max-w-2xl mx-auto space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 rounded-md bg-slate-800 border border-gray-500 outline-none"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-slate-800 border border-gray-500 outline-none"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-semibold">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-4 py-2 rounded-md bg-slate-800 border border-gray-500 outline-none"
          />
          {errors.date && (
            <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1 font-semibold">Time</label>
          <input
            type="time"
            {...register("fromTime", { required: "Time is required" })}
            className="w-full px-4 py-2 rounded-md bg-slate-800 border border-gray-500 outline-none"
          />
          {errors.fromTime && (
            <p className="text-red-400 text-sm mt-1">
              {errors.fromTime.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold">Event Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-2 rounded-md bg-slate-800 border border-gray-500 outline-none"
          />
          {errors.location && (
            <p className="text-red-400 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-600 transition-all text-white font-semibold py-2 rounded-lg cursor-pointer"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Event"}
        </button>
      </form>
    </main>
  );
}

export default UpdateEventPage;

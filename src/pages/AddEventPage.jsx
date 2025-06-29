import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

function CreateEventPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const { date, fromTime } = data;
      const dateTime = new Date(`${date}T${fromTime}`);

      const eventData = {
        title: data.title,
        description: data.description,
        eventLocation: data.location,
        dateTime,
        hostId: user?._id,
      };

      console.log(eventData);
      const res = await axiosSecure.post("/events", eventData);

      if (res.status === 201) {
        toast.success("Event created successfully!");
        reset();
        navigate("/events");
      }
    } catch (error) {
      toast.error("Something went wrong while creating the event.");
    }
  }

  return (
    <main className="bg-slate-950 text-white min-h-screen max-w-screen-xl mx-auto py-10 px-4 font-poppins">
      <h1 className="text-3xl font-semibold border-b-2 border-white text-center w-fit mx-auto pb-1 mb-10 font-rubik">
        Create New Event
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

        {/* From Time */}
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
        >
          Create Event
        </button>
      </form>
    </main>
  );
}

export default CreateEventPage;

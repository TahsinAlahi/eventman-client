import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

function MyEventCard({ event }) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  function handleDelete() {
    Swal.fire({
      title: "Are you super sure?",
      text: "Deleting this event is irreversible 😢",
      icon: "warning",
      iconColor: "#f43f5e",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#262626",
      background: "#0A0A0A",
      color: "#f8fafc",
      customClass: {
        popup: "rounded-xl shadow-lg",
        title: "text-xl font-bold",
        confirmButton: "px-5 py-2",
        cancelButton: "px-5 py-2",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/events/${event._id}`);
          if (res.status === 200) {
            toast.success("Event deleted successfully");
            queryClient.invalidateQueries(["my-events"]);
          }
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Something went wrong 💥"
          );
        }
      }
    });
  }

  return (
    <div className="bg-neutral-200 shadow-md p-4 w-full max-w-md border border-neutral-500 flex items-center justify-between flex-col cursor-default">
      <div className="w-full">
        <h3 className="text-xl font-semibold text-neutral-900">
          {event?.title}
        </h3>
        <p className="text-sm text-neutral-700 mt-1">{event?.description}</p>
        <p className="text-sm text-neutral-600 mt-1 font-medium">
          📅 {new Date(event.dateTime).toLocaleDateString("en-UK")} | ⏰{" "}
          {new Date(event.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-sm text-neutral-600 mt-1">
          📍 {event.eventLocation}
        </p>
        <p className="text-sm text-neutral-600 mt-1">
          👤 Hosted by{" "}
          <span className="font-medium">{event?.hostId?.name || "User"}</span>
        </p>
        <p className="text-sm text-neutral-600 mt-1">
          🙌 {event.attendeeCount || 0} Attendees
        </p>
      </div>

      <div className="flex gap-2 mt-5 w-full">
        <Link
          to={`/update/${event._id}`}
          className="bg-neutral-900 text-white font-semibold px-4 py-2 w-full text-center hover:bg-neutral-700 transition-all duration-200"
        >
          Update Event
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white font-semibold px-4 py-2 w-full hover:bg-red-600 cursor-pointer transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MyEventCard;

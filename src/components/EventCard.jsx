import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

function EventCard({ event, refetch }) {
  const { user } = useAuth();
  const [isJoining, setIsJoining] = useState(false);
  const axiosSecure = useAxiosSecure();

  async function handleJoinEvent() {
    setIsJoining(true);
    try {
      const res = await axiosSecure.patch(`/events/join/${event._id}`);
      refetch();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join event");
    } finally {
      setIsJoining(false);
    }
  }

  const isJoined = event.joinedUsers?.includes(user._id);

  return (
    <div className="bg-neutral-200 shadow-md p-4 w-full max-w-md border border-neutral-300 flex items-center justify-between flex-col">
      <div className="w-full">
        <h3 className="text-xl font-semibold text-neutral-900">
          {event?.title}
        </h3>
        <p className="text-sm text-neutral-700 mt-1 break-words">
          {event?.description}
        </p>
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

      <button
        onClick={handleJoinEvent}
        className="bg-neutral-950 font-semibold text-white px-4 py-2 mt-5 w-full hover:bg-primary/70 disabled:cursor-not-allowed disabled:bg-primary/50 cursor-pointer"
        disabled={isJoined | isJoining}
      >
        {isJoining ? "Joining..." : isJoined ? "Joined" : "Join"}
      </button>
    </div>
  );
}

export default EventCard;

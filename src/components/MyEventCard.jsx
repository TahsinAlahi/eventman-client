import { Link } from "react-router";

function MyEventCard({ event }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-300 flex items-center justify-between flex-col">
      <div className="w-full">
        <h3 className="text-xl font-semibold text-gray-900">{event?.title}</h3>
        <p className="text-sm text-gray-700 mt-1">{event?.description}</p>
        <p className="text-sm text-gray-600 mt-1 font-medium">
          📅 {new Date(event.dateTime).toLocaleDateString()} | ⏰{" "}
          {new Date(event.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-sm text-gray-600 mt-1">📍 {event.eventLocation}</p>
        <p className="text-sm text-gray-600 mt-1">
          👤 Hosted by{" "}
          <span className="font-medium">{event?.hostId?.name || "User"}</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          🙌 {event.attendeeCount || 0} Attendees
        </p>
      </div>

      <Link
        className="bg-purple-800 font-semibold text-white px-4 py-2 rounded mt-5 w-full hover:bg-purple-700 transition-all duration-200 text-center"
        to={`/update/${event._id}`}
      >
        Update Event
      </Link>
    </div>
  );
}

export default MyEventCard;

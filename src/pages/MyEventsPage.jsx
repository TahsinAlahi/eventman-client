import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useAuth } from "../providers/AuthProvider";
import MyEventCard from "../components/MyEventCard";

function MyEventsPage() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-events", user?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/mine`);
      console.log(res.data.data);
      return res.data.data;
    },
    enabled: !!user?._id,
  });

  if (isLoading) return <Loader />;
  if (error) return <DataError />;

  return (
    <div className="w-full min-h-screen text-white">
      <main className="mx-auto flex flex-col items-center justify-center h-full py-10 px-6">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize">
          My Events
        </h1>

        {data?.length === 0 ? (
          <p className="mt-6 text-center text-lg text-gray-400">
            You haven’t created any events yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full cursor-pointer">
            {data.map((event) => (
              <MyEventCard event={event} key={event._id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyEventsPage;

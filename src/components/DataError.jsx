import { Link } from "react-router";
import { MdErrorOutline } from "react-icons/md";

function DataErrorPage() {
  return (
    <section className="w-full min-h-screen bg-black text-neutral-200 flex items-center justify-center px-6 py-10">
      <div className="max-w-md text-center border border-red-400/20 bg-red-500/10 rounded-lg px-6 py-8">
        <MdErrorOutline className="text-5xl text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          Failed to fetch events 😓
        </h2>
        <p className="text-base text-neutral-400 mb-6">
          Something went wrong while trying to load event data. Please check
          your internet connection or try again later.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/70 transition"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default DataErrorPage;

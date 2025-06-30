import { Link } from "react-router";
import { MdErrorOutline } from "react-icons/md";

function ErrorPage() {
  return (
    <section className="w-full min-h-screen bg-black text-neutral-200 flex items-center justify-center px-6 py-10">
      <div className="max-w-md text-center border border-yellow-400/20 bg-yellow-500/10 rounded-lg px-6 py-8">
        <MdErrorOutline className="text-6xl text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">404 - Page Not Found 😕</h2>
        <p className="text-base text-neutral-400 mb-6">
          The page you’re looking for doesn’t exist or has been moved. Check the
          URL or return to the homepage.
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

export default ErrorPage;

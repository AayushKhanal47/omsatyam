import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center animate-fade-in-up">
      <SearchX className="h-12 w-12 text-text-secondary" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-text">Page not found</h1>
      <p className="mt-2 text-sm text-text-secondary">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Back to homepage
      </Link>
    </div>
  );
};

export default NotFound;

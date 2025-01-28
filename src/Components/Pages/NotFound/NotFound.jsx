import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-lime-500 text-white text-lg font-medium rounded-md shadow-md hover:bg-lime-600 transition duration-300"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;

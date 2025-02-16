import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAuthHandler } from "../../hooks/useAuthHandler";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { logout } = useAuthHandler();

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold hover:bg-primary/90 transition-colors"
      >
        {userInitial}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

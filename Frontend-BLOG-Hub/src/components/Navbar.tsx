import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook
import { FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import settings icon from react-icons

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { isAuthenticated, logout } = useAuth(); // Access isAuthenticated and logout function

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to home after logging out
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-2.5 shadow-md sticky top-0 z-50"> {/* Sticky navbar */}
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-semibold text-gray-800">
          Blog Hub
        </Link>

        {/* Centered Navigation Links */}
        <div className="flex space-x-6 font-medium"> 
          <Link
            to="/create-blog"
            className={cn(
              "text-gray-600 hover:text-indigo-600 transition-colors duration-200",
              location.pathname === '/create-article' && 'text-indigo-600 font-bold'
            )}
          >
            Create Blog
          </Link>
          <Link
            to="/user-blog"
            className={cn(
              "text-gray-600 hover:text-indigo-600 transition-colors duration-200",
              location.pathname === '/user-article' && 'text-indigo-600 font-bold'
            )}
          >
            My Blog
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* <button 
                onClick={() => navigate('/settings')}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title="Settings"
              >
                <FaCog className="text-gray-600 hover:text-indigo-600 text-lg" /> 
              </button> */}
              <button onClick={handleLogout} title="Logout">
                  <FaSignOutAlt className="text-gray-600 hover:text-red-500 text-lg cursor-pointer transition-colors duration-200" />
              </button>

            </>
          ) : (
            <> {/* ... (sign in/sign up buttons) ... */} </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  // const openGitHubLink = () => {
  //   window.open('https://github.com/abhiabhishektr', '_blank');
  // };


  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-200 relative flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      {/* Image Section (Hidden on smaller screens) */}
      <div className="hidden lg:block w-1/2 h-screen relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div> 
          </div>
        )}

        <img
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Blog Hub"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)} // Set loaded state when image loads
          style={{ opacity: imageLoaded ? 1 : 0 }} // Initial opacity 0
        />
        {imageLoaded && <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-transparent opacity-50"></div>} {/* Gradient Overlay - Only shown after image loads*/}

      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 p-8 lg:py-20 lg:px-16 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <div className="max-w-md mx-auto lg:mx-0">
          <h1 className="text-5xl lg:text-6xl font-bold text-orange-700 mb-4">Blog Hub</h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-6 leading-relaxed">
            Discover, Share, and Connect
          </p>
          <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
            Blog Hub is a paltform for sharing ideas and insights across various topics. 
            Sign up and dive into a world of curated content!
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none transition duration-300"
          >
            Join Now
          </button>
        </div>
      </div>

      {/* GitHub Link */}
      <a 
        href="https://github.com/abhiabhishektr" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 p-2 rounded-full bg-white bg-opacity-70 shadow hover:bg-opacity-90 transition duration-300"
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          className="w-6 h-6"
        />
      </a>
    </div>
  );
};

export default LandingPage;
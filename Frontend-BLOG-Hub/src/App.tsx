import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import UserBlogs from './pages/UserBlogs';
import { Toaster } from "@/components/ui/toaster"
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import DashboardPage from './pages/DashboardPage.jsx';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Temp from './components/temp';
import Navbar from '@/components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SingleBlogPage from './pages/SingleBlogPage.js';
import { BlogCreationPage } from './pages/BlogCreationPage';
import { BlogEditingPage } from './pages/BlogEditingPage';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/temp" element={<Temp />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
              <Route
                element={
                  <>
                    <Navbar />
                    <Outlet />
                  </>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/blog/:id" element={<SingleBlogPage />} />
                <Route path="/create-blog" element={<BlogCreationPage />} />
                <Route path="/user-blog" element={<UserBlogs />} />
                <Route path="/edit-blog/:id" element={<BlogEditingPage />} />
              </Route>
            </Route>
          </Routes>

          <Toaster />
        </QueryClientProvider>
      </AuthProvider>

    </>
  );
};

export default App;




// setArticles((prev) => prev.filter(article => article.id !== id));
//dislike
//       setArticles((prev) => prev.map(article => article.id === id ? { ...article, dislikes: article.dislikes + 1 } : article));

// like
//       setArticles((prev) => prev.map(article => article.id === id ? { ...article, likes: article.likes + 1 } : article));

import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WealthSpinner from "../components/Spinner";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminChat from "../pages/Chat";



// Lazy load pages
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const NotFound = lazy(() => import("../pages/NotFound"));
const BlogManagement = lazy(() => import("../pages/BlogManagement"));
const Subscription = lazy(() => import("../pages/Subscription"));
const FAQManagement = lazy(() => import("../pages/FAQManagement"));
const Support = lazy(() => import("../pages/Support"));
const Settings = lazy(() => import("../pages/Settings"));
const Banner = lazy(() => import("../pages/Banner"));
const PricingManagement = lazy(() => import("../pages/Pricing"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const TermsConditions = lazy(() => import("../pages/TermsConditions"));
const Privacy = lazy(() => import("../pages/Privacy"));
const Profile = lazy(() => import("../pages/Profile"));
const AddBlog = lazy(() => import("../pages/Blog/AddBlog"));
const UpdateBlog = lazy(() => import("../pages/Blog/UpdateBlog"));

const Routing = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<WealthSpinner />}>
        <Routes>

          {/* Public Routes */}
         
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/chat" element={<AdminChat />} />
          
        

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/users" element={<UserManagement />} />
            <Route path="/dashboard/blogs" element={<BlogManagement />} />
            <Route path="/dashboard/create-blog" element={<AddBlog />} />
            <Route path="/dashboard/update-blog/:id" element={<UpdateBlog />} />
            <Route path="/dashboard/subscription" element={<Subscription />} />
            <Route path="/dashboard/pricing" element={<PricingManagement />} />
            <Route path="/dashboard/faq" element={<FAQManagement />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/cms/about" element={<About />} />
            <Route path="/dashboard/cms/services" element={<Services />} />
            <Route path="/dashboard/cms/terms" element={<TermsConditions />} />
            <Route path="/dashboard/cms/privacy" element={<Privacy />} />
            <Route path="/dashboard/support" element={<Support />} />
            <Route path="/dashboard/banner" element={<Banner />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routing;

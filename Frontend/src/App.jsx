import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home/Home';
import LayOut from './components/LayOut/LayOut';
import Register from './components/Register/Register';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Notfound from './components/Notfound/Notfound';
import Login from './components/Login/Login';
import SignOut from './components/SignOut/SignOut';
import ServicesPage from './components/ServicesPage/ServicesPage';
import ServicesProviderPage from './components/ServicesProviderPage/ServicesProviderPage';
import AboutPage from './components/AboutPage/AboutPage';
import ContactPage from './components/ContactPage/ContactPage';
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetLinkSent from "./components/ResetLinkSent/ResetLinkSent";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import SocialSuccess from "./components/SocialSuccess/SocialSuccess";
import Profile from "./components/Profile/Profile";
import MyOrders from "./components/MyOrders/MyOrders";
import Settings from "./components/Settings/Settings";
import PaymentMethods from './components/PaymentMethods/PaymentMethods';
import AddressPage from './components/AddressPage/AddressPage';
import ProviderDetails from './components/ProviderDetails/ProviderDetails';
import BookingPage from './components/BookingPage/BookingPage';
import BookingSuccess from './components/BookingPage/BookingSuccess';
import BookingDetails from './components/OrderCard/BookingDetails';
import TrackingPage from './components/BookingPage/TrackingPage';
import SearchPage  from './components/SearchPage/SearchPage';
import Favorites from './components/Favorites/Favorites';
import Notifications  from './components/Notifications/Notifications';
import TermsPage from './components/Footer/TermsPage';
import PrivacyPage from './components/Footer/PrivacyPage';
import OrderDetailsPage from './components/BookingPage/ServiceOrderDetailsPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminRoute from './components/Admin/AdminRoute';
import UsersDashboard from './components/Admin/UsersDashboard';
import ProvidersDashboard from './components/Admin/ProvidersDashboard';
import AdminServices from './components/Admin/AdminServices';
import AdminOrders from './components/Admin/AdminOrders';
import AdminReview from './components/Admin/AdminReview';
import AdminComplaints from './components/Admin/AdminComplaints';
import AdminAdvertisements from './components/Admin/AdminAdvertisements';
import AdminSettings from './components/Admin/AdminSettings';
import ChatBot from "./components/ChatBot/ChatBot";


let x = createBrowserRouter([
  {
    path: "", element: <LayOut />, children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "servicesPage", element: <ServicesPage /> },
      { path: "servicesProviderPage", element: <ServicesProviderPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "reset-sent", element: <ResetLinkSent /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "contact", element: <ContactPage /> },
      { path: "social-success", element: <SocialSuccess /> },
      { path: "profile", element: <Profile /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "settings", element: <Settings /> },
      { path: "payment-methods", element: <PaymentMethods /> },
      { path: "addresses" , element: <AddressPage />},
      { path: "/provider/:id" , element: <ProviderDetails />},
      { path: "/booking/:id" , element: <BookingPage />},
      { path: "/booking-success/:id", element: <BookingSuccess /> },
      { path: "/booking-details/:id", element: <BookingDetails /> },
      { path:"/tracking/:id" , element:<TrackingPage /> },
      { path:"/search" , element:<SearchPage  /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/terms", element: <TermsPage />},
      { path: "/privacy", element: <PrivacyPage  />},
      { path: "/ServiceOrderDetailsPage/:id", element: <OrderDetailsPage /> },
      
      { path: "*", element: <Notfound /> }
    ]
  },
   // Admin Pages
{
  path: "/admin/dashboard",
  element: (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  )
},

{
  path: "/admin/users",
  element: (
    <AdminRoute>
      <UsersDashboard />
    </AdminRoute>
  )
},
{
  path: "/admin/providers",
  element: (
    <AdminRoute>
      <ProvidersDashboard />
    </AdminRoute>
  )
},
{
  path: "/admin/services",
  element: (
    <AdminRoute>
      <AdminServices />
    </AdminRoute>
  )
},
{
  path: "/admin/orders",
  element: (
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  )
},
{
  path: "/admin/reviews",
  element: (
    <AdminRoute>
      <AdminReview />
    </AdminRoute>
  )
},
{
  path: "/admin/complaints",
  element: (
    <AdminRoute>
      <AdminComplaints/>
    </AdminRoute>
  )
},
{
  path: "/admin/ads",
  element: (
    <AdminRoute>
      <AdminAdvertisements/>
    </AdminRoute>
  )
},
{
  path: "/admin/Settings",
  element: (
    <AdminRoute>
      <AdminSettings/>
    </AdminRoute>
  )
},
{
  path: "*",
  element: <Notfound />
}
])
function App() {

  return (
   <>
  <RouterProvider router={x} />
  <Toaster position="top-center" />
  <ChatBot />
  <ToastContainer />
</>
  )
}

export default App

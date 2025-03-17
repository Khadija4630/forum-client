import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Layout/Home";
import Membership from "../Pages/Membership/Membership";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/Profile/MyProfile";
import AddPosts from "../Pages/Dashboard/AddPosts/AddPosts";
import MyPosts from "../Pages/Dashboard/MyPosts/MyPosts";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../Pages/Dashboard/AdminDashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import ReportedActivities from "../Pages/Dashboard/AdminDashboard/ReportedActivities/ReportedActivities";
import MakeAnnouncement from "../Pages/Dashboard/AdminDashboard/MakeAnnouncement/MakeAnnouncement";
import NotFound from "../Pages/NotFound/NotFound";
import CommentsPage from "../Pages/CommentsPage/CommentsPage";
import AdminOverview from "../Pages/Dashboard/AdminDashboard/AdminOverview/AdminOverview";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        }, 
        {
          path: '/membership', 
          element:<PrivateRoute><Membership></Membership></PrivateRoute>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        // {
        //   path:"/post/:id",
        //   element:<PostDetails></PostDetails>
        // },
        {
          path: "/*",
          element:<NotFound></NotFound>,
        }
       
       
      ]
    },
    {
      path: '/dashboard',
      element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: '/dashboard',
        element: <DashboardHome></DashboardHome>,
      },
    {
      path:'/dashboard/my-profile',
      element:<MyProfile></MyProfile>,
    },
    {path:'/dashboard/add-posts',
      element:<AddPosts></AddPosts>,
    },
    {
      path:'/dashboard/my-posts',
      element:<MyPosts></MyPosts>,
    },
    {
      path:'/dashboard/comments/:postId',
      element :<CommentsPage></CommentsPage>
    }
    
      ],
    },
      {
        path: '/admin-dashboard',
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
      children: [
        // admin routes
        {
          path: '/admin-dashboard',
          element:<AdminOverview></AdminOverview>,
        },
        {
          path: '/admin-dashboard/profile',
          element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
        },
        {
          path: '/admin-dashboard/manage-users',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: '/admin-dashboard/reports',
          element: <AdminRoute><ReportedActivities></ReportedActivities></AdminRoute>
        },
        {
          path: '/admin-dashboard/make-announcement',
          element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
        },
      ],

    },
  ]);
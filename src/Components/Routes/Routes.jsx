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
// import PostDetails from "../Pages/PostDetails/PostDetails";
// import Menu from "../pages/Menu/Menu/Menu";
// import Order from "../pages/Order/Order/Order";
// import Login from "../pages/Login/Login";
// import SignUp from "../pages/SignUp/SignUp";
// import PrivateRoute from "./PrivateRoute";
// import Secret from "../pages/Shared/Secret/Secret";
// import Dashboard from "../Layout/Dashboard";
// import Cart from "../pages/Dashboard/Cart/Cart";
// import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
// import AddItems from "../pages/Dashboard/AddItems/AddItems";
// import AdminRoute from "./AdminRoute";
// import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
// import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
// import Payment from "../pages/Dashboard/Payment/Payment";
// import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
// import UserHome from "../pages/Dashboard/UserHome/UserHome";
// import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";


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
          element: <div>404</div>
        }
        // {
        //   path: '',
        //   element: <Order></Order>
        // },
        // {
        //   path: 'secret',
        //   element: <PrivateRoute><Secret></Secret></PrivateRoute>
        // }
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
    //     {
    //       path: 'userHome',
    //       element: <UserHome></UserHome>
    //     },
    //     {
    //       path: 'cart',
    //       element: <Cart></Cart>
    //     },
    //     {
    //       path: 'payment',
    //       element: <Payment></Payment>
    //     },
    //     {
    //       path: 'paymentHistory',
    //       element: <PaymentHistory></PaymentHistory>
    //     },

    //     // admin only routes
    //     {
    //       path: 'adminHome',
    //       element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
    //     },
    //     {
    //       path: 'addItems',
    //       element: <AdminRoute><AddItems></AddItems></AdminRoute>
    //     },
    //     {
    //       path: 'manageItems',
    //       element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
    //     },
    //     {
    //       path: 'updateItem/:id',
    //       element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
    //       loader: ({params}) => fetch(`https://bistro-boss-server-seven-sage.vercel.app/menu/${params.id}`)
    //     },
    //     {
    //       path: 'users',
    //       element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
    //     }

      ],
    },
  ]);
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import { FaBell } from "react-icons/fa";
import logo from "../../../assets/forum.png";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

const NavBar = ({notificationCount}) => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin,isAdminLoading] = useAdmin();
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    if (isAdminLoading) {
        return <div></div>;
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/membership">Membership</Link></li>
        
        {/* {
            // user ? 'true': 'false'
            // user ? condition ? 'double true' : 'one true' : 'false' 
        }
        {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
        <li>
            <Link to="/dashboard/cart">
                <button className="btn">
                    <FaBell className="mr-2"></FaBell>
                    {/* <div className="badge badge-secondary">+{cart.length}</div> */}
                {/* </button>
            </Link>
        </li>
        {
            user ? <> */}
                {/* <span>{user?.displayName}</span> */}
                {/* <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button> */}
            {/* </> : <> */}
                {/* <li><Link to="/login">Login</Link></li> */}
            {/* </> */}
        {/* } */} 

    </>

    return (
       
            <div className="navbar text-black fixed top-0 left-0 mb-2  z-10 bg-opacity-85  rounded-lg shadow-lg bg-lime-500  ">
                <div className="navbar-start">
                    <div className="dropdown md:hidden">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black hover:bg-black ">
                            {navOptions}
                        </ul>
                    </div>
                    <img  className="md:w-32 w-20" src={logo} alt="" />
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end flex items-center space-x-4">
                <button className="btn btn-ghost relative">
                    <FaBell />
                    {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs px-2">
              {notificationCount}
            </span>
          )}
                </button>

                {user ? (
                    <div className="relative">
                        <button
                            className="btn btn-ghost btn-circle avatar"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL} alt="profile" />
                            </div>
                        </button>
                        {dropdownOpen && (
                            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-white dark:text-black rounded-box w-52 absolute right-0">
                                <li>
                                    <span className="font-bold text-center">
                                        {user.displayName }
                                    </span>
                                </li>
                                    <li>
                                        {isAdmin ? (
                                       <Link to="/admin-dashboard">
                                            <MdDashboard className="w-6"></MdDashboard>
                                            Dashboard
                                        </Link>
                                        ):(<Link to="/dashboard" className="w-6 " >
                                <MdDashboard></MdDashboard>
                                Dashboard</Link>
                                )}
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="btn btn-ghost w-full text-left"
                                    >
                                        <IoIosLogOut className="w-10"></IoIosLogOut>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="btn bg-lime-400 bg-opacity-50 text-black border border-lime-400 hover:bg-lime-300 dark:bg-lime-400 dark:text-black dark:border-lime-400 dark:hover:bg-lime-600">
                        <CiLogin></CiLogin>
                        Join Us</Link>
                )}
            </div>
        </div>
    );
};


export default NavBar;
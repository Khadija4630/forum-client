import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
// import useCart from "../../../hooks/useCart";
// import useAdmin from "../../../hooks/useAdmin";
import { FaBell } from "react-icons/fa";
import logo from "../../../assets/forum.png";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    // const [isAdmin] = useAdmin();
    // const [cart] = useCart();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
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
       
            <div className="navbar text-black fixed  top-0 mb-2  z-10 bg-opacity-65  rounded-lg shadow-lg bg-lime-500 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown md:hidden">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {navOptions}
                        </ul>
                    </div>
                    <img  className="md:w-32 w-20" src={logo} alt="" />
                    {/* <a className="btn btn-ghost normal-case text-xl hidden lg:flex">Forum</a> */}
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end flex items-center space-x-4">
                <button className="btn btn-ghost relative">
                    <FaBell />
                    <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs px-2">
                        3
                    </span>
                </button>

                {user ? (
                    <div className="relative">
                        <button
                            className="btn btn-ghost btn-circle avatar"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || "/default-avatar.png"} alt="profile" />
                            </div>
                        </button>
                        {dropdownOpen && (
                            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 absolute right-0">
                                <li>
                                    <span className="font-bold text-center">
                                        {user.displayName || "User"}
                                    </span>
                                </li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="btn btn-ghost w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="btn">Join Us</Link>
                )}
            </div>
        </div>
    );
};


export default NavBar;
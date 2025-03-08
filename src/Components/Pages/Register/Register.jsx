import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {auth} from "../../Firebase/Firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";



const Register = () => {
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log("User created:", result.user);
                navigate("/login");
            })
            .catch(err => {
                console.error(err.message);
                setError(err.message);
            });
    };

    return (
        <div className="bg-base-200">
            <div className="flex flex-col justify-center items-center py-8">
                <h1 className="text-5xl font-bold">Register</h1>
                <form onSubmit={handleRegister} className="w-full max-w-sm bg-base-100 p-4 rounded shadow-md mt-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-lime-500 bg-opacity-50 w-full">
                            Register
                        </button>
                    </div>
                    <SocialLogin></SocialLogin>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
                <p className="mt-4">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

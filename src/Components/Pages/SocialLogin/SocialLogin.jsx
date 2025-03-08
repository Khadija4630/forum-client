import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn }  = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        // try {
        //     const result = await googleSignIn();
        //     console.log("Google Sign-In User:", result.user);

        //     const userInfo = {
        //         email: result.user?.email,
        //         name: result.user?.displayName
        //     };
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
                .then(response => {
                    navigate('/');
                    console.log(response.data);
                    navigate('/');
                });
            })
        }
        // } catch (error) {
        //     console.error("Google Sign-In Error:", error.message);
        // }
    // };
    // const handleGoogleSignIn = () =>{
    //   googleSignIn()
    //     .then(result =>{
    //         console.log(result.user);
    //         const userInfo = {
    //             email: result.user?.email,
    //             name: result.user?.displayName
    //         }
    //         axiosPublic.post('/users', userInfo)
    //         .then(res =>{
    //             console.log(res.data);
    //             navigate('/');
    //         })
    //     })
    // }

    return (
        <div className="p-4">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn  bg-lime-500 bg-opacity-50 w-full">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";

const Membership= () => {
    const { user } =useContext(AuthContext);
    const [membershipStatus, setMembershipStatus] = useState(false);

    useEffect(() => {
        // Check if user is a member (this could be based on a flag in the JWT or DB)
        if (user && user.isMember) {
            setMembershipStatus(true);
        }
    }, [user]);

    const handlePayment = () => {
        // Call your payment gateway API to handle the payment (e.g., Stripe, PayPal, etc.)
        toast.success("Payment Successful! You are now a Gold Member.");
        // Update user status
    };

    return (
        <div className="p-8 mt-10">
            {membershipStatus ? (
                <div className="membership-status">
                    <h2 className="font-bold text-3xl">You're a Gold Member</h2>
                    <span className="badge badge-gold text-2xl">Gold</span>
                    <p className="font-semibold text-xl">You can now post more than 5 posts.</p>
                </div>
            ) : (
                <div className="membership-payment">
                    <h2 className="font-bold text-3xl ">Become a Gold Member</h2>
                    <button className="btn bg-lime-500 bg-opacity-50" onClick={handlePayment}>Pay Now (N taka/dollar)</button>
                </div>
            )}
        </div>
    );
};

export default Membership;

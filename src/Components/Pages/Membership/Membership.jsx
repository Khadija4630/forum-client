import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Membership= () => {
    const { user } = useAuth();
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
        <div>
            {membershipStatus ? (
                <div className="membership-status">
                    <h2>You're a Gold Member</h2>
                    <span className="badge badge-gold">Gold</span>
                    <p>You can now post more than 5 posts.</p>
                </div>
            ) : (
                <div className="membership-payment">
                    <h2>Become a Gold Member</h2>
                    <button onClick={handlePayment}>Pay Now (N taka/dollar)</button>
                </div>
            )}
        </div>
    );
};

export default Membership;

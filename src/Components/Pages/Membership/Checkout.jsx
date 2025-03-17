import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axiosSecure
            .post("/create-payment-intent", { email: user.email, amount: 1000 })
            .then((response) => {
                setClientSecret(response.data);
                
                // console.log("Client secret:",response.data);
            })
            .catch((error) => {
                console.error("Error creating payment intent:", error.message);
            });
    }, [axiosSecure, user.email]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        if (!stripe || !elements) {
            setError("Stripe is not loaded.");
            setLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card information is missing.");
            setLoading(false);
            return;
        }

        try {
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "Anonymous",
                        email: user ?.email || "anonymous",
                    },
                },
            });

            if (paymentResult.error) {
                setError(paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                await axiosSecure.patch(`/users/${user.email}`, { isMember: true });
                setSuccess(true);
                toast.success("Payment successful! You are now a gold member.");
            }
            // refetch();
        } catch (error) {
            // setError("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setLoading(true);
    //     setError("");

    //     if (!stripe || !elements) {
    //         setError("Stripe is not loaded.");
    //         return;
    //     }

    //     const card = elements.getElement(CardElement);

    //     if (card === null) {
    //         setError("Card information is missing.");
    //         return;
    //     }

    //     const {error, paymentMethod} = await stripe.createPaymentMethod({
    //         type: "card",
    //         card
    //     })
    //     if (error) {
    //         setError(error.message);
    //         return;
    //     }
    //     else {
    //         console.log('payment method:', paymentMethod);
    //         setError ("");
    //     }
    // }



    //         useEffect =(() => { 
    //             axiosSecure.post("/create-payment-intent", { email: user.email, amount: 1000 });
    //         try{

    //         const paymentResult = stripe.confirmCardPayment(clientSecret, {
    //             payment_method: {
    //                 card: card,
    //                 billing_details: {
    //                     name: user.displayName,
    //                     email: user.email,
    //                 },
    //             },
    //         });

    //         if (paymentResult.error) {
    //             setError(paymentResult.error.message);
    //         } else if (paymentResult.paymentIntent.status === "succeeded") {
    //             // Update the user's membership status
    //              axiosSecure.patch(`/users/${user.email}`, { isMember: true });
    //             setSuccess(true);
    //         }
    //     } catch (error) {
    //         setError("Payment failed. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [user]);


    return (
        <div className=" max-w-full flex items-center justify-center bg-gray-100 mt-10">
            <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-lime-500">
                    Membership Payment
                </h2>
            {success ? (
                <p className="text-green-500">Payment successful! You are now a member.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <p  className="text-lg font-semibold text-gray-700"> Enter your payment information:</p>
                    <div className="flex w-full gap-4">
        <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1 ">Full Name:</label>
            <input
                type="text"
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-white"
                placeholder="Name"
            />
        </div>
        <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
                type="email"
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-white"
                placeholder="Email"
            />
        </div>
    </div>
    <label className="block text-sm font-medium text-gray-700">Card Information:</label>
    <CardElement className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500" />

                {error && <p className="text-red-500 ">{error}</p>}
                <button
                    type="submit"
                    className="btn bg-lime-500 w-full h-12 text-lg font-semibold rounded-md shadow-md hover:bg-lime-600 transition duration-200 dark:bg-lime-500 dark:hover:bg-lime-600 dark:outline-none"
                    disabled={!stripe || loading}
                >
                    {loading ? "Processing..." : "Pay $10"}
                </button>
                </form>
            )}
            </div>
        </div>
    );
};

export default Checkout;

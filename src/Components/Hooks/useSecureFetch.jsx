import { useState, useEffect } from "react";
import { useAxiosSecure } from "./useAxiosSecure";

const useSecureFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(endpoint);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, axiosSecure]);

    return { data, loading, error };
};

export default useSecureFetch;

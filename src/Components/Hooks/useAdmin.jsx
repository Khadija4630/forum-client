import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin = false , isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading ,
        queryFn: async () => {
            if (!user?.email) return false;

            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log("Admin Check Response:", res.data.admin); 
            return res ?.data.admin ;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;
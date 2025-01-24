import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useFetchAnnouncements =() => {
  const axiosPublic = useAxiosPublic();
 
  return useQuery({
    queryKey: ['announcement'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/announcements');

      return data;

    },
    staleTime: 5 * 60 * 1000, 
  });
};


export default useFetchAnnouncements;

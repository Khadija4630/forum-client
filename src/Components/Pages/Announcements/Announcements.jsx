import { useState, useEffect } from 'react';
import { axiosPublic } from '../../Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async'; 
import {toast} from 'react-toastify';


const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axiosPublic.get('/posts/announcements');
                setAnnouncements(response.data.announcements);
                setCount(response.data.count);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAnnouncements();
    }, []);

    return (
        <div className="mt-6">
            <Helmet>
        <title>Forum || Announcements</title>
      </Helmet>
            {count > 0 && (
                <div className="flex items-center">
                    <span className="font-semibold text-lg">Announcements ({count})</span>
                    <div className="ml-2">
                        {announcements.map((announcement) => (
                            <div key={announcement._id} className="p-4 bg-yellow-200 rounded-lg mt-2">
                                <p>{announcement.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Announcements;

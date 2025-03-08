// import { useState } from 'react';
// import {toast} from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import useFetchAnnouncements from '../../Hooks/useFetchAnnouncement';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import NavBar from '../../Shared/Navbar/Navbar';
import { FaComment } from 'react-icons/fa';

const Announcements = () => {
    const axiosPublic = useAxiosPublic();
  
    // const [newAnnouncement, setNewAnnouncement] = useState({
    //   authorImage: '',
    //   authorName: '',
    //   title: '',
    //   description: '',
    // });
  
    const { data: announcements = [], isLoading, isError, refetch } = useFetchAnnouncements();
  
    const createAnnouncement = useMutation({
      mutationFn: async (announcement) => {
        const { data } = await axiosPublic.post('/announcements', announcement);
        return console.log(data);
      },
      onSuccess: () => {
        refetch(); 
      },
    });
    const handleSubmit = (e) => {
      e.preventDefault();
      createAnnouncement.mutate(newAnnouncement);
      setNewAnnouncement({ authorImage: '', authorName: '', title: '', description: '' });
    };
  
    if (isLoading) return <p>Loading announcements...</p>;
    if (isError) return <p>Failed to fetch announcements. Please try again later.</p>;
  

    return (
        <div className="mt-6 announcement-section p-1">
            
      {announcements.length > 0 ? (
        <div className="announcement-banner bg-lime-500 bg-opacity-20 text-white p-4 rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Latest Announcements</h2>
            <div className="notification-icon relative">
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
                <NavBar notificationCount={announcements.length} />

              </span>
            </div>
          </div>

          <div className="mt-4">
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className="announcement-item bg-gray-100 p-4 rounded mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={announcement.authorImage}
                    alt={announcement.authorName}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-bold text-black">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                    <p className="text-xs text-gray-400 mb-1">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                  <div className='flex justify-between items-center'>
                  <small className='text-black'>By {announcement.authorName}</small>
                  <small className=' w-full ml-2 text-gray-400 text-xl '><FaComment></FaComment></small>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No announcements available.</p>
      )}

     {/* <div className="announcement-form mt-8 bg-white p-6 rounded shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Make an Announcement</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="authorImage" className="block text-sm font-medium">
              Author Image URL
            </label>
            <input
              type="text"
              id="authorImage"
              className="w-full p-2 border rounded"
              value={newAnnouncement.authorImage}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, authorImage: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="authorName" className="block text-sm font-medium">
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              className="w-full p-2 border rounded"
              value={newAnnouncement.authorName}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, authorName: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border rounded"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border rounded"
              value={newAnnouncement.description}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, description: e.target.value })
              }
              required
            ></textarea>
          </div>

          <button type="submit" className="p-3 bg-blue-500 text-white rounded">
            Publish Announcement
          </button>
        </form>
      </div> */}
    </div>
  );
};
export default Announcements;

import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const testimonials = [
    {
        id: 1,
        name: "Alice Johnson",
        role: "Frontend Developer",
        review: "This forum has been a game-changer for me! The discussions here are insightful and have helped me grow as a developer.",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 2,
        name: "Bob Smith",
        role: "Software Engineer",
        review: "I love how interactive and friendly this community is. I found solutions to my problems within minutes!",
        image: "https://randomuser.me/api/portraits/men/47.jpg"
    },
    {
        id: 3,
        name: "Emma Williams",
        role: "UI/UX Designer",
        review: "Great place for networking and learning! The forum discussions are top-notch, and I’ve made valuable connections here.",
        image: "https://randomuser.me/api/portraits/women/42.jpg"
    },
    {
        id: 4,
        name: "John Doe",
        role: "MERN Stack Developer",
        review: "The best forum for developers! Everyone is supportive, and the resources shared are incredibly valuable.",
        image: "https://randomuser.me/api/portraits/men/40.jpg"
    }
];

const Testimonials = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className="py-16 bg-lime-100 dark:bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-black dark:text-black">What Our Users Say</h2>

          
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 4000 }}
                    pagination={{ clickable: true }}
                    className="w-full max-w-4xl mx-auto"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={testimonial.id}>
                            <motion.div
                                className="p-6 bg-white dark:bg-white shadow-lg rounded-lg text-center mx-auto max-w-xl"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 mx-auto rounded-full mb-4"
                                />
                                <h3 className="text-lg font-semibold text-black dark:text-black">{testimonial.name}</h3>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                <p className="mt-2 text-gray-700 dark:text-gray-800">"{testimonial.review}"</p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;


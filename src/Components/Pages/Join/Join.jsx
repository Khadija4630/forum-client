import { motion } from "framer-motion";

const Join = () => {
    return (
        <section className="py-20 bg-white text-center">
            <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Join Our Community Today!
            </motion.h2>
            <motion.a
                href="/membership"
                className="mt-6 px-8 py-4 bg-white text-lime-500 opacity-80 font-bold rounded-lg shadow-lg inline-block"
                whileHover={{ scale: 1.1 }}
            >
                Sign Up Now
            </motion.a>
            <div className="mt-16 w-full max-w-5xl mx-auto text-center">
                <h2 className="text-2xl font-bold">Why Join Our Forum?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <motion.div
                        className="p-6 bg-white rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-lg font-semibold">🔹 Engage in Discussions</h3>
                        <p className="text-sm mt-2">Join like-minded individuals & share your knowledge.</p>
                    </motion.div>
                    <motion.div
                        className="p-6 bg-white rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold">🌎 Build Connections</h3>
                        <p className="text-sm mt-2">Network with professionals & grow your career.</p>
                    </motion.div>
                    <motion.div
                        className="p-6 bg-white rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="text-lg font-semibold">📚 Learn & Grow</h3>
                        <p className="text-sm mt-2">Stay updated with the latest trends & skills.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Join;

import { motion } from "framer-motion";

const Join = () => {
    return (
        <section className="py-20 bg-green-800 opacity-50 text-white text-center">
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
                className="mt-6 px-8 py-4 bg-white text-green-900 opacity-50 font-bold rounded-lg shadow-lg inline-block"
                whileHover={{ scale: 1.1 }}
            >
                Sign Up Now
            </motion.a>
        </section>
    );
};

export default Join;

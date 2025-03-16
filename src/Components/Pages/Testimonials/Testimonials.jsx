import { motion } from "framer-motion";

const testimonials = [
    { id: 1, name: "Alice", feedback: "This forum is amazing! It helped me connect with developers worldwide." },
    { id: 2, name: "Bob", feedback: "The discussions here are top-notch, and the community is very supportive." },
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-blue-100">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">What People Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-xl">"{testimonial.feedback}"</p>
                            <h3 className="mt-4 font-bold">{testimonial.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

import { motion } from "framer-motion";

const features = [
    { id: 1, title: "Real-time Discussions", description: "Engage in meaningful discussions with real-time updates." },
    { id: 2, title: "User Profiles", description: "Create your profile, follow topics, and personalize your experience." },
    { id: 3, title: "Topic Categories", description: "Easily find discussions based on different categories." },
    { id: 4, title: "Moderation Tools", description: "Admins and moderators ensure a safe community." },
];

const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-100">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Forum Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className="bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

import React, { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { motion } from "framer-motion";

const About = () => {
    const [formData, setFormData] = useState({
        title: "",
        descriptionOne: "",
        descriptionTwo: "",
        mission: "",
        values: "",
        image: "",
    });

    const [previewImage, setPreviewImage] = useState("");

    // Dummy fetched data
    const fetchedData = {
        title: "About Z Global Web Tech",
        descriptionOne: "We provide the best digital solutions globally.",
        descriptionTwo: "Our team focuses on quality, innovation, and performance.",
        mission: "To deliver world-class web solutions to everyone.",
        values: ["Quality", "Innovation", "Transparency", "Support"],
        image: "https://via.placeholder.com/400x250",
    };

    useEffect(() => {
        setFormData({
            title: fetchedData.title,
            descriptionOne: fetchedData.descriptionOne,
            descriptionTwo: fetchedData.descriptionTwo,
            mission: fetchedData.mission,
            values: fetchedData.values.join(", "),
            image: fetchedData.image,
        });
        setPreviewImage(fetchedData.image);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            setFormData({ ...formData, image: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            values: formData.values.split(",").map((v) => v.trim()),
        };

        console.log("Updated Data:", payload);
        alert("About Us Updated!");
    };

    return (
        <Layout>
            <div className="min-h-screen p-8">
                <div className="max-w-5xl mx-auto bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-xl backdrop-blur-md p-6">
                    
                    {/* HEADER */}
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-[#F8FAFC] mb-6"
                    >
                        About Us Management
                    </motion.h2>

                    {/* DISPLAY SECTION */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#08101D]/50 border border-[#F8FAFC]/10 p-5 rounded-xl mb-10"
                    >
                        <h3 className="text-xl text-[#F8FAFC] font-semibold mb-3">Current About Us Data</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-[#F8FAFC]/70 mb-2"><strong>Title:</strong> {fetchedData.title}</p>
                                <p className="text-[#F8FAFC]/70 mb-2"><strong>Description One:</strong> {fetchedData.descriptionOne}</p>
                                <p className="text-[#F8FAFC]/70 mb-2"><strong>Description Two:</strong> {fetchedData.descriptionTwo}</p>
                                <p className="text-[#F8FAFC]/70 mb-2"><strong>Mission:</strong> {fetchedData.mission}</p>
                                <p className="text-[#F8FAFC]/70 mb-2"><strong>Values:</strong> {fetchedData.values.join(", ")}</p>
                            </div>

                            {/* Image Preview */}
                            <div className="flex justify-center">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="rounded-xl shadow-lg w-80 h-52 object-cover border border-[#F8FAFC]/10"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* UPDATE FORM */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="text-[#F8FAFC] font-medium">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] border border-[#F8FAFC]/20 focus:ring-2 focus:ring-[#155DFC]"
                                placeholder="Enter title"
                                required
                            />
                        </div>

                        {/* Description One */}
                        <div>
                            <label className="text-[#F8FAFC] font-medium">Description One</label>
                            <textarea
                                name="descriptionOne"
                                value={formData.descriptionOne}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-3 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] border border-[#F8FAFC]/20 focus:ring-2 focus:ring-[#155DFC]"
                                placeholder="Enter first description"
                                required
                            />
                        </div>

                        {/* Description Two */}
                        <div>
                            <label className="text-[#F8FAFC] font-medium">Description Two</label>
                            <textarea
                                name="descriptionTwo"
                                value={formData.descriptionTwo}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-3 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] border border-[#F8FAFC]/20 focus:ring-2 focus:ring-[#155DFC]"
                                placeholder="Enter second description"
                                required
                            />
                        </div>

                        {/* Mission */}
                        <div>
                            <label className="text-[#F8FAFC] font-medium">Mission</label>
                            <textarea
                                name="mission"
                                value={formData.mission}
                                onChange={handleChange}
                                rows="2"
                                className="w-full p-3 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] border border-[#F8FAFC]/20 focus:ring-2 focus:ring-[#155DFC]"
                                placeholder="Enter mission"
                                required
                            />
                        </div>

                        {/* Values */}
                        <div>
                            <label className="text-[#F8FAFC] font-medium">Values (comma separated)</label>
                            <input
                                type="text"
                                name="values"
                                value={formData.values}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] border border-[#F8FAFC]/20 focus:ring-2 focus:ring-[#155DFC]"
                                placeholder="e.g. Quality, Trust, Innovation"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="text-[#F8FAFC] font-medium">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-2 rounded-lg bg-[#08101D]/60 text-[#F8FAFC]"
                            />
                        </div>

                        {/* BUTTON */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] text-white font-bold rounded-lg shadow-lg hover:shadow-[#155DFC]/40 transition-all duration-300"
                        >
                            Update About Us
                        </motion.button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default About;

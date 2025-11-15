import React, { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { motion } from "framer-motion";

const Services = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        url: "",
        image: "",
    });

    const [previewImage, setPreviewImage] = useState("");

    // Dummy fetched data
    const fetchedData = {
        title: "Professional Web Development",
        description: "We build high-quality, fast, secure and modern websites.",
        url: "https://zglobalwebtech.com/services/web-development",
        image: "https://via.placeholder.com/400x250",
    };

    useEffect(() => {
        setFormData({
            title: fetchedData.title,
            description: fetchedData.description,
            url: fetchedData.url,
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

        const payload = { ...formData };

        console.log("Updated Data:", payload);
        alert("Services Updated!");
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
                        Services Management
                    </motion.h2>

                    {/* DISPLAY SECTION */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#08101D]/50 border border-[#F8FAFC]/10 p-5 rounded-xl mb-10"
                    >
                        <h3 className="text-xl text-[#F8FAFC] font-semibold mb-3">Current Service Data</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-[#F8FAFC]/70 mb-2"><strong>Title:</strong> {fetchedData.title}</p>
                                <p className="text-[#F8FAFC]/70 mb-2"><strong>Description:</strong> {fetchedData.description}</p>
                                <p className="text-[#F8FAFC]/70 mb-2"><strong>URL:</strong> {fetchedData.url}</p>
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
                                placeholder="Enter service title"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-[#F8FAFC] font-medium">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-3 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] border border-[#F8FAFC]/20 focus:ring-2 focus:ring-[#155DFC]"
                                placeholder="Enter service description"
                                required
                            />
                        </div>

                        {/* URL */}
                        <div>
                            <label className="text-[#F8FAFC] font-medium">Service URL (optional)</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] border border-[#F8FAFC]/20 focus:ring-2 focus:ring-[#155DFC]"
                                placeholder="Enter service page URL"
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
                            Update Service
                        </motion.button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Services;

import React, { useState } from "react";
import Layout from "../../layout/layout";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation } from "@tanstack/react-query";
import { create_blog } from "../../queryFuction/queryFunction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlog = () => {
    
    const navigate = useNavigate();
    const { mutate, isLoading } = useMutation({
        mutationFn: create_blog,
        onSuccess: (data) => {
            toast.success("Blog created successfully");
            setTimeout(() => {
                navigate("/dashboard/blogs");
            }, 500); // Thoda delay do taaki toast dikhe
            console.log(data);
        },
        onError: (error) => {
            toast.error("Blog creation failed");
            console.log(error);
        },
    });
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        coverImage: null,
        description: "",
    });

    const [preview, setPreview] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, coverImage: file });

        if (file) setPreview(URL.createObjectURL(file));
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const Data = new FormData();

        Data.append("title", formData.title);
        Data.append("subject", formData.subject);
        Data.append("coverImage", formData.coverImage);
        Data.append("description", formData.description);

        mutate(Data);
        // console.log("Blog Submitted:", formData);
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto bg-[#0D1D33] p-6 mt-6 rounded-xl shadow-lg">
                <h2 className="text-white text-xl font-semibold mb-4">Add New Blog</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="text-white">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-[#15223B] text-white mt-1"
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="text-white">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-[#15223B] text-white mt-1"
                            placeholder="Enter subject"
                            required
                        />
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="text-white">Cover Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-2 rounded bg-[#15223B] text-white mt-1"
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-40 mt-3 rounded border border-gray-600"
                            />
                        )}
                    </div>

                    {/* TinyMCE Editor */}
                    <div>
                        <label className="text-white">Description</label>

                        <div className="mt-2 bg-white rounded overflow-hidden">
                            <Editor
                                apiKey="b1pj96zpytfbajmralhj122hkaig2oqnrma942zssz6zb3j6"
                                value={formData.description}
                                onEditorChange={(content) =>
                                    setFormData({ ...formData, description: content })
                                }
                                init={{
                                    height: 350,
                                    menubar: false,
                                    plugins: [
                                        "advlist autolink lists link image charmap preview anchor",
                                        "searchreplace visualblocks code fullscreen",
                                        "insertdatetime media table code help wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | blocks | bold italic underline | " +
                                        "alignleft aligncenter alignright alignjustify | " +
                                        "bullist numlist outdent indent | link image | " +
                                        "removeformat | help",
                                    content_style:
                                        "body { font-family:Inter, sans-serif; font-size:14px }",
                                }}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg mt-3 cursor-pointer"
                        disabled={isLoading}
                    >
                        Submit Blog
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddBlog;

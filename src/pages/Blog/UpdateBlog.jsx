import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { update_blog, blog } from "../../queryFuction/queryFunction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    coverImage: null,
    description: "",
  });
  const [preview, setPreview] = useState(null);

  const {data , isError}= useQuery({
    queryKey: ["blog", id],
    queryFn: () => blog(id),
  })
//   console.log(data)

  useEffect(() => {
    if (data?.data) {
      setFormData({
        title: data?.data?.title,
        subject: data?.data?.subject,
        coverImage: data?.data?.coverImage || null, 
        description: data?.data?.description,
      });
      setPreview(data?.data?.coverImage); 
    }
  }, [data]);

  // Mutation for updating blog
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => update_blog(id, data),
    onSuccess: () => {
      toast.success("Blog updated successfully");
      setTimeout(() => navigate("/dashboard/blogs"), 500);
    },
    onError: () => toast.error("Blog update failed"),
  });

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

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subject", formData.subject);
    if (formData.coverImage) data.append("coverImage", formData.coverImage);
    data.append("description", formData.description);

    mutate(data);
  };

//   if (blogLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-[#0D1D33] p-6 mt-6 rounded-xl shadow-lg">
        <h2 className="text-white text-xl font-semibold mb-4">Update Blog</h2>

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
            Update Blog
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateBlog;

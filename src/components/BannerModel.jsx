import React, { useState, useEffect } from "react";

const BannerModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    link: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setForm({ ...form, imageUrl: previewUrl, imageFile: file });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-[#0B1F3A] p-6 rounded-xl w-full max-w-lg border border-[#F8FAFC]/20">
        
        <h2 className="text-xl font-bold text-white mb-4">
          {initialData ? "Update Banner" : "Add Banner"}
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-[#08101D] text-white rounded border border-[#F8FAFC]/20"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-[#08101D] text-white rounded border border-[#F8FAFC]/20"
        ></textarea>

        {/* Link */}
        <input
          type="text"
          name="link"
          placeholder="Redirect Link"
          value={form.link}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-[#08101D] text-white rounded border border-[#F8FAFC]/20"
        />

        {/* Image Upload */}
        <div className="mb-3">
          <label className="text-white">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mt-2"
          />
        </div>

        {/* Preview */}
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="preview"
            className="w-full h-40 object-cover rounded mb-3 border border-[#F8FAFC]/20"
          />
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500/40 rounded text-white"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 bg-blue-600 rounded text-white"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerModal;

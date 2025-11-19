import React, { useState } from "react";
import Layout from "../layout/Layout";

const Settings = () => {
  const [formData, setFormData] = useState({
    websiteName: "",
    websiteDescription: "",
    fullLogo: null,
    smallLogo: null,
    adminEmail: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    maintenanceMode: false,
    theme: "light",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings Updated:", formData);
  };

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Website Settings</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0d1b2a] p-6 rounded-xl shadow-lg space-y-8"
        >
          {/* Website Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Website Information
            </h3>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-white">Website Name</label>
                <input
                  type="text"
                  name="websiteName"
                  value={formData.websiteName}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1b263b] text-white rounded"
                  placeholder="Enter website name"
                />
              </div>

              <div>
                <label className="text-white">Website Description</label>
                <input
                  type="text"
                  name="websiteDescription"
                  value={formData.websiteDescription}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1b263b] text-white rounded"
                  placeholder="Short description"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-5">
              <div>
                <label className="text-white">Full Logo</label>
                <input
                  type="file"
                  name="fullLogo"
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1b263b] text-white rounded"
                />
              </div>

              <div>
                <label className="text-white">Small Logo</label>
                <input
                  type="file"
                  name="smallLogo"
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1b263b] text-white rounded"
                />
              </div>
            </div>
          </div>

          {/* Admin Settings */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Admin Settings
            </h3>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-white">Admin Email</label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1b263b] text-white rounded"
                />
              </div>

              <div>
                <label className="text-white">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1b263b] text-white rounded"
                />
              </div>

              <div>
                <label className="text-white">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1b263b] text-white rounded"
                />
              </div>

              <div>
                <label className="text-white">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1b263b] text-white rounded"
                />
              </div>
            </div>
          </div>

          {/* Other Settings */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Other Settings
            </h3>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={formData.maintenanceMode}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-white">Maintenance Mode</label>
            </div>

            <div className="mt-4">
              <label className="text-white">Theme Mode</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-[#1b263b] text-white rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-4">
              Social Links
            </h3>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Facebook URL"
                className="w-full p-2 bg-[#1b263b] text-white rounded"
              />
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Instagram URL"
                className="w-full p-2 bg-[#1b263b] text-white rounded"
              />
              <input
                type="text"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                placeholder="YouTube URL"
                className="w-full p-2 bg-[#1b263b] text-white rounded"
              />
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="w-full p-2 bg-[#1b263b] text-white rounded"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Save Settings
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Settings;

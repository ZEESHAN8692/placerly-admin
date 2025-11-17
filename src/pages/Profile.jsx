import React, { useState, useEffect } from "react";
import { profile , updateProfile , resetPassword } from "../queryFuction/queryFunction";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Layout from "../layout/layout";

const Profile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
  });

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data) {
      setProfileData({
        name: data?.name || "",
        email: data?.email || "",
        phone: data?.phone || "",
        oldPassword: "",
        password: "",
      });
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: () => {
      toast.error("Failed to update profile!");
    },
  });

  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setProfileData((prev) => ({
        ...prev,
        oldPassword: "",
        password: "",
      }));
    },
    onError: () => {
      toast.error("Failed to change password!");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    resetMutation.mutate({
      email: profileData.email,
      oldPassword: profileData.oldPassword,
      password: profileData.password,
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen text-white text-lg">
          Loading profile...
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen text-red-500 text-lg">
          Failed to load profile.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0B1F3A]/60 py-10 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white">
              Profile Settings
            </h1>
            <p className="text-white/70 mt-2">
              Manage your account information and security
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#0B1F3A]/60 backdrop-blur-xl rounded-2xl border border-[#F8FAFC]/10 shadow-lg p-6">

                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-[#0B1F3A]/60 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 shadow-white/30 shadow">
                    <span className="text-2xl font-bold text-white">
                      {profileData.name ? profileData.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">{profileData.name}</h2>
                  <p className="text-white/70 mt-1">{profileData.email}</p>
                </div>

                {/* Sidebar Nav */}
                <nav className="space-y-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center px-4 py-3 text-left text-white bg-[#0B1F3A]/60 rounded-lg hover:bg-white/20 transition duration-200"
                  >
                    Profile Information
                  </button>

                  <button className="w-full flex items-center px-4 py-3 text-left text-white/80 hover:text-white rounded-lg hover:bg-[#0B1F3A]/60 transition duration-200">
                    Security
                  </button>
                </nav>

              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Profile Card */}
              <div className="bg-[#0B1F3A]/60 backdrop-blur-xl border border-[#F8FAFC]/10 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F8FAFC]/10 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    Profile Information
                  </h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-4 py-2 text-sm text-white bg-[#0B1F3A]/60 rounded-lg hover:bg-white/20 transition duration-200"
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="p-6">
                  <form onSubmit={handleProfileUpdate} className="space-y-6">

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Full Name
                      </label>

                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#F8FAFC]/10 rounded-lg bg-[#0B1F3A]/60 text-white"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-[#0B1F3A]/60 rounded-lg text-white">{profileData.name}</div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Email Address
                      </label>
                      <div className="px-4 py-3 bg-[#0B1F3A]/60 rounded-lg text-white">
                        {profileData.email}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#F8FAFC]/10 rounded-lg bg-[#0B1F3A]/60 text-white"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-[#0B1F3A]/60 rounded-lg text-white">
                          {profileData.phone}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Update Profile
                      </button>
                    )}
                  </form>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-[#0B1F3A]/60 backdrop-blur-xl border border-[#F8FAFC]/10 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F8FAFC]/10">
                  <h3 className="text-lg font-semibold text-white">Security</h3>
                  <p className="text-sm text-white/70 mt-1">
                    Manage your password and security settings
                  </p>
                </div>

                <div className="p-6">
                  <form onSubmit={handlePasswordChange} className="space-y-6">

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={profileData.oldPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#F8FAFC]/10 rounded-lg bg-[#0B1F3A]/60 text-white"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={profileData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#F8FAFC]/10 rounded-lg bg-[#0B1F3A]/60 text-white"
                        placeholder="Enter new password"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={resetMutation.isPending}
                      className="w-full bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {resetMutation.isPending ? "Changing Password..." : "Change Password"}
                    </button>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

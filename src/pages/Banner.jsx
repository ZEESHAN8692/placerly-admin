import React, { useState, useMemo } from "react";
import Layout from "../layout/layout";
import DataTable from "react-data-table-component";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  banners,
  create_banner,
  delete_banner,
  update_banner,
} from "../queryFuction/queryFunction";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import customStyles from "../custom/customeTableStyle";
import { Form } from "react-router-dom";

const Banner = () => {
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["banners"],
    queryFn: banners,
  });

  const addMutation = useMutation({
    mutationFn: create_banner,
    onSuccess: () => {
      queryClient.invalidateQueries(["banners"]);
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: update_banner,
    onSuccess: () => {
      queryClient.invalidateQueries(["banners"]);
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: delete_banner,
    onSuccess: () => queryClient.invalidateQueries(["banners"]),
  });

  const columns = [
    {
      name: "BANNER",
      selector: (row) => row.imageUrl,
      cell: (row) => (
        <img
          src={row.imageUrl}
          className="w-16 h-12 object-cover rounded border border-[#F8FAFC]/20"
        />
      ),
    },
    {
      name: "TITLE",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <span className="text-[#F8FAFC] font-medium">{row.title}</span>
      ),
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditData(row);
              setModalOpen(true);
            }}
            className="p-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#155DFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>

          <button
            onClick={() => deleteMutation.mutate(row._id)}
            className="p-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(filterText.toLowerCase()) &&
        (statusFilter === "All" ||
          String(item.isActive) === String(statusFilter))
    );
  }, [data, filterText, statusFilter]);


  return (
    <Layout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl p-6">

          {/* Heading */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#F8FAFC]">Banner Management</h2>
              <p className="text-[#F8FAFC]/60">
                Manage your website banners and promotional images.
              </p>
            </div>

            <button
              onClick={() => {
                setEditData(null);
                setModalOpen(true);
              }}
              className="bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] text-white px-5 py-2 rounded-lg"
            >
              + Add Banner
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search banners..."
              className="w-full pl-4 py-2 bg-[#08101D] text-white rounded border border-[#F8FAFC]/20"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#08101D] text-white rounded border border-[#F8FAFC]/20"
            >
              <option value="All">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            highlightOnHover
            theme="dark"
          />
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <BannerModal
          onClose={() => setModalOpen(false)}
          initialData={editData}
          onSubmit={(formData) => {

            const fd = new FormData();
            fd.append("title", formData.title);
            fd.append("description", formData.description);
            fd.append("link", formData.link);
            fd.append("imageUrl", formData.imageFile);
            // const finalData = { ...formData };
            // delete finalData.imageFile; 

            if (editData) {
              updateMutation.mutate({
                id: editData._id,
                data: fd,
              });
            } else {
              addMutation.mutate(fd);
            }
          }}
        />
      )}
    </Layout>
  );
};

// ----------------------------------------------------
// MODAL COMPONENT INSIDE SAME FILE (useForm used here)
// ----------------------------------------------------

const BannerModal = ({ onClose, onSubmit, initialData }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      link: initialData?.link || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const imageUrl = watch("imageUrl");

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setValue("imageUrl", preview);
      setValue("imageFile", file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-[#0B1F3A] p-6 rounded-xl w-full max-w-lg border border-[#F8FAFC]/20">

        <h2 className="text-xl font-bold text-white mb-4">
          {initialData ? "Update Banner" : "Add Banner"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full p-2 mb-3 bg-[#08101D] text-white rounded border border-[#F8FAFC]/20"
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full p-2 mb-3 bg-[#08101D] text-white rounded border border-[#F8FAFC]/20"
          />

          <input
            {...register("link")}
            placeholder="Redirect Link"
            className="w-full p-2 mb-3 bg-[#08101D] text-white rounded border border-[#F8FAFC]/20"
          />

          <label className="text-white">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="w-full mt-2 mb-3"
            name="imageUrl"
          />

          {imageUrl && (
            <img
              src={imageUrl}
              className="w-full h-40 object-cover rounded mb-3 border border-[#F8FAFC]/20"
            />
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500/40 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;

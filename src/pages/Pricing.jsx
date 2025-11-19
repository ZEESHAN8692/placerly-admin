import React, { useState, useMemo } from "react";
import Layout from "../layout/Layout";
import DataTable from "react-data-table-component";
import customStyles from "../custom/customeTableStyle";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pricings, create_pricing, update_pricing } from "../queryFuction/queryFunction";
import { toast } from "react-toastify";

const PricingManagement = () => {
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const queryClient = useQueryClient();

  // ------------------ GET PLANS ------------------
  const { data, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: pricings,
  });

  const plans = data || [];
  console.log(data);

  // ------------------ CREATE / UPDATE PLAN ------------------
  const { mutate } = useMutation({
    mutationFn: (formData) =>
      editData ? update_pricing(editData._id, formData) : create_pricing(formData),

    onSuccess: () => {
      toast.success(`Plan ${editData ? "updated" : "created"} successfully`);
      queryClient.invalidateQueries(["plans"]);
      closeModal();
    },

    onError: () => toast.error("Something went wrong"),
  });

  // ------------------ OPEN MODAL ------------------
  const openModal = (row = null) => {
    setEditData(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditData(null);
    setIsModalOpen(false);
  };

  // ------------------ HANDLE FORM SUBMIT ------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const payload = {
      planName: form.get("planName"),
      description: form.get("description"),
      price: Number(form.get("price")),
      type: form.get("type"),
      features: form.get("features")?.split(",").map((f) => f.trim()) || [],
    };

    mutate(payload);
  };

  // ------------------ FILTER ------------------
  const filteredPlans = useMemo(() => {
    return plans.filter((p) =>
      p.planName.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, plans]);

  // ------------------ COLUMNS ------------------
  const columns = [
    {
      name: "PLAN NAME",
      selector: (row) => row.planName,
      cell: (row) => <span className="text-white">{row.planName}</span>,
    },

    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
      grow: 2,
      cell: (row) => (
        <span className="text-white/70">
          {row.description?.length > 80
            ? row.description.slice(0, 80) + "..."
            : row.description}
        </span>
      ),
    },

    {
      name: "PRICE",
      selector: (row) => row.price,
      cell: (row) => <span className="text-[#38bdf8] font-semibold">₹{row.price}</span>,
    },

    {
      name: "TYPE",
      selector: (row) => row.type,
      cell: (row) => <span className="text-white/80">{row.type}</span>,
    },

    {
      name: "ACTIONS",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal(row)}
            className="px-3 py-1"
          >
            <svg className="w-4 h-4 text-[#155DFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          {/* DELETE */}
          <button className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200" >
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  // ------------------ COMPONENT ------------------
  return (
    <Layout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto bg-[#0B1F3A]/60 border border-white/10 rounded-2xl p-6">

          {/* Header */}
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Pricing Management</h2>
              <p className="text-white/60">Manage your pricing plans here.</p>
            </div>

            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] text-white px-6 py-3 rounded-lg shadow-md"
            >
              Add Plan
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by plan name..."
            className="w-full mb-6 px-4 py-2 bg-[#08101D] text-white rounded-lg"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />

          {/* Table */}
          <DataTable
            columns={columns}
            data={filteredPlans}
            customStyles={customStyles}
            pagination
            theme="dark"
          />
        </div>
      </div>

      {/* ----------------------------- MODAL ----------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#0B1F3A] p-6 rounded-xl w-full max-w-xl border border-white/10">
            <h2 className="text-xl text-white font-semibold mb-4">
              {editData ? "Update Plan" : "Add Plan"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="planName"
                defaultValue={editData?.planName}
                placeholder="Plan Name"
                className="w-full px-4 py-2 bg-[#08101D] text-white rounded-lg"
              />

              <textarea
                name="description"
                defaultValue={editData?.description}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 bg-[#08101D] text-white rounded-lg"
              />

              <input
                type="number"
                name="price"
                defaultValue={editData?.price}
                placeholder="Price"
                className="w-full px-4 py-2 bg-[#08101D] text-white rounded-lg"
              />

              <input
                type="text"
                name="type"
                defaultValue={editData?.type}
                placeholder="Plan Type (monthly/yearly)"
                className="w-full px-4 py-2 bg-[#08101D] text-white rounded-lg"
              />

              <input
                type="text"
                name="features"
                defaultValue={editData?.features?.join(", ")}
                placeholder="Features (comma separated)"
                className="w-full px-4 py-2 bg-[#08101D] text-white rounded-lg"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 rounded-lg text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg text-white"
                >
                  {editData ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PricingManagement;

import React, { useState, useMemo } from "react";
import Layout from "../layout/Layout";
import DataTable from "react-data-table-component";
import customStyles from "../custom/customeTableStyle";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { create_faq, faqs, update_faq, delete_faq } from "../queryFuction/queryFunction";
import { toast } from "react-toastify";

const FAQManagement = () => {
    const queryClient = useQueryClient();

    const [filterText, setFilterText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const [formData, setFormData] = useState({
        question: "",
        answer: "",

    });

    // Fetch Data
    const { data, isLoading } = useQuery({
        queryKey: ["faqs"],
        queryFn: faqs,
    });
    console.log(data);
    // CREATE + UPDATE
    const { mutate } = useMutation({
        mutationFn: () =>
            editData
                ? update_faq(editData._id, formData)
                : create_faq(formData),

        onSuccess: () => {
            toast.success(`FAQ ${editData ? "updated" : "created"} successfully`);
            queryClient.invalidateQueries(["faqs"]);
            closeModal();
        },

        onError: () => toast.error("Something went wrong"),
    });

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: (id) => delete_faq(id),

        onSuccess: () => {
            toast.success("FAQ deleted");
            queryClient.invalidateQueries(["faqs"]);
        },

        onError: () => toast.error("Delete failed"),
    });

    const openAddModal = () => {
        setEditData(null);
        setFormData({
            question: "",
            answer: "",

        });
        setShowModal(true);
    };

    const openEditModal = (faq) => {
        setEditData(faq);
        setFormData({
            question: faq.question,
            answer: faq.answer
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const filteredFAQs = useMemo(() => {
        if (!data) return [];
        return data.filter((faq) =>
            faq.question.toLowerCase().includes(filterText.toLowerCase())
        );
    }, [data, filterText]);

    const columns = [
        {
            name: "QUESTION",
            selector: (row) => row.question,
            sortable: true,
            cell: (row) => <span className="text-white">{row.question}</span>,
        },
        {
            name: "ANSWER",
            selector: (row) => row.answer,
            cell: (row) => (
                <span className="text-gray-300">
                    {row.answer.length > 70 ? row.answer.slice(0, 70) + "..." : row.answer}
                </span>
            ),
            grow: 2,
        },

        {
            name: "ACTIONS",
            cell: (row) => (

                <div className="flex space-x-2">
                    <button
                        onClick={() => openEditModal(row)}
                        className="px-3 py-1"
                    >
                        <svg className="w-4 h-4 text-[#155DFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    {/* DELETE */}
                    <button className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                        onClick={() => deleteMutation.mutate(row._id)}
                    >
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>


            ),
        },
    ];

    return (
        <Layout>
            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto bg-[#0B1F3A]/60 border border-white/10 rounded-2xl p-6">

                    {/* Header */}
                    <div className="flex justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white">FAQ Management</h2>
                            <p className="text-white/60">Manage your FAQs</p>
                        </div>

                        <button
                            onClick={openAddModal}
                            className="bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] text-white px-6 py-3 rounded-lg shadow-md"
                        >
                            + Add FAQ
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
                        data={filteredFAQs}
                        customStyles={customStyles}
                        pagination
                        theme="dark"
                    />
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-[#0F1A2A] p-6 rounded-xl w-full max-w-lg">

                        <h2 className="text-xl text-white font-bold mb-4">
                            {editData ? "Edit FAQ" : "Add FAQ"}
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Question"
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                className="w-full p-2 rounded bg-[#15223B] text-white"
                            />

                            <textarea
                                placeholder="Answer"
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                className="w-full p-2 rounded bg-[#15223B] text-white h-28"
                            />


                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3 mt-5">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-600 rounded text-white">
                                Cancel
                            </button>

                            <button
                                onClick={() => mutate()}
                                className="px-4 py-2 bg-blue-600 rounded text-white"
                            >
                                {editData ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default FAQManagement;

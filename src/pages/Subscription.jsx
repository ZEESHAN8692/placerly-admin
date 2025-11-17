import React, { useState, useMemo } from "react";
import Layout from "../layout/layout";
import DataTable from "react-data-table-component";
import customStyles from "../custom/customeTableStyle";
import { useQuery } from "@tanstack/react-query";
import { subscriptions } from "../queryFuction/queryFunction";

const Subscription = () => {
    const [filterText, setFilterText] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["subscriptions"],
        queryFn: subscriptions
    });

    const columns = [
        {
            name: "USER NAME",
            selector: (row) => row?.userId?.name,
            sortable: true,
            wrap: true,
            cell: (row) => (
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {row?.userId?.name?.charAt(0)}
                    </div>
                    <span className="text-[#F8FAFC] font-medium">
                        {row?.userId?.name}
                    </span>
                </div>
            ),
        },

        {
            name: "PLAN NAME",
            selector: (row) => row?.planId?.planName,
            sortable: true,
            cell: (row) => (
                <span className="text-[#F8FAFC]/80">
                    {row?.planId?.planName}
                </span>
            ),
        },

        {
            name: "AMOUNT PAID",
            selector: (row) => row?.amountPaid,
            sortable: true,
            cell: (row) => (
                <span className="text-[#F8FAFC]/80">
                    {row?.currency === "USD" ? "$" : "₹"}
                    {row?.amountPaid}
                </span>
            ),
        },

        {
            name: "START DATE",
            selector: (row) => row.startDate,
            sortable: true,
            cell: (row) => (
                <span className="text-[#F8FAFC]/80">
                    {new Date(row.startDate).toLocaleDateString()}
                </span>
            ),
        },

        {
            name: "END DATE",
            selector: (row) => row.endDate,
            sortable: true,
            cell: (row) => (
                <span className="text-[#F8FAFC]/80">
                    {new Date(row.endDate).toLocaleDateString()}
                </span>
            ),
        },

        {
            name: "STATUS",
            selector: (row) => row.status,
            sortable: true,
            cell: (row) => (
                <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                        row.status === "active"
                            ? "bg-green-600/20 text-green-400"
                            : "bg-red-600/20 text-red-400"
                    }`}
                >
                    {row.status}
                </span>
            ),
        },

        
    ];

    // ✔ Filter Updated According to API
    const filteredData = useMemo(() => {
        return data?.data?.filter((sub) =>
            sub?.userId?.name
                ?.toLowerCase()
                .includes(filterText.toLowerCase()) ||
            sub?.planId?.planName
                ?.toLowerCase()
                .includes(filterText.toLowerCase())
        );
    }, [data, filterText]);

    return (
        <Layout>
            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-lg backdrop-blur-md p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#F8FAFC] mb-2">
                                Subscription Management
                            </h2>
                            <p className="text-[#F8FAFC]/60">
                                Manage user subscriptions and plans here.
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
                        <div className="flex-1 w-full relative">
                            <svg
                                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F8FAFC]/40"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by user or plan..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-[#F8FAFC]/10 rounded-lg overflow-hidden">
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            customStyles={customStyles}
                            pagination
                            highlightOnHover
                            pointerOnHover
                            responsive
                            theme="dark"
                            noDataComponent="No subscriptions found."
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Subscription;

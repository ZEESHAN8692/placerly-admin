import React, { useState, useMemo } from "react";
import Layout from "../layout/layout";
import DataTable from "react-data-table-component";

const pricingPlans = [
  {
    id: 1,
    name: "Basic Plan",
    description:
      "This plan is perfect for individuals who want to get started with our platform. It includes essential features and limited access suitable for personal projects and small-scale use.",
    price: "$9.99/month",
  },
  {
    id: 2,
    name: "Pro Plan",
    description:
      "Ideal for professionals and small teams who need advanced features, more storage, and faster support to manage growing business needs efficiently and effectively.",
    price: "$29.99/month",
  },
  {
    id: 3,
    name: "Enterprise Plan",
    description:
      "Designed for large organizations requiring dedicated support, unlimited access, and full customization with premium security and scalability across all environments.",
    price: "$99.99/month",
  },
];

const PricingManagement = () => {
  const [filterText, setFilterText] = useState("");

  const filteredPlans = useMemo(() => {
    return pricingPlans.filter(plan =>
      plan.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  const columns = [
    {
      name: "PLAN NAME",
      selector: row => row.name,
      sortable: true,
      cell: row => (
        <span className="text-[#F8FAFC] font-medium">{row.name}</span>
      ),
    },
    {
      name: "DESCRIPTION",
      selector: row => row.description,
      sortable: false,
      cell: row => (
        <span className="text-[#F8FAFC]/70">
          {row.description.length > 100
            ? row.description.slice(0, 100) + "..."
            : row.description}
        </span>
      ),
      grow: 2,
    },
    {
      name: "PRICE",
      selector: row => row.price,
      sortable: true,
      cell: row => <span className="text-[#F8FAFC]/80 font-semibold">{row.price}</span>,
    },
    {
      name: "ACTIONS",
      cell: row => (
        <div className="flex space-x-2">
          <button className="p-1.5 hover:bg-[#155DFC]/20 rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4 text-[#155DFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    table: { style: { backgroundColor: "transparent" } },
    headRow: { style: { borderBottom: "1px solid rgba(248, 250, 252, 0.1)" } },
    rows: {
      style: {
        backgroundColor: "transparent",
        borderBottom: "1px solid rgba(248, 250, 252, 0.1)",
        "&:hover": { backgroundColor: "rgba(21, 93, 252, 0.05)" },
      },
    },
  };

  return (
    <Layout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-lg backdrop-blur-md p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#F8FAFC] mb-2">Pricing Management</h2>
              <p className="text-[#F8FAFC]/60">
                Manage your pricing plans and update descriptions easily.
              </p>
            </div>
            <button className="bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] hover:from-[#2D7AFC] hover:to-[#155DFC] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-[#155DFC]/30 transition-all duration-300 flex items-center space-x-2 mt-4 sm:mt-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Plan</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="flex mb-6">
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
                placeholder="Search by plan name..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="border border-[#F8FAFC]/10 rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={filteredPlans}
              customStyles={customStyles}
              pagination
              paginationPerPage={5}
              highlightOnHover
              pointerOnHover
              responsive
              theme="dark"
              noDataComponent="No plans found."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingManagement;

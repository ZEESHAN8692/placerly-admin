import React, { useState, useMemo } from "react";
import Layout from "../layout/layout";
import DataTable from "react-data-table-component";

const users = [
    { id: 1, name: "Olivia Rhye", email: "olivia@example.com", role: "Admin", status: "Active", lastLogin: "Jan 20, 2024" },
    { id: 2, name: "Phoenix Baker", email: "phoenix@example.com", role: "Advisor", status: "Pending", lastLogin: "Jan 18, 2024" },
    { id: 3, name: "Lana Steiner", email: "lana@example.com", role: "Client", status: "Blocked", lastLogin: "Jan 15, 2024" },
    { id: 4, name: "Alex Chen", email: "alex@example.com", role: "Admin", status: "Active", lastLogin: "Jan 22, 2024" },
    { id: 5, name: "Maya Patel", email: "maya@example.com", role: "Client", status: "Active", lastLogin: "Jan 19, 2024" },
    { id: 6, name: "James Wilson", email: "james@example.com", role: "Advisor", status: "Pending", lastLogin: "Jan 17, 2024" },
];

const UserManagement = () => {
    const [filterText, setFilterText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            Active: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/40" },
            Pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/40" },
            Blocked: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/40" },
        };

        const config = statusConfig[status] || statusConfig.Active;

        return (
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${config.bg} ${config.text} ${config.border}`}>
                {status}
            </span>
        );
    };

    const columns = [
        {
            name: "USER",
            selector: row => row.name,
            sortable: true,
            cell: row => (
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {row.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[#F8FAFC] font-medium">{row.name}</span>
                </div>
            ),
        },
        {
            name: "EMAIL",
            selector: row => row.email,
            sortable: true,
            cell: row => <span className="text-[#F8FAFC]/80">{row.email}</span>,
        },
        {
            name: "ROLE",
            selector: row => row.role,
            sortable: true,
            cell: row => (
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${row.role === "Admin"
                        ? "bg-[#155DFC]/20 text-[#155DFC] border border-[#155DFC]/40"
                        : row.role === "Advisor"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                    }`}>
                    {row.role}
                </span>
            ),
        },
        {
            name: "STATUS",
            selector: row => row.status,
            sortable: true,
            cell: row => <StatusBadge status={row.status} />,
        },
        {
            name: "LAST LOGIN",
            selector: row => row.lastLogin,
            sortable: true,
            cell: row => <span className="text-[#F8FAFC]/70">{row.lastLogin}</span>,
        },
        {
            name: "ACTIONS",
            cell: row => (
                <div className="flex space-x-2">
                    <button className="p-1.5 hover:bg-[#155DFC]/20 rounded-lg transition-colors duration-200">
                        <svg className="w-4 h-4 text-[#155DFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(filterText.toLowerCase()) ||
            user.email.toLowerCase().includes(filterText.toLowerCase()) &&
            (statusFilter === "All" || user.status === statusFilter) &&
            (roleFilter === "All" || user.role === roleFilter)
        );
    }, [filterText, statusFilter, roleFilter]);

    const customStyles = {
        table: {
            style: {
                backgroundColor: 'transparent',
            },
        },
        head: {
            style: {
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#F8FAFC/60',
                backgroundColor: 'transparent',
                minHeight: '52px',
            },
        },
        headRow: {
            style: {
                borderBottom: '1px solid rgba(248, 250, 252, 0.1)',
                minHeight: '52px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'rgba(248, 250, 252, 0.6)',
            },
        },
        cells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
            },
        },
        rows: {
            style: {
                backgroundColor: 'transparent',
                borderBottom: '1px solid rgba(248, 250, 252, 0.1)',
                minHeight: '60px',
                '&:hover': {
                    backgroundColor: 'rgba(21, 93, 252, 0.05)',
                },
            },
        },
        pagination: {
            style: {
                backgroundColor: 'transparent',
                borderTop: '1px solid rgba(248, 250, 252, 0.1)',
                color: 'rgba(248, 250, 252, 0.6)',
            },
            pageButtonsStyle: {
                color: '#155DFC',
                fill: '#155DFC',
                '&:disabled': {
                    color: 'rgba(248, 250, 252, 0.3)',
                },
            },
        },
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Rows per page:',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
    };

    return (
        <Layout>
            <div className="min-h-screen  p-8">
                <div className="max-w-7xl mx-auto bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-lg backdrop-blur-md p-6">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#F8FAFC] mb-2">User Management</h2>
                            <p className="text-[#F8FAFC]/60">Manage your team members and their account permissions here.</p>
                        </div>
                        <button className="bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] hover:from-[#2D7AFC] hover:to-[#155DFC] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-[#155DFC]/30 transition-all duration-300 flex items-center space-x-2 mt-4 sm:mt-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add User</span>
                        </button>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
                        <div className="flex-1 w-full relative">
                            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F8FAFC]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name, email..."
                                value={filterText}
                                onChange={e => setFilterText(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="px-4 py-2.5 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]/80 focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all duration-200"
                            >
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Blocked</option>
                            </select>
                            <select
                                value={roleFilter}
                                onChange={e => setRoleFilter(e.target.value)}
                                className="px-4 py-2.5 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]/80 focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all duration-200"
                            >
                                <option>All Roles</option>
                                <option>Admin</option>
                                <option>Advisor</option>
                                <option>Client</option>
                            </select>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="border border-[#F8FAFC]/10 rounded-lg overflow-hidden">
                        <DataTable
                            columns={columns}
                            data={filteredUsers}
                            customStyles={customStyles}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                            paginationComponentOptions={paginationComponentOptions}
                            highlightOnHover
                            pointerOnHover
                            responsive
                            theme="dark"
                            noDataComponent="No users found."
                        />
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default UserManagement;
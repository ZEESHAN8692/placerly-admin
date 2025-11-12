import React, { useState, useMemo } from "react";
import Layout from "../layout/layout";
import DataTable from "react-data-table-component";
import { update_user, users, delete_user } from "../queryFuction/queryFunction";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const UserManagement = () => {
    const [filterText, setFilterText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ Fetch Users
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: users,
    });

    // ✅ Update User Mutation
    const { mutate: updateUser, isLoading: updating } = useMutation({
        mutationFn: ({ id, data }) => update_user(id, data),
        onSuccess: () => {
            toast.success("User updated successfully");
            refetch();
            setIsModalOpen(false);
        },
        onError: (err) => {
            toast.error(`User update failed: ${err.message}`);
        },
    });

    // ✅ Delete User Mutation
    const { mutate: deleteUser, isLoading: deleting } = useMutation({
        mutationFn: delete_user,
        onSuccess: () => {
            toast.success("User deleted successfully");
            refetch();
        },
        onError: (err) => {
            toast.error(`Delete failed: ${err.message}`);
        },
    });

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUser({
            id: selectedUser._id,
            data: {
                name: selectedUser.name,
                email: selectedUser.email,
                phone: selectedUser.phone,
                role: selectedUser.role,
                status: selectedUser.status,
            },
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(id);
        }
    };

    // ✅ Filter Users
    const filteredUsers = useMemo(() => {
        if (!data?.data) return [];
        return data.data.filter(
            (user) =>
                (user.name.toLowerCase().includes(filterText.toLowerCase()) ||
                    user.email.toLowerCase().includes(filterText.toLowerCase()) ||
                    user.phone?.toLowerCase().includes(filterText.toLowerCase())) &&
                (statusFilter === "All" || user.status === statusFilter) &&
                (roleFilter === "All" || user.role === roleFilter)
        );
    }, [data, filterText, statusFilter, roleFilter]);

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

    // ✅ Table Columns
    const columns = [
        {
            name: "USER",
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => (
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {row.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-[#F8FAFC] font-medium">{row.name}</span>
                </div>
            ),
        },
        {
            name: "EMAIL",
            selector: (row) => row.email,
            sortable: true,
            cell: (row) => <span className="text-[#F8FAFC]/80">{row.email}</span>,
        },
        {
            name: "PHONE",
            selector: (row) => row.phone,
            sortable: true,
            cell: (row) => <span className="text-[#F8FAFC]/80">{row.phone || "—"}</span>,
        },
        {
            name: "ROLE",
            selector: (row) => row.role,
            sortable: true,
            cell: (row) => (
                <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        row.role === "admin"
                            ? "bg-[#155DFC]/20 text-[#155DFC] border border-[#155DFC]/40"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                    }`}
                >
                    {row.role}
                </span>
            ),
        },
        {
            name: "STATUS",
            selector: (row) => row.status,
            sortable: true,
            cell: (row) => <StatusBadge status={row.status} />,
        },
        {
            name: "ACTIONS",
            cell: (row) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(row)} className="p-1.5 cursor-pointer">
                        <FaEdit className="hover:text-blue-500" />
                    </button>
                    <button onClick={() => handleDelete(row._id)} className="p-1.5 cursor-pointer">
                        <FaTrashAlt className="hover:text-red-300" />
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#F8FAFC] mb-2">User Management</h2>
                            <p className="text-[#F8FAFC]/60">Manage your team members and their account permissions here.</p>
                        </div>
                    </div>

                    {/* ✅ Filters */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
                        <div className="flex-1 w-full relative">
                            <input
                                type="text"
                                placeholder="Search by name, email, or phone..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]"
                            />
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-3 py-2 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]"
                        >
                            <option value="All">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    {/* ✅ Table */}
                    <div className="border border-[#F8FAFC]/10 rounded-lg overflow-hidden">
                        <DataTable
                            columns={columns}
                            data={filteredUsers}
                            customStyles={customStyles}
                            pagination
                            paginationPerPage={5}
                            highlightOnHover
                            pointerOnHover
                            theme="dark"
                            noDataComponent="No users found."
                        />
                    </div>
                </div>
            </div>

            {/* ✅ Update Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#0B1F3A]/90 p-6 rounded-xl border border-[#F8FAFC]/10 w-full max-w-md">
                        <h3 className="text-xl font-bold text-[#F8FAFC] mb-4">Update User</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={selectedUser.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]"
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                name="email"
                                value={selectedUser.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]"
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={selectedUser.phone || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]"
                                placeholder="Phone"
                            />
                            <select
                                name="role"
                                value={selectedUser.role}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]"
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <select
                                name="status"
                                value={selectedUser.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-600/30 text-[#F8FAFC]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] text-white"
                                >
                                    {updating ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default UserManagement;

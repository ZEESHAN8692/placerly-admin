import React, { useState, useMemo } from "react";
import Layout from "../layout/layout";
import DataTable from "react-data-table-component";

const blogs = [
    { id: 1, title: "Understanding React Hooks", author: "Olivia Rhye", category: "Frontend", status: "Published", date: "Jan 20, 2024" },
    { id: 2, title: "Getting Started with Node.js", author: "Phoenix Baker", category: "Backend", status: "Draft", date: "Jan 18, 2024" },
    { id: 3, title: "UI/UX Design Basics", author: "Lana Steiner", category: "Design", status: "Archived", date: "Jan 15, 2024" },
    { id: 4, title: "Django REST Framework Guide", author: "Alex Chen", category: "Backend", status: "Published", date: "Jan 22, 2024" },
    { id: 5, title: "SEO Optimization Tips", author: "Maya Patel", category: "Marketing", status: "Published", date: "Jan 19, 2024" },
    { id: 6, title: "Deploying MERN Apps", author: "James Wilson", category: "Full Stack", status: "Draft", date: "Jan 17, 2024" },
];

const BlogManagement = () => {
    const [filterText, setFilterText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            Published: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/40" },
            Draft: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/40" },
            Archived: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/40" },
        };

        const config = statusConfig[status] || statusConfig.Published;

        return (
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${config.bg} ${config.text} ${config.border}`}>
                {status}
            </span>
        );
    };

    const columns = [
        {
            name: "TITLE",
            selector: row => row.title,
            sortable: true,
            cell: row => (
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {row.title[0]}
                    </div>
                    <span className="text-[#F8FAFC] font-medium">{row.title}</span>
                </div>
            ),
        },
        {
            name: "AUTHOR",
            selector: row => row.author,
            sortable: true,
            cell: row => <span className="text-[#F8FAFC]/80">{row.author}</span>,
        },
        {
            name: "CATEGORY",
            selector: row => row.category,
            sortable: true,
            cell: row => (
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium 
                    ${row.category === "Frontend"
                        ? "bg-[#155DFC]/20 text-[#155DFC] border border-[#155DFC]/40"
                        : row.category === "Backend"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                            : row.category === "Design"
                                ? "bg-pink-500/20 text-pink-400 border border-pink-500/40"
                                : row.category === "Marketing"
                                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                                    : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                    }`}>
                    {row.category}
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
            name: "DATE",
            selector: row => row.date,
            sortable: true,
            cell: row => <span className="text-[#F8FAFC]/70">{row.date}</span>,
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

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog =>
            (blog.title.toLowerCase().includes(filterText.toLowerCase()) ||
                blog.author.toLowerCase().includes(filterText.toLowerCase())) &&
            (statusFilter === "All" || blog.status === statusFilter) &&
            (categoryFilter === "All" || blog.category === categoryFilter)
        );
    }, [filterText, statusFilter, categoryFilter]);

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

    const paginationComponentOptions = {
        rowsPerPageText: "Rows per page:",
        rangeSeparatorText: "of",
        selectAllRowsItem: true,
        selectAllRowsItemText: "All",
    };

    return (
        <Layout>
            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-lg backdrop-blur-md p-6">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#F8FAFC] mb-2">Blog Management</h2>
                            <p className="text-[#F8FAFC]/60">Manage your blog posts, categories, and publication status here.</p>
                        </div>
                        <button className="bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] hover:from-[#2D7AFC] hover:to-[#155DFC] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-[#155DFC]/30 transition-all duration-300 flex items-center space-x-2 mt-4 sm:mt-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Blog</span>
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
                                placeholder="Search by title, author..."
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
                                <option>All</option>
                                <option>Published</option>
                                <option>Draft</option>
                                <option>Archived</option>
                            </select>
                            <select
                                value={categoryFilter}
                                onChange={e => setCategoryFilter(e.target.value)}
                                className="px-4 py-2.5 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]/80 focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all duration-200"
                            >
                                <option>All</option>
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>Design</option>
                                <option>Marketing</option>
                                <option>Full Stack</option>
                            </select>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="border border-[#F8FAFC]/10 rounded-lg overflow-hidden">
                        <DataTable
                            columns={columns}
                            data={filteredBlogs}
                            customStyles={customStyles}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                            paginationComponentOptions={paginationComponentOptions}
                            highlightOnHover
                            pointerOnHover
                            responsive
                            theme="dark"
                            noDataComponent="No blogs found."
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BlogManagement;

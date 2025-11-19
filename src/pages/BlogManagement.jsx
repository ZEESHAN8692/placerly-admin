import React, { useState, useMemo } from "react";
import Layout from "../layout/Layout";
import DataTable from "react-data-table-component";
import customStyles from "../custom/customeTableStyle";
import { useQuery } from "@tanstack/react-query";
import { blogs, delete_blog } from "../queryFuction/queryFunction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BlogManagement = () => {
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetching data from API
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogs,
  });
  // console.log(data);

  const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await delete_blog(id);
      refetch();
      toast.success("Blog deleted successfully");
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/40" },
      inactive: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/40" },
      draft: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/40" },
    };

    const config = statusConfig[status] || statusConfig.active;

    return (
      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${config.bg} ${config.text} ${config.border}`}>
        {status}
      </span>
    );
  };

  const columns = [
    {
      name: "IMAGE",
      cell: row => (
        <img
          src={row.coverImage}
          alt="thumbnail"
          className="w-12 h-12 rounded-lg object-cover border border-[#F8FAFC]/10"
        />
      ),
    },
    {
      name: "TITLE",
      selector: row => row.title,
      sortable: true,
      cell: row => <span className="text-[#F8FAFC] font-medium">{row.title}</span>,
    },
    {
      name: "AUTHOR",
      cell: row => <span className="text-[#F8FAFC]/80">{row.author}</span>,
    },
    {
      name: "STATUS",
      cell: row => <StatusBadge status={row.status} />,
    },
    {
      name: "DATE",
      selector: row => row.createdAt,
      sortable: true,
      cell: row => (
        <span className="text-[#F8FAFC]/70">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      name: "ACTIONS",
      cell: row => (
        <div className="flex space-x-2">
          {/* EDIT */}
          <Link to={`/dashboard/update-blog/${row._id}`}>
            <button className="p-1.5 hover:bg-[#155DFC]/20 rounded-lg transition-colors duration-200">
              <svg className="w-4 h-4 text-[#155DFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </Link>

          {/* DELETE */}
          <button className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200" onClick={() => handleDelete(row._id)}>
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filteredBlogs = useMemo(() => {
    if (!data?.data) return [];

    return data?.data?.filter(blog =>
      (blog.title.toLowerCase().includes(filterText.toLowerCase()) ||
        blog.author.toLowerCase().includes(filterText.toLowerCase())) &&
      (statusFilter === "All" || blog.status === statusFilter)
    );
  }, [data, filterText, statusFilter]);

  if (isLoading) {
    return <Layout><p className="text-white p-10">Loading...</p></Layout>;
  }

  if (error) {
    return <Layout><p className="text-red-400 p-10">Error loading blogs</p></Layout>;
  }

  return (
    <Layout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-lg backdrop-blur-md p-6">

          {/* Title + Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#F8FAFC] mb-2">Blog Management</h2>
              <p className="text-[#F8FAFC]/60">Manage your blog posts here.</p>
            </div>

            <Link to="/dashboard/create-blog">
              <button className="bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] hover:from-[#2D7AFC] hover:to-[#155DFC] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Blog</span>
              </button>
            </Link>
          </div>

          {/* Search */}
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search blogs..."
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#08101D]/60 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC]"
            />
          </div>

          {/* Table */}
          <div className="border border-[#F8FAFC]/10 rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={filteredBlogs}
              customStyles={customStyles}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
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

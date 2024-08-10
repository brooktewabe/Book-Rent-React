/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import { FaTrash, FaToggleOn, FaToggleOff, FaSearch, FaFilter } from "react-icons/fa";

// Status Toggle Component
const StatusToggle = ({ email, currentStatus, onToggle }) => {
  const isActive = currentStatus === "Active";
  return (
    <div onClick={() => onToggle(email)} className="cursor-pointer flex items-center">
      {isActive ? (
        <FaToggleOn className="text-green-500" size={24} />
      ) : (
        <FaToggleOff className="text-red-500" size={24} />
      )}
      <span className={`ml-2 ${isActive ? "text-green-500" : "text-red-500"}`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
};

// Approval Toggle Component
const ApprovalToggle = ({ email, isApproved, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(email)}
      className={`px-4 py-1 rounded ${
        isApproved ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {isApproved ? "Approved" : "Approve"}
    </button>
  );
};

const Owner = () => {
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get("api/profile/all");
        // Filter out admin users
        const nonAdminOwners = response.data.filter(owner => owner.role !== "admin");
        setOwners(nonAdminOwners);
        setFilteredOwners(nonAdminOwners);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };

    fetchOwners();
  }, []);

  useEffect(() => {
    let updatedOwners = owners;

    if (searchTerm) {
      updatedOwners = updatedOwners.filter((owner) =>
        owner.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      updatedOwners = updatedOwners.filter(
        (owner) => owner.status === filterStatus
      );
    }

    setFilteredOwners(updatedOwners);
  }, [searchTerm, filterStatus, owners]);

  const onDeleteOwner = async (ownerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/profile/${ownerId}`);
          setOwners(owners.filter((owner) => owner.id !== ownerId));
          setFilteredOwners(filteredOwners.filter((owner) => owner.id !== ownerId));
          toast.success("Owner Deleted Successfully");
        } catch (error) {
          toast.error("Error deleting owner. Try again later.");
        }
      }
    });
  };

  const toggleStatus = async (email) => {
    const updatedOwners = owners.map((owner) =>
      owner.email === email
        ? { ...owner, status: owner.status === "Active" ? "Inactive" : "Active" }
        : owner
    );
    setOwners(updatedOwners);
    setFilteredOwners(updatedOwners); // Update filteredOwners as well

    try {
      await axios.patch(`http://localhost:5000/profile/email/${email}`, {
        status: updatedOwners.find((owner) => owner.email === email).status,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleApproval = async (email) => {
    const updatedOwners = owners.map((owner) =>
      owner.email === email
        ? { ...owner, isApproved: !owner.isApproved }
        : owner
    );
    setOwners(updatedOwners);
    setFilteredOwners(updatedOwners); // Update filteredOwners as well

    try {
      await axios.patch(`http://localhost:5000/profile/email/${email}`, {
        isApproved: updatedOwners.find((owner) => owner.email === email).isApproved,
      });
    } catch (error) {
      console.error("Error updating approval:", error);
    }
  };

  return (
    <>
      <section className="bg-indigo-50 h-screen">
        <div className="container m-auto py-10 px-6">
          <div>
            <br />
            <div>
              <div className="col-span-2 grid grid-rows-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">List of Owners</h3>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSearchVisible(!searchVisible)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FaSearch size={20} />
                      </button>
                      <button
                        onClick={() => setFilterVisible(!filterVisible)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FaFilter size={20} />
                      </button>
                    </div>
                  </div>
                  {searchVisible && (
                    <input
                      type="text"
                      placeholder="Search by owner"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                  )}
                  {filterVisible && (
                    <div className="mb-4">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  )}
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                          No.
                        </td>
                        <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                          Owner
                        </td>
                        <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                          Uploads
                        </td>
                        <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                          Location
                        </td>
                        <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                          Status
                        </td>
                        <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                          Actions
                        </td>
                        <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">
                          
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOwners.map((owner) => (
                        <tr key={owner.id}>
                          <td className="py-2 px-4 border-b">{owner.id}</td>
                          <td className="py-2 px-4 border-b">
                            {owner.email}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex items-center">
                            {owner.uploads}

                            </div>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {owner.location}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <StatusToggle
                              email={owner.email}
                              currentStatus={owner.status}
                              onToggle={toggleStatus}
                            />
                          </td>
                          <td className="py-2 px-4 border-b space-x-2">
                            <button
                              onClick={() => onDeleteOwner(owner.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                          </td>
                          <td className="py-2 px-4 border-b">
                            <ApprovalToggle
                              email={owner.email}
                              isApproved={owner.isApproved}
                              onToggle={toggleApproval}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(Owner);

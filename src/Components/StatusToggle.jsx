/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import axios from "../axiosInterceptor";

const StatusToggle = ({ bookId, currentStatus, onStatusChange }) => {
  const [isActive, setIsActive] = useState(currentStatus === "Active");

  const handleToggle = async () => {
    const newStatus = isActive ? "Unavailable" : "Active";
    setIsActive(!isActive);

    try {
      await axios.patch(`http://localhost:5000/books/${bookId}`, { status: newStatus });
      onStatusChange(bookId, newStatus);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div onClick={handleToggle} className="cursor-pointer flex items-center">
      {isActive ? (
        <FaToggleOn className="text-green-500" size={24} />
      ) : (
        <FaToggleOff className="text-gray-500" size={24} />
      )}
      <span className={`ml-2 ${isActive ? "text-green-500" : "text-gray-500"}`}>
        {isActive ? "Active" : "Unavailable"}
      </span>
    </div>
  );
};

export default StatusToggle;

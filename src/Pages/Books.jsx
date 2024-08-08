import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import {  FaSearch, FaFilter } from "react-icons/fa";


const Books = () => {

  const role = localStorage.getItem("role");

  const [books, setBooks] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); 
  const [filteredBooks, setFilteredBooks] = useState([]);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    let updatedBooks = books;

    if (searchTerm) {
      updatedBooks = updatedBooks.filter((book) =>
        book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      updatedBooks = updatedBooks.filter(
        (book) => book.status === filterStatus
      );
    }

    setFilteredBooks(updatedBooks);
  }, [searchTerm, filterStatus, books]);


  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div>
            <br />
            { 
              <div>
                <div className="col-span-2 grid grid-rows-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className=" text-lg font-bold">List of Books</h3>
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
                        placeholder="Search by book name"
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
                          <option value="Active">Available</option>
                          <option value="unavailable">Unavailable</option>
                        </select>
                      </div>
                    )}
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">No.</td>
                          <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">Author</td>
                           <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">Category</td>
                          <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">Book Name</td>
                          <td className="py-2 text-[#9aa3a7] text-sm px-4 border-b">Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBooks.map((book) => (
                          <tr key={book.id}>
                            <td className="py-2 px-4 border-b">
                              {book.bookId}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {book.author}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {book.category}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {book.bookName}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {book.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            }

            </div>
          </div>
      </section>
    </>
  );
};


export { Books };
export default withAuth(Books);

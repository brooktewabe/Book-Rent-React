import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import withAuth from "../withAuth";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [NoOfCopies, setNoOfCopies] = useState(0);
  const [rentPrice, setRentPrice] = useState("");
  const [cover, setCover] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data);
        setBookName(response.data.bookName);
        setAuthor(response.data.author);
        setCategory(response.data.category);
        setNoOfCopies(response.data.NoOfCopies);
        setRentPrice(response.data.rentPrice);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("NoOfCopies", NoOfCopies);
    formData.append("rentPrice", rentPrice);
    if (cover) formData.append("files", cover);
    if (book) formData.append("files", book);

    try {
      const response = await axios.patch(
        `http://localhost:5000/books/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      Swal.fire({
        title: "Success!",
        text: "Book updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
        toast.success("Book Updated Successfully");
      });
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Error updating book. Try again later." + error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <br />
        <br />
        <br />
        <h2 className="text-xl mb-4 text-gray-400 text-center">Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-slate-100"
              required
              placeholder="Book Name"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-slate-100"
              required
              placeholder="Author"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-slate-100"
              required
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Self Help">Self Help</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="number"
              value={NoOfCopies}
              onChange={(e) => setNoOfCopies(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              placeholder="Book Quantity"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              value={rentPrice}
              onChange={(e) => setRentPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              placeholder="Rent Price"
            />
          </div>
          <div className="flex space-x-4">
            <div className="mb-4 w-1/2">
              <input
                type="file"
                id="cover"
                name="cover"
                onChange={(e) => handleFileChange(e, setCover)}
                className="hidden"
                accept="image/*"
              />
              <div className="flex justify-center items-center">
                <label
                  htmlFor="cover"
                  className="text-[#1198f1] mx-2 cursor-pointer"
                >
                  Upload New Cover (Optional)
                </label>
              </div>
            </div>
            <div className="mb-4 w-1/2">
              <input
                type="file"
                id="book"
                name="book"
                onChange={(e) => handleFileChange(e, setBook)}
                className="hidden"
                accept=".pdf, .docs, .doc"
              />
              <div className="flex items-center">
                <label
                  htmlFor="book"
                  className="text-[#1198f1] mx-2 cursor-pointer"
                >
                  Upload New Book File (Optional)
                </label>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#1198f1] text-white px-20 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default withAuth(EditBook);

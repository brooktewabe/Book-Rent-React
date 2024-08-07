import { useState } from 'react';
import Modal from 'react-modal';
import axios from '../axiosInterceptor';
import { GoUpload } from "react-icons/go";


Modal.setAppElement('#root'); // for accessibility

const CreateBook = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [noOfCopies, setNoOfCopies] = useState(0);
  const [rentPrice, setRentPrice] = useState('');
  const [cover, setCover] = useState(null);
  const [book, setBook] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bookName', bookName);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('noOfCopies', noOfCopies);
    formData.append('rentPrice', rentPrice);
    formData.append('cover', cover);
    formData.append('book', book);

    try {
      const response = await axios.post('http://localhost:5000/books/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error creating book:', error);
      // Handle error
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="bg-white p-6 rounded-lg  w-full max-w-lg">
        <div className="text-center mb-8">
          <br /><br /><br />
          <p className='font-bold'>Upload New Book</p><br />
          <button onClick={openModal} className="bg-slate-300 text-white  py-2 rounded-md w-3/5">
            Add Book
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Book"
          className="bg-white p-6  rounded-lg shadow-md w-1/2 mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center"
        >
          <h2 className="text-xl mb-4 text-gray-400 text-center">Add Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="w-full px-3 py-2 border rounded bg-slate-100"
                required
                placeholder='Book Name'
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border rounded bg-slate-100"
                required
                placeholder='Author'
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
            <div className="text-center">
              <button
                type="submit"
                onClick={closeModal}
                className="bg-[#1198f1] text-white px-4 py-2 rounded-md w-full"
              >
                Add
              </button>
            </div>
          </form>
        </Modal>

        <form onSubmit={handleSubmit} className="mt-44"> 
          <div className='flex space-x-4'>
            <div className="mb-4 w-1/2">
              <input
                type="number"
                value={noOfCopies}
                onChange={(e) => setNoOfCopies(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
                placeholder='Book Quantity'
              />
            </div>
            <div className="mb-4 w-1/2">
              <input
                type="number"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
                placeholder='Rent Price'
              />
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className="mb-4 w-1/2">
              <input
                type="file"
                id="cover"
                onChange={(e) => handleFileChange(e, setCover)}
                className="hidden"
                required
                accept='image/*'
              />
              <div className='flex justify-center items-center'>
              <GoUpload />
              <label htmlFor="cover" className="text-[#1198f1] cursor-pointer">
              Upload Cover
              </label>
              </div>
            </div>
            <div className="mb-4 w-1/2">
              <input
                type="file"
                id="book"
                onChange={(e) => handleFileChange(e, setBook)}
                className="hidden"
                required
                accept='.pdf, .docs, .doc'
              />
              <div className='flex items-center'>
              <GoUpload />
              <label htmlFor="book" className="text-[#1198f1] cursor-pointer">
                Upload Book
              </label>
              </div>
            </div>
          </div>
          <br />
          <div className="text-center">
            <button type="submit" className="bg-[#1198f1] text-white px-20 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;

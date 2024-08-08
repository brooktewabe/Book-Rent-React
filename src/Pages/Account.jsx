/* eslint-disable react-refresh/only-export-components */
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useLoaderData, Link, useNavigate, useParams } from "react-router-dom";
import axios from "../axiosInterceptor";
import withAuth from "../withAuth";
import Cookies from "js-cookie";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const Account = ({ deleteUser }) => {
  const user = useLoaderData();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const param = useParams();
  const role = localStorage.getItem("role");
  
  //Delete Account
  const onDelete = (userId) => {
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
        await deleteUser(userId);
        toast.success("Account Deleted Successfully");
        Cookies.remove("userId");
        Cookies.remove("jwt");
        localStorage.removeItem("role");
        navigate("/login");
      }
      else {
        toast.error("Unable to delete account. Try again later.")
      }
    });
  };

  return (
    <>
    <br />
      <section className="bg-indigo-50 h-screen">
        <div className="container m-auto py-10 px-6">
          <div>
            <br />
            {(role == "book_owner" || role=="admin") && (
              <div className="grid grid-cols-1  w-full gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-indigo-800 text-lg font-bold mb-6">
                    Contact Information
                  </h3>

                  <h3 className="text-xl font-bold">Email Address:</h3>

                  <p className="my-2 bg-indigo-100 p-2 font-bold">
                    {user.email}
                  </p>

                  <h3 className="text-xl font-bold">Phone Number:</h3>

                  <p className="my-2 bg-indigo-100 p-2 font-bold">
                    +251 {user.phoneNo}
                  </p>
                  <h3 className="text-xl font-bold">Location:</h3>

                  <p className="my-2 bg-indigo-100 p-2 font-bold">
                    {user.location}
                  </p>
                </div>
              </div>
            )}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                {role == "book_owner" && (
                  <>
                    <Link
                      to={`/changepassword/${user.id}`}
                      className="bg-blue-400 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Change Password
                    </Link>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Delete Account
                    </button>
                  </>
                )}

                {role == "admin" && (
                  <Link
                    to={`/changepassword/${user.id}`}
                    className="bg-green-400 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >
                    Change Password
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const userLoader = async ({ params }) => {
  const res = await axios.get(`/api/profile/${params.id}`);
  return res.data;
};

export { Account, userLoader };
export default withAuth(Account);

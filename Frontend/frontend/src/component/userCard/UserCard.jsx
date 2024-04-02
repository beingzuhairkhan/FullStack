import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE } from "../../../confiq";

const UserCard = ({ users }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE}`);
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
  
    fetchUser();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const response= await fetch(`${BASE}/${_id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCategory(category.filter((user) => user._id !== _id));
        alert("User deleted successfully.");
      } else {
        throw new Error('Failed to delete user.');
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert(error.message);
    }
  };

  
  
  return (
    <div className="lg:w-full md:w-[900px] sm:w-[600px]">
      <table className="w-full text-left text-sm text-gray-500 mt-[50px]">
        {/* Table Header */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              avatar
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Domain
            </th>
            <th scope="col" className="px-6 py-3">
              Available
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {users.length > 0 ? (
            users.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">
                  <img
                    src={item.avatar || "default_avatar_url"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4">{item.first_name}</td>
                <td className="px-6 py-4">{item.last_name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.gender}</td>
                <td className="px-6 py-4">{item.domain}</td>
                <td className="px-6 py-4">{item.available.toString()}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/dashboard/updateUser/${item._id}`}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-danger ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserCard;

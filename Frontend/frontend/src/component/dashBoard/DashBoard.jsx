import { Link } from "react-router-dom";
import UserCard from "../userCard/UserCard";
import { useEffect, useState } from "react";
import { BASE } from "../../../confiq";
import axios from "axios";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [domainQuery, setDomainQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);

  useEffect(() => {
    axios
      .get(`${BASE}`)
      .then((res) => {
        setData(res.data);
        setSearchResults(res.data); 
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    setSearchResults(data.filter((user) => user.first_name.toLowerCase().includes(query.toLowerCase())));
  };

  const handleFilter = (filterType) => {
    let filteredData = [];
    switch (filterType) {
      case "domain":
        filteredData = data.filter((user) => user.domain.toLowerCase().includes(domainQuery.toLowerCase()));
        break;
      case "male":
        filteredData = data.filter((user) => user.gender === "male");
        break;
      case "female":
        filteredData = data.filter((user) => user.gender === "Female");
        break;
      case "available":
        filteredData = data.filter((user) => user.available);
        break;
      default:
        filteredData = data;
    }
    setSearchResults(filteredData);
    setCurrentPage(1); // Reset current page when applying filters
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchResults.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-8 lg:px-20">
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full md:w-auto md:flex-grow md:mr-4 mb-4 md:mb-0">
          <div className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Name"
              className="h-12 w-full md:w-80 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="w-full md:w-auto md:mr-[170px] mb-4 md:mb-0">
          <input
            type="text"
            value={domainQuery}
            onChange={(e) => setDomainQuery(e.target.value)}
            placeholder="Search by Domain"
            className="h-12 w-full px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="mt-2 btn btn-primary w-full" onClick={() => handleFilter("domain")}>
            Search
          </button>
        </div>
        <div className="w-full mr-[150px] md:w-auto mb-4 md:mb-0 ">
          <div className="grid ">
            <span className="mr-4 ">Filter by:</span>
            <label className="mr-4">
              <input type="checkbox" onChange={() => handleFilter("male")} /> Male
            </label>
            <label className="mr-4">
              <input type="checkbox" onChange={() => handleFilter("female")} /> Female
            </label>
            <label>
              <input type="checkbox" onChange={() => handleFilter("available")} /> Available
            </label>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <Link to="/dashBoard/addNewUser" className="btn btn-success w-full">
            Add user
          </Link>
        </div>
      </div>
      <div className="mt-8">
        {/* Pass currentUsers to UserCard component */}
        <UserCard users={currentUsers} />
        {/* Pagination */}
        <ul className="pagination">
          {Array.from({ length: Math.ceil(searchResults.length / usersPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

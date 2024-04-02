import  { useState } from "react";
import { useNavigate } from "react-router-dom";

import HashLoader from "react-spinners/HashLoader";
import UploadCloudinary from "../../utils/UploadCloudinary";
import { BASE } from "../../../confiq.js"
import axios from "axios"


const NewUser = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id:"",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    available: "",
    domain: "",
    avatar: selectedFile,
  });

  const navigate = useNavigate();

  const handleInputSubmit = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSubmit = async (event) => {
    const file = event.target.files[0];
    const data = await UploadCloudinary(file);
    // console.log(data);
    setPreviewUrl(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, avatar: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    setLoading(true);
    try {
      const response = await axios.post(`${BASE}/`, formData);
      
      if (response.status === 201) {
       
        navigate('/dashboard');
        alert("New user created")
      } else {
        alert("Not saved")
    
      }
    } catch (error) {
      console.error('Error:', error);
    
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <div className="lg:w-[1200px] md:[900px] sm:[600px] p-14">
      <h1 className="text-4xl">Create New User</h1>
      <form onSubmit={submitHandler}>
      <div className="mt-4">
              <p className="form-group mb-2">Id*</p>
              <input
                onChange={handleInputSubmit}
                value={formData.id}
                type="number"
                name="id"
                placeholder="id"
                className="form-control"
                required
              />
            </div>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-5 mb-[30px]">
            <div className="mt-4">
              <p className="form-group mb-2">First Name*</p>
              <input
                onChange={handleInputSubmit}
                value={formData.first_name}
                type="text"
                name="first_name"
                placeholder="John"
                className="form-control"
                required
              />
            </div>
            <div className="mt-4">
              <p className="form-group mb-2">Last Name*</p>
              <input
                onChange={handleInputSubmit}
                value={formData.last_name}
                type="text"
                name="last_name"
                placeholder="Doe"
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="form-group mb-2">Email*</p>
          <input
            onChange={handleInputSubmit}
            value={formData.email}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className="form-control"
            required
          />
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-5 mb-[30px]">
            <div>
              <p className="form-group">Gender*</p>
              <select
                onChange={handleInputSubmit}
                value={formData.gender}
                name="gender"
                className="form-control py-2"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <p className="form-group">Available*</p>
              <select
                onChange={handleInputSubmit}
                value={formData.available}
                name="available"
                className="form-control py-2"
                required
              >
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="form-group mb-2">Domain*</p>
          <input
            onChange={handleInputSubmit}
            value={formData.domain}
            type="text"
            name="domain"
            placeholder="UI Designing"
            className="form-control"
            required
          />
        </div>
        <div className="mb-5 flex items-center gap-3 mt-6">
          {previewUrl && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img className="rounded-full" src={previewUrl} alt="Preview" />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type='file'
              name='photo'
              id='customfile'
              onChange={handleFileSubmit}
              accept='.jpg, .png'
              className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor='customfile'
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[16px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button disabled={loading} type='submit' className="btn btn-success">
            {loading ? <HashLoader size={35} color="#ffffff" /> : 'Submit'}
          </button>
       
        </div>
      </form>
    </div>
  );
};

export default NewUser;

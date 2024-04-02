import  { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import { BASE } from "../../../confiq";
import UploadCloudinary from "../../utils/UploadCloudinary";

const Edit = () => {
  const {id} = useParams()
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      avatar: "",
      domain: "",
      available: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
 
    const handleFileSubmit = async (event) => {
      const file = event.target.files[0];
      const data = await UploadCloudinary(file);
      // console.log(data);
      setPreviewUrl(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, avatar: data.url });
    };

    useEffect(() => {
      axios.get(`${BASE}/${id}`)
        .then(result => {
          setFormData({
            ...formData,
            first_name: result.data.first_name,
            last_name: result.data.last_name,
            email: result.data.email,
            gender: result.data.gender,
            avatar: result.data.avatar,
            domain: result.data.domain,
            available: result.data.available,
          })
        }).catch(err => console.log(err.message));
    }, []); 
    

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.put(`${BASE}/${id}`, formData)
    .then(result =>{
     setFormData(result.data)
     navigate('/dashboard');
    alert("Updated SuccessFully")

    })
    .catch(err => console.log(err));
  }
    
   


  return (
    <div className="w-[1200px] lg:w-[1200px] md:[900px] sm:[600px] p-14">
      <h1 className="text-4xl ">Update user</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-5 mb-[30px]">
            <div className="mt-4">
              <p className="form-group mb-2">First Name*</p>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                 onChange={handleChange}

                className="form-control"
                required
              />
            </div>
            <div className="mt-4">
              <p className="form-group mb-2">Last Name*</p>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}

                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="form-group mb-2">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}

            className="form-control"
            required
          />
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-5 mb-[30px]">
            <div>
              <p className="form-group ">Gender*</p>
              <select
                name="gender"
                className="form-control py-2"
                value={formData.gender}
                onChange={handleChange}

              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <p className="form-group ">Available*</p>
              <select
                name="available"
                className="form-control py-2"
                value={formData.available}
                onChange={handleChange}

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
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}

            className="form-control"
            required
          />
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img className="rounded-full" src={formData.avatar} alt="user" />
            </figure>
          )}
          <div className="mb-5 flex items-center gap-3 mt-6">
            {previewUrl && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img className="rounded-full" src={previewUrl} alt="Preview" />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customfile"
                onChange={handleFileSubmit}
                accept=".jpg, .png"
                className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customfile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[16px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
          </div>
        </div>
        <div className="mt-7 ">
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;


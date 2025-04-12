import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import { FaUserCircle } from "react-icons/fa";

// Import Google Font via CDN dynamically for this component
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const Dashboard = () => {
  const [auth] = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <Layout title={"Dashboard - FarmNest"}>
      <div className="container-fluid p-3 m-3">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9 d-flex justify-content-center">
            <div
              className="card w-75 p-4 text-center"
              style={{
                backgroundColor: "#f0faff", // bluish white
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* Profile Picture Section */}
              <div className="mb-4">
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "2px solid #ccc",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f8f8f8",
                  }}
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <FaUserCircle size={100} color="#888" />
                  )}
                </div>

                {/* Custom File Upload Button */}
                <div className="mt-2">
                  <label
                    htmlFor="imageUpload"
                    className="btn btn-outline-primary btn-sm"
                    style={{ cursor: "pointer" }}
                  >
                    Choose Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              {/* User Info Section */}
              <div className="text-start px-4">
                <h5>Name: {auth?.user?.name}</h5>
                <p>Email: {auth?.user?.email}</p>
                <p>Address:</p>
                <p>Street: {auth?.user?.address?.street}</p>
                <p>City: {auth?.user?.address?.city}</p>
                <p>Postal Code: {auth?.user?.address?.postalCode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

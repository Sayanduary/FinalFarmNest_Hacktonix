import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { FaUserShield } from "react-icons/fa";

// Load Poppins font dynamically
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <Layout title={"Admin Dashboard - FarmNest"}>
      <div className="container-fluid p-3 m-3">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9 d-flex justify-content-center">
            <div
              className="card w-75 p-4 text-center"
              style={{
                backgroundColor: "#f0faff",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* Admin Profile Image */}
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
                      alt="Admin Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <FaUserShield size={100} color="#888" />
                  )}
                </div>

                {/* Image Upload */}
                <div className="mt-2">
                  <label
                    htmlFor="adminImageUpload"
                    className="btn btn-outline-primary btn-sm"
                    style={{ cursor: "pointer" }}
                  >
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="adminImageUpload"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              {/* Admin Info */}
              <div className="text-start px-4">
                <h5>Name: {auth?.user?.name}</h5>
                <p>Email: {auth?.user?.email}</p>
                <p>Phone: {auth?.user?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

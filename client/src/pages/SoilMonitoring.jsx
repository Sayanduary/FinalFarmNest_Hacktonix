import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";

const SoilMonitoring = () => {
  const [formData, setFormData] = useState({
    pH: "",
    moisture: "",
    temperature: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/crops/recommend`,
        {
          ...formData,
          pH: parseFloat(formData.pH),
          moisture: parseFloat(formData.moisture),
          temperature: parseFloat(formData.temperature),
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium),
        }
      );

      setRecommendations(response.data.crops);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h2>Crop Recommendation Form</h2>
        <form onSubmit={handleSubmit}>
          {[
            "pH",
            "moisture",
            "temperature",
            "nitrogen",
            "phosphorus",
            "potassium",
          ].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.toUpperCase()}</label>
              <input
                type="number"
                step="any"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button type="submit">Get Recommendations</button>
        </form>

        {recommendations.length > 0 && (
          <div className="recommendations">
            <h3>Recommended Crops:</h3>
            <ul>
              {recommendations.map((crop, index) => (
                <li key={index}>{crop}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SoilMonitoring;

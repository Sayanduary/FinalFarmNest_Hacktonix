/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
import { CiShoppingCart, CiCircleInfo } from "react-icons/ci";

function Home() {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]); // Default set to null for no selection
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get total products count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all products by page
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        if (page === 1) {
          setProducts(data.products);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  // Filters
  const handleFilter = (checkedValue, id) => {
    let all = [...checked];
    if (checkedValue) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProducts = async () => {
    try {
      console.log("Sending filter request with:", { checked, radio });
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-filter`,
        { checked, radio }
      );
      console.log("Filter response:", data);
      setProducts(data?.products);
    } catch (error) {
      console.log("Filter error:", error);
    }
  };

  // Initial Load
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Load more on page change
  useEffect(() => {
    if (!checked.length && !radio) {
      getAllProducts();
    }
  }, [page]);

  // Filter watcher
  useEffect(() => {
    if (checked.length || radio) filterProducts();
  }, [checked, radio]);

  // Handle Radio button click
  const handleRadioChange = (e) => {
    if (JSON.stringify(radio) === JSON.stringify(e.target.value)) {
      setRadio([]); // Set to empty array when unselecting
    } else {
      setRadio(e.target.value);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-3">
        {/* Filters */}
        <div
          className="col-md-2 p-3"
          style={{
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
            borderRadius: "8px",
          }}
        >
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column" style={{ marginBottom: "20px" }}>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                style={{
                  borderRadius: "50%",
                  marginBottom: "10px",
                  padding: "5px",
                  color: "black",
                  fontWeight: "500",
                }}
                className="custom-checkbox"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Line separator */}
          <hr />

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={handleRadioChange} value={radio}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} style={{ color: "black" }}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-4"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${
                    import.meta.env.VITE_API_URL
                  }/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p
                    className="card-text mb-2"
                    style={{
                      height: "40px", // Fixed height
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                      fontSize: "14px",
                      lineHeight: "1.2em",
                    }}
                  >
                    {p.description.substring(0, 60)}...
                  </p>

                  <div>
                    <p className="card-text fw-bold">₹{p.price}</p>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      <CiCircleInfo size={22} />
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Added to Cart");
                      }}
                    >
                      <CiShoppingCart size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More or No More Message */}
          <div className="m-2 p-3 text-center">
            {!checked.length && !radio && (
              <>
                {products.length < total ? (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((prev) => prev + 1);
                    }}
                  >
                    {loading ? "Loading ..." : "Load More"}
                  </button>
                ) : (
                  <p className="text-muted mt-3">No more products to show.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS to change the checked color */}
      <style>
        {`
          .custom-checkbox .ant-checkbox-checked .ant-checkbox-inner {
            border-color: red !important;
            background-color: red !important;
          }
          .custom-checkbox .ant-checkbox-inner {
            border-radius: 50% !important;
          }
        `}
      </style>
    </Layout>
  );
}

export default Home;

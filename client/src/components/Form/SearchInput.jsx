import React, { useState } from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
  const [values, setValues, fetchResults, loading, contextError] = useSearch();
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!values.keyword || values.keyword.trim() === "") {
      setLocalError("Please enter something to search");
      return;
    }

    try {
      await fetchResults(values.keyword);
      navigate("/search");
    } catch (error) {
      console.error("Search submission error:", error);
      setLocalError("An error occurred while searching");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="search"
          placeholder="Search"
          value={values.keyword}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              keyword: e.target.value,
            }))
          }
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.iconButton}
          disabled={!values.keyword || values.keyword.trim() === "" || loading}
          aria-label="Submit search"
        >
          <IoSearch size={18} />
        </button>
      </form>
      {(localError || contextError) && (
        <div style={{ color: "red", marginTop: "8px" }}>
          {localError || contextError}
        </div>
      )}
    </div>
  );
};

const styles = {
  form: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    
    width: "400px",
    borderRadius: "999px", // full rounded
    backgroundColor: "#fff",
    boxShadow: "0 0 0 1px #ccc",
    paddingLeft: "16px",
    paddingRight: "40px",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    padding: "10px 0",
    backgroundColor: "transparent",
  },
  iconButton: {
    position: "absolute",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#333",
  },
};

export default SearchInput;

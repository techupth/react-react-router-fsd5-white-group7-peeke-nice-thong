import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/products",
        newProduct
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      {["name", "image", "price", "description"].map((field) => (
        <div key={field} className="input-container">
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)}
            <input
              id={field}
              name={field}
              type={field === "price" ? "number" : "text"}
              placeholder={`Enter ${field} here`}
              onChange={handleInputChange}
            />
          </label>
        </div>
      ))}
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default CreateProductForm;

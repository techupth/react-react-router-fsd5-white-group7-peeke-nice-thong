import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProductForm = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/products/${productId}`
      );
      setProduct(response.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4001/products/${productId}`, product);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Edit Product Form</h1>
      {["name", "image", "price", "description"].map((field) => (
        <div key={field} className="input-container">
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)}
            <input
              id={field}
              name={field}
              type={field === "price" ? "number" : "text"}
              value={product[field]}
              placeholder={`Enter ${field} here`}
              onChange={handleInputChange}
            />
          </label>
        </div>
      ))}
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default EditProductForm;

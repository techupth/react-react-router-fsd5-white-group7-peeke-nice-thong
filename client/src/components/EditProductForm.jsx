import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  const [product, setProducts] = useState({});
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(
        `http://localhost:4001/products/${param.id}`
      );
      setProducts(results.data.data);
      setName(product.name);
      setImage(product.image);
      setPrice(product.price);
      setDescription(product.description);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:4001/products/${param.id}`, {
      name: name,
      image: image,
      price: price,
      description: description,
    });
    navigate("/");
  };

  return (
    <form className="product-form" onSubmit={handleUpdate}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            onChange={(event) => {
              setImage(event.target.value);
            }}
            value={image}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            value={price}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;

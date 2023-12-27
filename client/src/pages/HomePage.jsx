import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axios("http://localhost:4001/products");
      setProducts(response.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <Link to="/product/create">
          <button>Create Product</button>
        </Link>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src="https://via.placeholder.com/250/250"
                alt="some product"
                width="250"
                height="250"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name} </h1>
              <h2>Product price: {product.price}</h2>
              <p>Product description: {product.description} </p>
              <div className="product-actions">
                <Link to={`/product/view/${product.id}`}>
                  <button className="view-button">View</button>
                </Link>
                <Link to={`/product/edit/${product.id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
              </div>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(product.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      {isError && <h1>Request failed</h1>}
      {isLoading && <h1>Loading ....</h1>}
    </div>
  );
};

export default HomePage;

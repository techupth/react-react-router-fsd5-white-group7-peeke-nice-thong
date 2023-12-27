import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewProductPage() {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const param = useParams();
  const [product, setProducts] = useState({});

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(
        `http://localhost:4001/products/${param.id}`
      );
      setProducts(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h2>{product.name}</h2>
        <p>{product.price} THB</p>
        <p>{product.description}</p>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default ViewProductPage;

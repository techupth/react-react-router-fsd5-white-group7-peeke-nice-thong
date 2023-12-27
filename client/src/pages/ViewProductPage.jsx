import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewProductPage = () => {
  const [product, setProduct] = useState();
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/products/${productId}`
      );
      setProduct(response.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h2>Product Title {product?.name} </h2>
        <p>Price: {product?.price} THB</p>
        <p>{product?.description} </p>
      </div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default ViewProductPage;

import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../deleteBtn/DeleteBtn";
import "./product.css"
import Loading from "../loading/Loading";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const toggleDescription = (index) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, isExpanded: !product.isExpanded } : product
      )
    );
  };

  const handleDeleteSuccess = (deletedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== deletedProductId)
    );
  };

  return (
    
    <div className="products-container">
      <h2 className="products-title">Our Products</h2>
      <div className="products-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <div key={product._id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">
                Product Name: <br /> {product.name}
              </h3>
              <p className="product-price">Product Price - ${product.price}</p>

              {/* Conditionally render the product description */}
              <p className="product-price" style={{width: '100%'}}>
                {product.isExpanded || product.description.length <= 50
                  ? product.description
                  : `${product.description.slice(0, 50)}...`}
                {/* Button to toggle description */}
                {product.description.length > 50 && (
                  <button
                    className="see-more-btn"
                    onClick={() => toggleDescription(index)}
                  >
                    {product.isExpanded ? "See Less" : "See More"}
                  </button>
                )}
              </p>
              <Button productId={product._id} onDelete={handleDeleteSuccess} />
            </div>
          ))
        ) : (
          // <p className="no-products">No products available.</p>
         <Loading />
        )}
      </div>
      <style jsx>{`
        .products-container {
          padding: 3rem 2rem;
          text-align: center;
          background: #1a1a1a;
          min-height: 100vh;
        }

        .products-title {
          margin-top: 50px;
          font-size: 2rem;
          color: #fff;
          margin-bottom: 2rem;
          text-shadow: 0 2px 5px rgba(255, 255, 255, 0.2);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          justify-content: center;
          padding: 1rem;
          cursor: pointer;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
        }

        .product-image {
          width: 100%;
          max-height: 180px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .product-name {
          font-size: 1.2rem;
          color: #fff;
          font-weight: 600;
        }

        .product-price {
          font-size: 1rem;
          color: #67e6dc;
          font-weight: 500;
        }

        .no-products {
          color: #ccc;
          font-size: 1.2rem;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
           .products-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    background: linear-gradient(90deg, #ff416c, #ff4b2b, #ffbb00, #33ccff, #764ba2);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    opacity: 0;
    animation: fadeInGlow 1.2s ease-in-out forwards, rainbowText 4s linear infinite;
  }

  @keyframes fadeInGlow {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes rainbowText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
    .see-more-btn {
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.see-more-btn:hover {
  color: #0056b3;
}

      `}</style>
    </div>
  );
}

export default Products;


import axios from "axios";
import { useState } from "react";
import "./deleteBtn.css"

const DeleteBtn = ({ productId, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!productId) {
      console.error("Error: Product ID is undefined");
      setError("Invalid Product ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await axios.delete(`http://localhost:8000/products/delete/${productId}`);

      if (response.status === 200) {
        console.log("Product Deleted Successfully:", response.data);
        onDelete(productId);
        window.location.reload(); // Reload after successful deletion
      } else {
        setError(response.data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DeleteBtn;

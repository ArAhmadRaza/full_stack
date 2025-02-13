import { useState } from "react";

export default function NewPost() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Define the function to upload the image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ARAhmad'); // Set your Cloudinary upload preset
    formData.append('cloud_name', 'dk8ubm5fq'); // Set your Cloudinary cloud name

    try {
      // Upload the image to Cloudinary
      const response = await fetch('https://api.cloudinary.com/v1_1/dk8ubm5fq/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Cloudinary Response:', data);
      if (response.ok) {
        // Return the URL of the uploaded image
        console.log("URL ==============>>>>>>>>>", data.url)
        let image = data.url;
        return image; // This is the Cloudinary URL
      } else {
        throw new Error('Image upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    // Ensure that the image URL is set correctly (from Cloudinary)
    if (!image) {
      setError("Image is required.");
      setIsLoading(false);
      return;
    }
  
    // Create the request body as a JSON object
    const raw = JSON.stringify({
      name: name,
      description: description,
      image: image, // This is the Cloudinary URL
      price: price,
    });
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the correct content type
      },
      body: raw,
      redirect: "follow",
    };
  
    try {
      const response = await fetch("http://localhost:8000/products/create", requestOptions);
  
      // Check for a successful response
      if (response.ok) {
        // const data = await response.json();
        setTimeout(() => {
          setIsPopupOpen(false); // Close the popup on successful submit
        }, 2000);
        window.location.reload(); // Reload the page

      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create post");
      }
    } catch (err) {
      console.error("Error submitting data:", err); // Log the error to the console
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        setImage(imageUrl); // Set the Cloudinary URL for the image
      }
    }
  };
  

  return (
    <div>
      {/* New Post Button */}
      <button onClick={() => setIsPopupOpen(true)} className="new-post-btn">
        New Post
      </button>

      {/* Animated Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button onClick={() => setIsPopupOpen(false)} className="close-btn">
              X
            </button>

            <form onSubmit={handleSubmit} className="popup-form">
              <h2 className="products-title">Create a New Post</h2>
              {error && <p className="error-message">{error}</p>}
              <div className="input-group">
                <label htmlFor="image">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="form-input file-input"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-input"
                  required
                ></textarea>
              </div>

              <div className="input-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? <div className="spinner"></div> : "Post Product"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Styles for New Post Popup */}
      <style jsx>{`
        .new-post-btn {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #67e6dc, #764ba2);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .new-post-btn:hover {
          background: linear-gradient(135deg, #764ba2, #67e6dc);
        }

        /* Popup Overlay */
        .popup-overlay {
          position: fixed;
          margin-top: 40px;
          left: 0;
          width: 100%;
          height: 70vh;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.5s ease-out;
        }

        /* Popup Container */
        .popup-container {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 1);
          position: relative;
          animation: slideIn 0.5s ease-out;
          cursor: pointer;
        }

        /* Close Button */
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: white;
        }

        .popup-form h3 {
          text-align: center;
          margin-bottom: 1rem;
          color: white;
        }

        .input-group {
          margin-bottom: 2rem;
        }

        .form-input {
          width: 94%;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #fff;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #67e6dc;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #67e6dc, #764ba2);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .error-message {
          color: #ff6b6b;
          text-align: center;
          margin-bottom: 1rem;
        }

        .spinner {
          width: 25px;
          height: 25px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-20px);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
          label{
          color: white;
          }
      `}</style>
    </div>
  );
}

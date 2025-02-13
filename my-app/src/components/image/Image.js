import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Ahmad'); // Set your Cloudinary upload preset
    formData.append('cloud_name', 'dk8ubm5fq'); // Set your Cloudinary cloud name
  
    try {
      // Upload image to Cloudinary
      const res = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
      setImageUrl(res.data.secure_url); // Get the URL of the uploaded image
    } catch (err) {
      console.error('Error uploading image: ', err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

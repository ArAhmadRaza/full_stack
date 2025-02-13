import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response Data: =======>>>>>>>", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
console.log("Tooookkkkeeeennn ========>>>>>",data.token)
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="form-title products-title">Create Account</h2>

        {error && <p className="error-message">{error}</p>}

        {[
          { label: "name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Address", name: "address", type: "text" },
        ].map((field, index) => (
          <div key={field.name} className="input-group">
            <label className="input-label">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
        ))}

        {/* Password Field with Toggle Eye Button */}
        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : "Get Started"}
        </button>

        {isLoading && <p className="loading-text">Redirecting...</p>}
      </form>

      <style jsx>{`
        .error-message {
          color: #ff6b6b;
          text-align: center;
          margin-bottom: 1rem;
          font-size: 1rem;
          background: rgba(255, 107, 107, 0.1);
          padding: 0.5rem;
          border-radius: 8px;
        }

        .loading-text {
          color: #a0aec0;
          text-align: center;
          margin-top: 1rem;
          font-size: 1rem;
          animation: fadeIn 0.5s ease-in-out infinite alternate;
        }

        .spinner {
          width: 25px;
          height: 25px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
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
        .signup-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 2rem;
          padding-top: 30px;
        }

        .signup-form {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          max-width: 450px;
          width: 100%;
          animation: fadeInUp 0.8s ease-out;
        }

        .form-title {
          color: #fff;
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .input-group {
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: slideIn 0.6s forwards;
        }

        .input-label {
          color: #a0aec0;
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .form-input {
          width: 90%;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          background: rgba(102, 126, 234, 0.05);
        }

        .password-wrapper {
          display: flex;
          align-items: center;
          position: relative;
        }

        .eye-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          position: absolute;
          right: 10px;
          color: #a0aec0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-btn {
          width: 99%;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-top: 1.5rem;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 480px) {
          .signup-form {
            padding: 1.5rem;
            border-radius: 15px;
          }
          
          .form-title {
            font-size: 1.75rem;
          }
          
          .form-input {
            padding: 0.7rem 1rem;
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
      `}</style>
    </div>
  );
}

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear errors when user starts typing
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: "", password: "", general: "" }); // Reset errors

    // Basic form validation
    if (!formData.email.includes("@")) {
      setErrors({ ...errors, email: "Please enter a valid email address." });
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setErrors({ ...errors, password: "Password must be at least 6 characters." });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        localStorage.setItem("token", responseData.data.token);
        console.log("Token ============>>>>>>>:", responseData.data.token);

        setTimeout(() => {
          navigate("/");
        }, 2000); // Delay for smooth transition
      } else {
        setErrors({ ...errors, general: responseData.error || "Invalid credentials. Please try again." });
      }
    } catch (error) {
      setErrors({ ...errors, general: "Something went wrong. Please try again later." });
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>

        {/* Email Input */}
        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "input-error" : ""}`}
            required
            disabled={isLoading}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Password Field with Toggle Eye Button */}
        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? "input-error" : ""}`}
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
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {/* General Error Message */}
        {errors.general && <p className="error-text general-error">{errors.general}</p>}

        {/* Submit Button with Loading Spinner */}
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : "Login"}
        </button>

        {/* Loading Indicator */}
        {isLoading && <p className="loading-text">Redirecting to Home...</p>}
      </form>

      <style jsx>{`
        .error-text {
          color: #ff4d4d;
          font-size: 0.9rem;
          margin-top: 5px;
        }

        .general-error {
          text-align: center;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .input-error {
          border-color: #ff4d4d;
          background: rgba(255, 77, 77, 0.1);
        }

        .loading-text {
          color: #a0aec0;
          text-align: center;
          margin-top: 1rem;
          font-size: 1rem;
          animation: fadeIn 0.5s ease-in-out infinite alternate;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
        }

        .spinner {
          width: 25px;
          height: 25px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }
        .loading-text {
          color: #a0aec0;
          text-align: center;
          margin-top: 1rem;
          font-size: 1rem;
          animation: fadeIn 0.5s ease-in-out infinite alternate;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
        }

        .spinner {
          width: 25px;
          height: 25px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 2rem;
        }

        .login-form {
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
          .login-form {
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
      `}</style>
    </div>
  );
}




























// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("token", data.token);
//         navigate("/");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2 className="form-title">Welcome Back</h2>
        
//         {error && <div className="error-message">{error}</div>}

//         <div className="input-group" style={{ animationDelay: "0.1s" }}>
//           <label className="input-label">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="form-input"
//             required
//           />
//         </div>

//         <div className="input-group" style={{ animationDelay: "0.2s" }}>
//           <label className="input-label">Password</label>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="form-input"
//               required
//             />
//             <button
//               type="button"
//               className="eye-btn"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           className="submit-btn"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Sign In"}
//         </button>
//       </form>

//       <style jsx>{`
//         .login-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
//           padding: 2rem;
//         }

//         .login-form {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           padding: 2.5rem;
//           border-radius: 20px;
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
//           max-width: 450px;
//           width: 100%;
//           animation: fadeInUp 0.8s ease-out;
//         }

//         .form-title {
//           color: #fff;
//           font-size: 2rem;
//           text-align: center;
//           margin-bottom: 2rem;
//           font-weight: 600;
//           text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//         }

//         .error-message {
//           color: #ff6b6b;
//           margin-bottom: 1rem;
//           padding: 0.5rem;
//           background: rgba(255, 107, 107, 0.1);
//           border-radius: 4px;
//           text-align: center;
//         }

//         .input-group {
//           margin-bottom: 1.5rem;
//           opacity: 0;
//           animation: slideIn 0.6s forwards;
//         }

//         .input-label {
//           color: #a0aec0;
//           display: block;
//           margin-bottom: 0.5rem;
//           font-size: 0.9rem;
//           transition: color 0.3s ease;
//         }

//         .form-input {
//           width: 90%;
//           padding: 0.8rem 1.2rem;
//           border-radius: 8px;
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           background: rgba(255, 255, 255, 0.05);
//           color: #fff;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//         }

//         .form-input:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
//           background: rgba(102, 126, 234, 0.05);
//         }

//         .password-wrapper {
//           display: flex;
//           align-items: center;
//           position: relative;
//         }

//         .eye-btn {
//           background: transparent;
//           border: none;
//           cursor: pointer;
//           position: absolute;
//           right: 10px;
//           color: #a0aec0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .submit-btn {
//           width: 99%;
//           padding: 1rem;
//           border: none;
//           border-radius: 8px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           font-weight: 600;
//           cursor: pointer;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           margin-top: 1.5rem;
//         }

//         .submit-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
//         }

//         .submit-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @media (max-width: 480px) {
//           .login-form {
//             padding: 1.5rem;
//             border-radius: 15px;
//           }
          
//           .form-title {
//             font-size: 1.75rem;
//           }
          
//           .form-input {
//             padding: 0.7rem 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
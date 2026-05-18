import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
//import { FaUser } from "react-icons/fa";
//import { MdOutlineMail } from "react-icons/md";
import * as yup from "yup";
import "./LoginForm.css";
// Validasyon Şeması
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must be at most 12 characters'),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setBackendError(null);
    setIsLoading(true);

    try {
      const response = await fakeLoginApi(data);

      if (response.success && response.user) {
        navigate('/dashboard');
      } else {
        throw new Error(response.message || 'Giriş başarısız oldu.');
      }
    } catch (error) {
      setBackendError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
     /* Arka plan dolarları ve responsive geçişler bu ana kapsayıcıda çözülüyor */
    <div className="login-page-container">
      <div className="login-page-content">
        {/* Mobilde arka planı transparan yapan, tablet/desktopta kart yapan yapı */}
        <div className="form-wrapper">
          {backendError && (
            <div className="backend-toast">
              <span>{backendError}</span>
              <button type="button" onClick={() => setBackendError(null)}></button>
            </div>
          )}
         {/* Money Guard Logo Alanı */}
          <div className="logo-container">
            <div className="logo-icon-wrapper">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_15_231)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.6579 4.94514C22.1122 4.30829 19.5664 3.03458 17.6571 1.12402C15.7478 3.03458 13.202 4.30829 10.6562 4.94514C11.2927 10.6768 13.202 14.4979 17.6571 17.6822C22.1122 14.4979 24.6579 10.6768 24.6579 4.94514Z" fill="#FFC727" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.1116 28.6578L4.29126 7.6416V17.8313L18.2929 33.7526L22.1116 28.6578Z" fill="#FBFBFB" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.0212 26.7476L31.6585 17.8316V8.27881L19.5662 22.2896L24.0212 26.7476Z" fill="#FBFBFB" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.6577 29.9319V35.6636L31.6586 27.3845V21.6528L24.6577 29.9319Z" fill="#FBFBFB" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.2921 29.9319L4.29126 21.6528V27.3845L11.2921 35.6636V29.9319Z" fill="#FBFBFB" />
                </g>
                <defs>
                  <clipPath id="clip0_15_231">
                    <rect width="35.9506" height="35.9739" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1 className="logo-text">Money Guard</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
             {/* E-mail Giriş Alanı */}
            <div className="input-field-group">
              <div className={`input-with-icon ${errors.email ? 'input-error' : ''}`}>
                {/*  <MdOutlineMail className="input-icon" />  */}
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                    <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="white" fillOpacity="0.4"/>
                </svg>
                <input
                  type="email"
                  placeholder="E-mail"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>
           {/* Password Giriş Alanı */}
            <div className="input-field-group">
              <div className={`input-with-icon ${errors.password ? 'input-error' : ''}`}>
                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                  <path d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM11.1 7H4.9V5C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7Z" fill="white" fillOpacity="0.4" />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password')}
              
                />
              </div>
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>
        
            <div className="form-action">
              <button type="submit" className="btn-grad-submit" disabled={isLoading}>
                {isLoading ? 'LOADING...' : 'LOG IN'}
              </button>
              <button type="button" className="btn-white-link" onClick={() => navigate('/register')}>
                   REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};




// * Sahte API Simülasyonu
const fakeLoginApi = (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (credentials.email === "user@moneyguard.com" && credentials.password === "123456") {
        resolve({ success: true, user: { name: "User" } });
      } else {
        resolve({ success: false, message: "Invalid email or password!" });
      }
    }, 1000);
  });
};


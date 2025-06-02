import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const getInitials = (name) => {
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0]?.toUpperCase() || "";
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please Enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please Enter a valid password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-black text-center">
          Create an Account
        </h3>
        <p className="text-sm text-slate-700 mt-2 mb-6 text-center">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignup}>
          <div className="w-full flex justify-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xl font-bold">
              {getInitials(fullName)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Aadarsh"
              type="text"
              disabled={isLoading}
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="aadarsh@gmail.com"
              type="text"
              disabled={isLoading}
            />
          </div>

          <div className="mt-4">
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-6 w-full px-4 py-2 rounded transition duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-violet-400 text-white cursor-not-allowed' 
                : 'bg-violet-600 hover:bg-violet-500 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing up...
              </>
            ) : (
              'SIGNUP'
            )}
          </button>

          <p className="text-sm text-slate-800 mt-4 text-center">
            Already have an account?{" "}
            <Link
              className={`font-medium text-violet-600 underline ${isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
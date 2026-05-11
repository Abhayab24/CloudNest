import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      alert(data.message);

      window.location.href = "/login";

    } catch(error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-[#5C4033] flex justify-center items-center px-5 font-mono">

      <div className="w-full max-w-md bg-[#8B5A2B] border-[6px] border-[#3E2723] p-8 shadow-[10px_10px_0px_#2E1B0E]">

        {/* Logo */}

        <h1 className="text-5xl text-center font-bold text-[#7CFC00] tracking-widest mb-3">
          CLOUDNEST
        </h1>

        <p className="text-center text-gray-200 mb-10">
          Create Your Player Account
        </p>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            className="w-full p-4 mb-5 bg-[#3E2723] border-[4px] border-[#2E1B0E] text-white outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full p-4 mb-5 bg-[#3E2723] border-[4px] border-[#2E1B0E] text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full p-4 mb-6 bg-[#3E2723] border-[4px] border-[#2E1B0E] text-white outline-none"
          />

          <button
            className="w-full bg-[#7CFC00] border-[4px] border-[#4E9A06] text-black font-bold p-4 hover:bg-[#8FFF00] active:translate-y-1 transition"
          >
            REGISTER
          </button>

        </form>

        {/* Login */}

        <p className="text-center text-gray-200 mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-[#7CFC00] font-bold ml-2"
          >
            LOGIN
          </Link>

        </p>

      </div>

    </div>
  );
}
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "http://localhost:5000/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if(data.token) {

        localStorage.setItem("token", data.token);

        alert("Login Successful");

       window.location.href = "/dashboard";

      } else {

        alert(data.message);
      }

    } catch(error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-black flex justify-center items-center text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-10 rounded-3xl w-[400px]"
      >

        <h1 className="text-4xl font-bold mb-8 text-cyan-400">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-gray-900 rounded-xl"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-gray-900 rounded-xl"
        />

        <button
          className="w-full bg-cyan-500 p-4 rounded-xl hover:bg-cyan-600"
        >
          Login
        </button>

        <p className="mt-5 text-gray-400">

          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}
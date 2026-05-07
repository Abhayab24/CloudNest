import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

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

      navigate("/login");

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
          Register
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-gray-900 rounded-xl"
        />

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
          Register
        </button>

        <p className="mt-5 text-gray-400">

          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";

const SignUp: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    axios
      .post("http://localhost:5000/auth/register", formData)
      .then((response) => {
        setSuccess("Registration successful!");
        setError(null);
        console.log("Response from backend:", response.data);
      })
      .catch((error) => {
        // Handle error
        setError("Registration failed. Please try again.");
        setSuccess(null);
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 shadow-md rounded-lg"
        style={{ backgroundColor: "#ccc" }}
      >
        <h2
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: "#aaa" }}
        >
          Sign Up
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            style={{ backgroundColor: "#aaa" }}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            style={{ backgroundColor: "#aaa" }}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            style={{ backgroundColor: "#aaa" }}
            required
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white"
          style={{ backgroundColor: "#aaa" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import authService from "../service/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setMessage("Password reset link sent to your email.");
      } else {
        setError("Email not found.");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="forgot-password-page h-screen flex justify-center items-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleForgotPassword}
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="mb-4 text-sm text-zinc-500">
          Enter your registered email to receive a reset link.
        </p>

        <input
          type="email"
          className="w-full border p-2 rounded mb-3"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {message && (
          <div className="text-green-600 text-sm mb-2">{message}</div>
        )}

        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;

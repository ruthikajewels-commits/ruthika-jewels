import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { authLogin } from "../firebase";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authLogin(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">
        <h1 className="login-logo">RUTHIKA</h1>
        <p className="login-subtitle">Admin Panel Access</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLoginSubmit}>
          
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                id="login-email"
                className="form-control"
                placeholder="admin@ruthika.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: "40px" }}
              />
              <Mail 
                size={18} 
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label className="form-label" htmlFor="login-password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                id="login-password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: "40px" }}
              />
              <Lock 
                size={18} 
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>

        </form>

        <p style={{ marginTop: "20px", fontSize: "0.75rem", color: "var(--color-text-muted)", textAlign: "center" }}>
          Tip: In mock local database mode, use: <br/> 
          <strong>admin@ruthika.com</strong> / <strong>admin</strong>
        </p>

      </div>
    </div>
  );
}

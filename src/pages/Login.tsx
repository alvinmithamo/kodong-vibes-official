import { useState } from "react";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { token } = await api.login({ email, password });
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-24 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-3" onSubmit={submit}>
        <input className="border rounded px-3 py-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded w-full">Sign in</button>
      </form>
    </div>
  );
}

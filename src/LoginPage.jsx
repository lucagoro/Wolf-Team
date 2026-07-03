import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api/students.js';
import { useAuth } from './context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(username, password);
      loginUser(data);
      navigate('/');
    } catch (err) {
      setError('Usuario o contraseña incorrectos. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0f0f14] to-[#15151f] min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-[400px] p-5 border border-[#2a2a3d] rounded-xl bg-[#1b1b28]">
        <h2 className="text-[#f5f5fa] text-center mb-6 text-2xl font-bold">Wolf's Team - Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-[#eaeaf0] block mb-2">Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 rounded-lg border-none bg-[#1f1f2e] text-white placeholder-[#aaa]"
              style={{ marginTop: '5px' }}
            />
          </div>
          <div className="mb-4">
            <label className="text-[#eaeaf0] block mb-2">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded-lg border-none bg-[#1f1f2e] text-white placeholder-[#aaa]"
              style={{ marginTop: '5px' }}
            />
          </div>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full p-2.5 bg-gradient-to-r from-[#5b5fff] to-[#7a5cff] text-white border-none rounded-lg cursor-pointer font-semibold"
        >
          {loading ? 'Entrando...' : 'Iniciar Sesión'}
        </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
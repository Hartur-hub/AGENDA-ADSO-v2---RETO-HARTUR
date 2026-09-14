import React, { useState } from 'react';
import InputGroup from './InputGroup';

export default function LoginForm({ onLoginSuccess, switchToRegister }) {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.correo.trim()) newErrors.correo = 'El correo es obligatorio';
    else if (!emailRegex.test(formData.correo.trim())) newErrors.correo = 'Formato de correo inválido';

    if (!formData.password.trim()) newErrors.password = 'La contraseña es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/usuarios?correo=${encodeURIComponent(formData.correo.trim())}`);
      const data = await res.json();

      if (data.length > 0 && data[0].password === formData.password) {
        onLoginSuccess(data[0]);
      } else {
        setAuthError('El correo o la contraseña no coinciden');
      }
    } catch (err) {
      setAuthError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-xl">
      <h2 className="text-2xl font-bold text-center text-sky-400 mb-6">Iniciar Sesión</h2>
      
      {authError && (
        <div className="bg-rose-900/40 border border-rose-500 text-rose-300 p-3 rounded mb-4 text-sm text-center">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <InputGroup
          label="Correo Electrónico"
          type="email"
          name="correo"
          value={formData.correo}
          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          error={errors.correo}
          placeholder="ejemplo@correo.com"
        />

        <InputGroup
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 font-semibold rounded text-white transition-colors"
        >
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        ¿No tienes cuenta?{' '}
        <button onClick={switchToRegister} className="text-sky-400 hover:underline">
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}
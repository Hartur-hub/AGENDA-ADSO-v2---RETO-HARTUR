import React, { useState } from 'react';
import InputGroup from './InputGroup';

export default function RegisterForm({ switchToLogin }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.correo.trim()) newErrors.correo = 'El correo es obligatorio';
    else if (!emailRegex.test(formData.correo.trim())) newErrors.correo = 'Formato de correo inválido';

    if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    if (!validate()) return;

    setLoading(true);
    try {
      // Verificar si el correo ya existe
      const checkRes = await fetch(`http://localhost:3001/usuarios?correo=${encodeURIComponent(formData.correo.trim())}`);
      const existing = await checkRes.json();

      if (existing.length > 0) {
        setErrors({ correo: 'El correo ya está registrado' });
        setLoading(false);
        return;
      }

      // Guardar nuevo usuario
      const newUser = {
        nombre: formData.nombre.trim(),
        correo: formData.correo.trim(),
        password: formData.password,
        rol: 'user'
      };

      await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      setSuccessMsg('¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => switchToLogin(), 2000);
    } catch (err) {
      alert('Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-xl">
      <h2 className="text-2xl font-bold text-center text-sky-400 mb-6">Crear Cuenta</h2>

      {successMsg && (
        <div className="bg-emerald-900/40 border border-emerald-500 text-emerald-300 p-3 rounded mb-4 text-sm text-center">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <InputGroup
          label="Nombre Completo"
          name="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          error={errors.nombre}
          placeholder="Juan Pérez"
        />

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
          placeholder="Mínimo 6 caracteres"
        />

        <InputGroup
          label="Confirmar Contraseña"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          placeholder="Repite la contraseña"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 font-semibold rounded text-white transition-colors"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        ¿Ya tienes cuenta?{' '}
        <button onClick={switchToLogin} className="text-sky-400 hover:underline">
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
}
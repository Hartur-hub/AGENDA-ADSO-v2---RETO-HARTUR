import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 p-4 mb-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-sky-400">Agenda ADSO v5</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">
            👤 {user.nombre} ({user.rol === 'admin' ? 'Administrador' : 'Usuario'})
          </span>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", correo: "", etiqueta: "", empresa: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "", empresa: "" });
  };

  return (
    <form onSubmit={onSubmit} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 max-w-xl mx-auto space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Nombre *</label>
          <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Ej: Cristian Acevedo" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-500 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Teléfono *</label>
          <input name="telefono" value={form.telefono} onChange={onChange} placeholder="Ej: 300 123 4567" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-500 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1">Correo *</label>
        <input name="correo" value={form.correo} onChange={onChange} placeholder="ejemplo@sena.edu.co" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-500 text-sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Etiqueta</label>
          <input name="etiqueta" value={form.etiqueta} onChange={onChange} placeholder="Ej: Instructor, Aprendiz" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-500 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Empresa</label>
          <input name="empresa" value={form.empresa} onChange={onChange} placeholder="Ej: SENA" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-500 text-sm" />
        </div>
      </div>

      <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium p-3 rounded-lg transition duration-200 shadow-md">
        Agregar contacto
      </button>
    </form>
  );
}
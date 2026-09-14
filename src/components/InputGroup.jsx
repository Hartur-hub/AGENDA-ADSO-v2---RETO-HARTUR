import React from 'react';

export default function InputGroup({ label, type = 'text', name, value, onChange, error, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2.5 rounded bg-slate-900 border text-slate-100 focus:outline-none transition-colors ${
          error ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-sky-500'
        }`}
      />
      {error && <p className="text-rose-400 text-xs mt-1 font-medium">⚠️ {error}</p>}
    </div>
  );
}
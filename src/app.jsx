<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';

const API_CONTACTOS = 'http://localhost:3001/contactos';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('session_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [view, setView] = useState('login'); // 'login' | 'register'
  
  // Estados de la Agenda
  const [contactos, setContactos] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', apellido: '', telefono: '', email: '', categoria: 'Mantenimiento' });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleMessage, setRoleMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchContactos();
    }
  }, [currentUser]);

  const fetchContactos = async () => {
    try {
      const res = await fetch(API_CONTACTOS);
      const data = await res.json();
      setContactos(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('session_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('session_user');
  };

  // Manejo de Roles para Acciones Sensibles
  const handleDelete = async (id) => {
    if (currentUser.rol !== 'admin') {
      setRoleMessage('⚠️ Acción denegada: Solo administradores pueden eliminar contactos.');
      setTimeout(() => setRoleMessage(''), 4000);
      return;
    }

    try {
      await fetch(`${API_CONTACTOS}/${id}`, { method: 'DELETE' });
      fetchContactos();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.telefono.trim()) return;

    if (editId) {
      await fetch(`${API_CONTACTOS}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setEditId(null);
    } else {
      await fetch(API_CONTACTOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }

    setFormData({ nombre: '', apellido: '', telefono: '', email: '', categoria: 'Mantenimiento' });
    fetchContactos();
  };

  // Búsqueda insensible a mayúsculas/minúsculas y multicampo
  const filteredContactos = contactos.filter((c) =>
    `${c.nombre} ${c.apellido} ${c.email} ${c.categoria}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 py-12 px-4">
        {view === 'login' ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} switchToRegister={() => setView('register')} />
        ) : (
          <RegisterForm switchToLogin={() => setView('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-12">
      <Navbar user={currentUser} onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto px-4">
        {roleMessage && (
          <div className="bg-amber-900/50 border border-amber-500 text-amber-200 p-3 rounded mb-6 text-center text-sm font-medium">
            {roleMessage}
          </div>
        )}

        {/* Formulario Contacto */}
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-8">
          <h2 className="text-xl font-bold mb-4">{editId ? '✏️ Editar Contacto' : '➕ Agregar Contacto'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="p-2.5 rounded bg-slate-900 border border-slate-700 text-white"
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              className="p-2.5 rounded bg-slate-900 border border-slate-700 text-white"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="p-2.5 rounded bg-slate-900 border border-slate-700 text-white"
              required
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-2.5 rounded bg-slate-900 border border-slate-700 text-white"
            />
          </div>
          <button type="submit" className="mt-4 px-5 py-2.5 bg-sky-600 rounded font-medium text-white hover:bg-sky-500">
            {editId ? 'Guardar Cambios' : 'Agregar'}
          </button>
        </form>

        {/* Búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, correo o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Listado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredContactos.length > 0 ? (
            filteredContactos.map((contacto) => (
              <div key={contacto.id} className="bg-slate-800 p-5 rounded border border-slate-700 flex justify-between">
                <div>
                  <h3 className="font-bold text-sky-400">{contacto.nombre} {contacto.apellido}</h3>
                  <p className="text-sm text-slate-300">📞 {contacto.telefono}</p>
                  <p className="text-sm text-slate-400">✉️ {contacto.email}</p>
                </div>
                <div className="flex gap-2 items-start">
                  <button
                    onClick={() => { setEditId(contacto.id); setFormData(contacto); }}
                    className="px-2.5 py-1 text-xs bg-amber-600 hover:bg-amber-500 text-white rounded"
                  >
                    Editar
                  </button>
                  {currentUser.rol === 'admin' && (
                    <button
                      onClick={() => handleDelete(contacto.id)}
                      className="px-2.5 py-1 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-slate-400 py-8 bg-slate-800/50 rounded border border-slate-800">
              No se encontraron contactos que coincidan con la búsqueda.
            </div>
          )}
        </div>
      </main>
=======
import { useState } from "react";

function ContactoCard({ nombre, telefono, correo, etiqueta }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-sm">
      <div className="font-bold text-white text-base">{nombre}</div>
      {etiqueta && (
        <span className="inline-block bg-purple-900/60 text-purple-300 text-xs px-2.5 py-0.5 rounded-full mt-1 border border-purple-700/50">
          {etiqueta}
        </span>
      )}
      <div className="mt-3 text-sm text-slate-300 space-y-1">
        <p>📞 {telefono}</p>
        <p>✉️ {correo}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [contactos] = useState([
    { id: 1, nombre: "Ana Torres", telefono: "300 123 4567", correo: "ana.torres@sena.edu.co", etiqueta: "Compañera" },
    { id: 2, nombre: "Cristian Acevedo", telefono: "300 765 4321", correo: "cristian@sena.edu.co", etiqueta: "Instructor" },
    { id: 3, nombre: "Gustavo Bolaños", telefono: "321 753 2037", correo: "gustavo@sena.edu.co", etiqueta: "Instructor" },
    { id: 4, nombre: "Beatriz Salazar", telefono: "310 222 4455", correo: "beatriz@sena.edu.co", etiqueta: "Compañera" },
    { id: 5, nombre: "Manuela Ríos", telefono: "313 908 1122", correo: "manuela@sena.edu.co", etiqueta: "Cliente" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  // 1. Filtrado por nombre, correo, etiqueta o teléfono
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    const nombre = (c.nombre || "").toLowerCase();
    const correo = (c.correo || "").toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = (c.telefono || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // 2. Ordenamiento alfabético sobre la lista filtrada
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-amber-500">Agenda ADSO v8</h1>
          <p className="text-xs text-slate-400 mt-1">
            Clase 10 · Búsqueda y Ordenamiento en tiempo real
          </p>
        </header>

        {/* Controles de Búsqueda y Orden */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            placeholder="Buscar por nombre, correo, teléfono..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setOrdenAsc((prev) => !prev)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm px-4 py-2.5 rounded-xl border border-slate-700 font-medium whitespace-nowrap transition-colors"
          >
            {ordenAsc ? "Ordenar A-Z" : "Ordenar Z-A"}
          </button>
        </div>

        {/* Contador de Resultados */}
        <p className="text-xs text-slate-500 mb-3">
          {contactosOrdenados.length} contacto
          {contactosOrdenados.length !== 1 ? "s" : ""} encontrado
          {contactosOrdenados.length !== 1 ? "s" : ""}
        </p>

        {/* Lista de Contactos */}
        <section className="space-y-3">
          {contactosOrdenados.length === 0 ? (
            <div className="text-center py-8 bg-slate-900/50 rounded-xl border border-slate-800">
              <p className="text-sm text-slate-400">
                No se encontraron contactos que coincidan con la búsqueda.
              </p>
            </div>
          ) : (
            contactosOrdenados.map((c) => <ContactoCard key={c.id} {...c} />)
          )}
        </section>
      </div>
>>>>>>> d5957a9b85e6235f023009e7b1e31fd1a282884a
    </div>
  );
}
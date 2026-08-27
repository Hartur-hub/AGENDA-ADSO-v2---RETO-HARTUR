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
    </div>
  );
}
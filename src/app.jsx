import { useState, useEffect } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId } from "./api.js";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarContactos() {
      try {
        const data = await listarContactos();
        setContactos(data);
      } catch (e) {
        setError("No se pudo cargar la lista de contactos");
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  const agregarContacto = async (nuevo) => {
    try {
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (e) {
      setError("No se pudo agregar el contacto");
    }
  };

  const eliminarContacto = async (id) => {
    try {
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      setError("No se pudo eliminar el contacto");
    }
  };

  if (cargando) return <p className="p-8 text-center text-slate-400">Cargando contactos...</p>;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8 text-white">
      <h1 className="text-4xl font-extrabold text-center tracking-tight text-white">
        Agenda ADSO v5
      </h1>
      
      {error && <p className="text-red-400 bg-red-950/50 border border-red-800 text-center p-3 rounded-lg">{error}</p>}
      
      <FormularioContacto onAgregar={agregarContacto} />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {contactos.map((contacto) => (
          <ContactoCard
            key={contacto.id}
            {...contacto}
            onEliminar={() => eliminarContacto(contacto.id)}
          />
        ))}
      </section>
    </main>
  );
}
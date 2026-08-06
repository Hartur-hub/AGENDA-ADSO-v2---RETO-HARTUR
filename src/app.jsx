import { useState, useEffect } from 'react'
import ContactoCard from './components/ContactoCard.jsx'
import FormularioContacto from './components/FormularioContacto.jsx'
import './App.css'

function App() {
  // Carga inicial desde localStorage con fallback a datos por defecto si está vacío
  const [contactos, setContactos] = useState(() => {
    const contactosGuardados = localStorage.getItem('contactos')
    if (contactosGuardados) {
      return JSON.parse(contactosGuardados)
    }
    return [
      { id: 1, nombre: 'Cristian', telefono: '3217945491', correo: 'cristian@sena.edu.co', etiqueta: 'Instructor' },
      { id: 2, nombre: 'Jeronimo', telefono: '3044670422', correo: 'jeronimo@sena.edu.co', etiqueta: 'Aprendiz' },
      { id: 3, nombre: 'Andres', telefono: '3054149618', correo: 'andres@sena.edu.co', etiqueta: 'Aprendiz' },
    ]
  })

  // Estado para el input de búsqueda (Reto B)
  const [busqueda, setBusqueda] = useState('')

  // Persistencia automática: Guarda en localStorage cada vez que cambia 'contactos'
  useEffect(() => {
    localStorage.setItem('contactos', JSON.stringify(contactos))
  }, [contactos])

  // Agrega un nuevo contacto al estado
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }])
  }

  // Elimina un contacto por su id
  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id))
  }

  // Filtrado en vivo sin mutar el arreglo original (Reto B)
  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v3</h1>

      <FormularioContacto onAgregar={agregarContacto} />

      {/* Input de Búsqueda Controlado (Reto B) */}
      <div className="busqueda-container">
        <input
          type="text"
          placeholder="Buscar contacto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
      </div>

      <div className="lista-contactos">
        {contactos.length === 0 ? (
          <p className="mensaje-vacio">Todavía no hay contactos. Agrega el primero arriba.</p>
        ) : contactosFiltrados.length === 0 ? (
          <p className="mensaje-vacio">No se encontraron contactos.</p>
        ) : (
          contactosFiltrados.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={eliminarContacto}
            />
          ))
        )}
      </div>
    </main>
  )
}

export default App
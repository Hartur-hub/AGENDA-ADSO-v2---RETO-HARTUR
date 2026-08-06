import { useState } from 'react'

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    etiqueta: '',
  })

  // Manejo de cambios dinámico para todos los inputs usando 'name'
  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Validación mínima obligatoria
    if (!form.nombre.trim() || !form.telefono.trim()) return

    onAgregar(form)

    // Limpiar formulario
    setForm({ nombre: '', telefono: '', correo: '', etiqueta: '' })
  }

  return (
    <form className="form-contacto" onSubmit={onSubmit}>
      <div className="campo">
        <label>Nombre *</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Cristian Acevedo"
          value={form.nombre}
          onChange={onChange}
        />
      </div>

      <div className="campo">
        <label>Teléfono *</label>
        <input
          type="text"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
        />
      </div>

      <div className="campo campo-full">
        <label>Correo</label>
        <input
          type="email"
          name="correo"
          placeholder="ejemplo@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
      </div>

      <div className="campo campo-full">
        <label>Etiqueta (opcional)</label>
        <input
          type="text"
          name="etiqueta"
          placeholder="Ej: Instructor, Aprendiz, Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <button type="submit" className="btn-agregar campo-full">
        Agregar contacto
      </button>
    </form>
  )
}
export default function ContactoCard({ id, nombre, telefono, correo, etiqueta, onEliminar }) {
  return (
    <article className="tarjeta-contacto">
      <h3>{nombre}</h3>
      <p className="contacto-linea">📞 {telefono}</p>
      {correo && <p className="contacto-linea">✉️ {correo}</p>}
      {etiqueta && <span className="etq">{etiqueta}</span>}

      <button className="btn-eliminar" onClick={() => onEliminar(id)}>
        Eliminar
      </button>
    </article>
  )
}
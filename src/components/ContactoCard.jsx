export default function ContactoCard({ nombre, telefono, correo, etiqueta, empresa, onEliminar }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-slate-600 transition duration-200">
      <div className="space-y-2">
        <h3 className="font-bold text-xl text-white">{nombre}</h3>
        <p className="text-sm text-slate-300 flex items-center gap-2">📞 {telefono}</p>
        <p className="text-sm text-slate-300 flex items-center gap-2 break-all">✉️ {correo}</p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {etiqueta && (
            <span className="text-xs bg-purple-900/60 text-purple-300 border border-purple-700 px-2.5 py-1 rounded-full font-medium">
              {etiqueta}
            </span>
          )}
          {empresa && (
            <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full font-medium">
              🏢 {empresa}
            </span>
          )}
        </div>
      </div>

      <button onClick={onEliminar} className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/40 font-medium py-2 rounded-lg text-sm transition duration-200">
        Eliminar
      </button>
    </div>
  );
}
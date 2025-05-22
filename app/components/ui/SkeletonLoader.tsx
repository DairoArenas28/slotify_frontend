
export default function SkeletonLoader() {
  return (
    <div className="p-4 space-y-2 animate-pulse">
      {/* Encabezado de días */}
      <div className="grid grid-cols-8 gap-2 mb-2">
        <div></div> {/* Columna vacía para las horas */}
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day, i) => (
          <div key={i} className="h-4 bg-gray-300 rounded w-full" />
        ))}
      </div>

      {/* Filas de horas (ej. 6am - 21pm) */}
      {[...Array(16)].map((_, row) => (
        <div key={row} className="grid grid-cols-8 gap-2 items-center">
          {/* Hora lateral */}
          <div className="w-12 text-sm text-gray-400">{6 + row}:00</div>
          {/* Celdas de cada día */}
          {[...Array(7)].map((_, col) => (
            <div
              key={col}
              className="h-10 bg-gray-200 rounded-md"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
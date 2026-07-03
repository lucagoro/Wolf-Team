import { useEffect, useState } from "react";
import { getStudentSummary } from "../api/students";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentSummary().then(setSummary);
  }, []);

  if (!summary) {
    return <p className="text-white">Cargando resumen...</p>;
  }

  return (
    <div className="p-5 bg-gradient-to-b from-[#0f0f14] to-[#15151f] min-h-[50vh] text-[#e5e7eb]">
      <h2 className="text-2xl mb-5 text-[#f8fafc]">Wolf's Team - Resumen</h2>

      <div className="grid grid-cols-2 gap-4">
        <div 
          className="rounded-xl p-4 shadow-lg flex flex-col justify-between cursor-pointer bg-gradient-to-br from-[#334155] to-[#1e293b]"
          onClick={() => navigate("/students")}
        >
          <span className="text-sm opacity-85 font-semibold">Total alumnos</span>
          <span className="text-3xl font-bold mt-2">{summary.total}</span>
        </div>

        <div 
          className="rounded-xl p-4 shadow-lg flex flex-col justify-between cursor-pointer bg-gradient-to-br from-[#14532d] to-[#166534]"
          onClick={() => navigate("/students?status=AL_DIA")}
        >
          <span className="text-sm opacity-85 font-semibold">Al día</span>
          <span className="text-3xl font-bold mt-2">{summary.alDia}</span>
        </div>

        <div 
          className="rounded-xl p-4 shadow-lg flex flex-col justify-between cursor-pointer bg-gradient-to-br from-[#7f1d1d] to-[#991b1b]"
          onClick={() => navigate("/students?status=VENCIDO")}
        >
          <span className="text-sm opacity-85 font-semibold">Vencidos</span>
          <span className="text-3xl font-bold mt-2">{summary.vencidos}</span>
        </div>

        <div 
          className="rounded-xl p-4 shadow-lg flex flex-col justify-between cursor-pointer bg-gradient-to-br from-[#78350f] to-[#92400e]"
          onClick={() => navigate("/students?status=SIN_PAGOS")}
        >
          <span className="text-sm opacity-85 font-semibold">Sin pagos</span>
          <span className="text-3xl font-bold mt-2">{summary.sinPagos}</span>
        </div>
      </div>
      
      <div className="mt-5 text-xl font-bold flex flex-col justify-center items-center border border-[#2a2a3d] rounded-lg p-2 shadow-lg">
          <span>Total mes</span>
          <span>${Number(summary.totalMes).toLocaleString("es-AR")}</span>
      </div>
    </div>
  );
}

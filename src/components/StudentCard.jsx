import { useNavigate } from "react-router-dom";
import { getWhatsappLink } from "../utils/whatsapp";

export default function StudentCard({ student }) {
    const navigate = useNavigate();

    function isExpired(status) {
        return status === "VENCIDO";
    }

    const statusClasses = {
        "AL_DIA": "bg-green-500/20 text-green-400 border border-green-500/30 w-20",
        "VENCIDO": "bg-red-500/20 text-red-400 border border-red-500/30 w-20",
        "SIN_PAGOS": "bg-gray-500/20 text-gray-400 border border-gray-500/30 w-20"
    };

  return (
    <li className="bg-[#1b1b28] rounded-2xl p-3.5 m-4 flex justify-between items-center shadow-[0_0_0_1px_rgba(44,15,159,0.04)]">
      <div className="flex flex-col">
        <span className="text-base font-bold">
          {student.surname} {student.name}
        </span>
        <span className={`font-semibold rounded-lg py-0.5 text-[13px] mt-1 ${statusClasses[student.status] || "text-gray-400"}`}>
          {student.status.replace("_", " ")}
        </span>
      </div>

<div className="flex gap-2.5 items-center">
        <button 
            className="min-w-[60px] bg-gradient-to-r from-[#5b5fff] to-[#7a5cff] text-white border-none rounded-lg py-2 px-4 text-sm font-semibold cursor-pointer"
            onClick={() => navigate(`/students/${student.id}`)}
        >
            Ver
        </button>
        {isExpired(student.status) && (
        <a
          href={getWhatsappLink(student.phone, student.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.25)] hover:bg-[#1ebe5d]"
        >
          <img src="/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
        </a>
      )}
      </div>
    </li>
  );
}

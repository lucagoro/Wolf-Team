import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-[100] flex justify-center gap-3 bg-gradient-to-b from-[#0f0f14] to-[#15151f] py-2.5 border-b border-[#2a2a3d]">
            <button 
                className="bg-[#21213b] text-[#eaeaf0] font-bold rounded-xl px-4 py-2.5 border-none text-sm cursor-pointer transition-all duration-200 hover:bg-[#2c2c4d]"
                onClick={() => navigate("")}
            >
                Resumen
            </button>
            <button 
                className="bg-[#21213b] text-[#eaeaf0] font-bold rounded-xl px-4 py-2.5 border-none text-sm cursor-pointer transition-all duration-200 hover:bg-[#2c2c4d]"
                onClick={() => navigate("/students")}
            >
                Alumnos
            </button>
        </header>
    );
}
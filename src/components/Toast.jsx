export default function Toast({ message, type = "success", onClose }) {
    return(
        <div className={`fixed bottom-[90px] left-1/2 -translate-x-1/2 p-3 rounded-lg text-white flex gap-2.5 items-center z-[999] font-bold ${type === "success" ? "bg-[#2e7d32]" : "bg-[#b71c1c]"}`}>
            <span>{message}</span>
            <button onClick={onClose} className="bg-none border-none text-white text-base cursor-pointer">✕</button>
        </div>
    );
}
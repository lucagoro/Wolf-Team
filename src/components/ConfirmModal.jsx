export default function ConfirmModal({ title, message, onCancel, onConfirm, hasPayments }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-[999]">
            <div className="bg-[#1b1b28] text-white p-5 rounded-xl w-[90%] max-w-[350px] text-center">
                <h3 className="mb-2.5">{title}</h3>
                <p className="text-sm opacity-90">{message}</p>

                {hasPayments && (
                    <p className="text-red-500 font-bold text-base mt-2.5">
                        No se puede eliminar un alumno con pagos registrados.
                    </p>
                )}
                <div className="flex justify-between mt-5">
                    <button 
                        className="bg-[#2c2c3a] text-white border-none py-2.5 rounded-lg w-[45%] cursor-pointer hover:bg-[#444454]"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="bg-[#7a1f1f] text-white border-none py-2.5 rounded-lg w-[45%] cursor-pointer hover:bg-[#a62828] disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={hasPayments} 
                        onClick={onConfirm}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

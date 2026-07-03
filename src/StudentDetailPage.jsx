import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "./api/students";
import { getPaymentsByStudent } from "./api/payments";
import PaymentForm from "./components/PaymentForm";
import { createPaymentForStudent } from "./api/payments";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "./api/students";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";
import { useAuth } from "./context/AuthContext";

// Iconos SVG
const BackIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PaymentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function StudentDetailPage() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [payments, setPayments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();
    const hasPayments = payments.length > 0;
    const { user } = useAuth();
    const userRole = user?.role || 'GUEST';

    const statusClasses = {
        "AL_DIA": "bg-green-500/20 text-green-400 border border-green-500/30",
        "VENCIDO": "bg-red-500/20 text-red-400 border border-red-500/30",
        "SIN_PAGOS": "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    };

    //  Función de enmascarado
const formatPhone = (phone, role) => {
    if (!phone) return "No disponible";
    if (role === 'GUEST') {
        // Muestra los primeros 4 dígitos y oculta el resto
        return `${phone.substring(0, 4)}XXXX-XXXX`;
    }
    return phone;
};

    function handleCreatePayment(data) {
    createPaymentForStudent(id, data).then(() => {
        getStudentById(id).then(setStudent);
        getPaymentsByStudent(id).then(setPayments);
        setShowForm(false);
    });
}

    useEffect(() => {
        getStudentById(id).then(setStudent);
        getPaymentsByStudent(id).then(setPayments);
    }, [id])

    function handleDelete() {
        deleteStudent(id).then(() => {
            setToast("Alumno eliminado con éxito");
            setShowDelete(false);
            setTimeout(() => navigate("/"), 1000);
        })
        .catch(() => {
            setToast("Error al eliminar el alumno");
        });
    }


    if (!student) 
        return <div className="min-h-screen bg-gradient-to-b from-[#0f0f14] to-[#15151f] flex items-center justify-center">
            <p className="text-gray-400">Cargando...</p>
        </div>;
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0f14] to-[#15151f] text-white font-sans">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#12121a]/95 backdrop-blur-sm border-b border-[#2a2a3d]">
                <div className="flex items-center justify-between px-4 py-3">
                    <button 
                        className="flex items-center gap-2 bg-none border-none text-white cursor-pointer hover:text-gray-300 transition-colors"
                        onClick={() => navigate(-1)}
                    >
                        <BackIcon />
                        <span className="text-sm">Volver</span>
                    </button>

                    <div className="relative">
                        <button 
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1f1f2e] border-none text-white cursor-pointer hover:bg-[#2a2a3d] transition-colors"
                            onClick={() => setShowMenu(prev => !prev)}
                        >
                            <MenuIcon />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 top-12 w-40 bg-[#1f1f2e] rounded-xl shadow-xl border border-[#2a2a3d] overflow-hidden z-50">
                                {userRole === 'ADMIN' ? (
                                <>
                                    <button 
                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-white hover:bg-[#2a2a3d] border-none bg-none cursor-pointer transition-colors"
                                        onClick={() => {setShowMenu(false); navigate(`/students/${id}/edit`)}}
                                    >
                                        <EditIcon />
                                        Editar
                                    </button>
                                    <button 
                                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-[#2a2a3d] border-none bg-none cursor-pointer transition-colors"
                                        onClick={() => {setShowDelete(true); setShowMenu(false);}}
                                    >
                                        <DeleteIcon />
                                        Eliminar
                                    </button>
                                </>
                                ) : (
                                    <p className="px-4 py-3 text-xs text-gray-500 italic">Opciones deshabilitadas (GUEST)</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Perfil del alumno */}
            <div className="p-4">
                <div className="bg-gradient-to-br from-[#1f1f2e] to-[#252538] rounded-2xl p-5 shadow-lg border border-[#2a2a3d]">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5b5fff] to-[#7a5cff] flex items-center justify-center text-2xl font-bold text-white">
                            {student.name.charAt(0)}{student.surname.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-white m-0">{student.surname} {student.name}</h1>
                            <p className="text-gray-400 text-sm mt-1">
                                {formatPhone(student.phone, userRole)}
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-[#2a2a3d]">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${statusClasses[student.status] || "bg-gray-600/20 text-gray-400"}`}>
                            {student.status.replace("_", " ")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Historial de pagos */}
            <div className="px-4 pb-24">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white m-0">Historial de pagos</h2>
                    <span className="text-xs text-gray-500 bg-[#1f1f2e] px-2 py-1 rounded-full">
                        {payments.length} {payments.length === 1 ? 'pago' : 'pagos'}
                    </span>
                </div>

                {payments.length === 0 ? (
                    <div className="bg-[#1f1f2e]/50 rounded-xl p-6 text-center border border-[#2a2a3d]">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#2a2a3d] flex items-center justify-center">
                            <PaymentIcon />
                        </div>
                        <p className="text-gray-400 text-sm">No hay pagos registrados</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {payments.map((payment, index) => (
                            <div 
                                key={payment.id} 
                                className="bg-[#1f1f2e] rounded-xl p-4 border border-[#2a2a3d] hover:border-[#5b5fff]/30 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-lg font-bold text-white m-0">${payment.amount}</p>
                                        <p className="text-sm text-gray-400 mt-1">{payment.period}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <CalendarIcon />
                                        {payment.paymentDate}
                                    </div>
                                </div>
                                {payment.dueDate && (
                                    <div className="mt-2 pt-2 border-t border-[#2a2a3d] flex items-center justify-between text-xs">
                                        <span className="text-gray-500">Vence:</span>
                                        <span className={new Date(payment.dueDate) < new Date() ? "text-red-400" : "text-gray-400"}>
                                            {payment.dueDate}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Botón flotante para registrar pago */}
            {!showForm && (
                <button 
                    className="fixed bottom-24 right-4 flex items-center gap-2 bg-gradient-to-r from-[#5b5fff] to-[#7a5cff] text-white border-none rounded-full px-5 py-3 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all z-30"
                    onClick={() => setShowForm(true)}
                >
                    <PaymentIcon />
                    <span className="text-sm font-semibold">Registrar pago</span>
                </button>
            )}

            {showDelete && (
                <ConfirmModal
                    title="Eliminar alumno"
                    message="¿Estás seguro de que querés eliminar este alumno? Esta acción no se puede deshacer."
                    onCancel={() => setShowDelete(false)}
                    onConfirm={handleDelete}
                    hasPayments={hasPayments}
                />
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center sm:items-center justify-center p-4">
                    <div className="bg-[#1f1f2e] w-full max-w-md rounded-2xl sm:rounded-2xl p-5 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white m-0">Registrar pago</h3>
                            <button 
                                onClick={() => setShowForm(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2a2a3d] text-white border-none cursor-pointer hover:bg-[#3a3a4d] transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <PaymentForm
                            onSubmit={handleCreatePayment}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}

            {toast && (
                <Toast
                    message={toast}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
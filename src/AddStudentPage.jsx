import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StudentForm from "./components/StudentForm";
import { createStudent } from "./api/students";
import Toast from "./components/Toast";

export default function AddStudentPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  function handleSubmit(data) {
    createStudent(data).then(() => {
        setToast("Alumno registrado con éxito");
        setTimeout(() => navigate("/students"), 1000);
    })
    .catch(() => {
        setToast("Error al registrar el alumno");
    });
  }

  return (
    <div className="bg-gradient-to-b from-[#0f0f14] to-[#15151f] min-h-screen">
      <h2 className="text-[#f5f5fa] p-5 mb-0 text-2xl">Registrar alumno</h2>

      <StudentForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />

      {toast && (
        <Toast
            message={toast}
            onClose={() => setToast(null)}
        />
     )}

    </div>
  );
}

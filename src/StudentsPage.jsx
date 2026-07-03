import { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import SearchBar from "./components/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getStudentsPaginated } from "./api/students";

export default function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getStudentsPaginated(page, status).then(data => {
            setStudents(data.content);
            setTotalPages(data.totalPages);
            setLoading(false);
        });
    }, [status, page]);

    const filteredStudents = students.filter(student =>
    `${student.name} ${student.surname}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return (
        <div>
            <SearchBar value={search} onChange={setSearch} />
            <h2 className="text-[#f5f5fa] m-2 text-2xl">Alumnos</h2>
            {loading ? (
                <p className="text-white">Cargando...</p>
            ) : (
                <>
                    <StudentList students={filteredStudents} />
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 m-4">
                            <button 
                                disabled={page === 0}
                                onClick={() => setPage(p => p - 1)}
                                className="px-4 py-2 bg-[#6c6cff] text-white rounded disabled:opacity-50"
                            >
                                Anterior
                            </button>
                            <span className="text-white py-2">{page + 1} / {totalPages}</span>
                            <button 
                                disabled={page >= totalPages - 1}
                                onClick={() => setPage(p => p + 1)}
                                className="px-4 py-2 bg-[#6c6cff] text-white rounded disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}
            <button 
                className="fixed bottom-[90px] right-5 w-14 h-14 rounded-full bg-[#6c6cff] text-white text-3xl border-none shadow-[0_4px_10px_rgba(0,0,0,0.3)] cursor-pointer"
                onClick={() => navigate("/students/add")}
            >
                +
            </button>
        </div>
    );
}
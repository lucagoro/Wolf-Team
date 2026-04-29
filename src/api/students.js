import { BASE_URL } from "./config";
import { getAuthHeaders } from "./authHeader";

export async function getStudents(status) {
  const url = status ? `${BASE_URL}/students?status=${status}` : `${BASE_URL}/students`;

  const res = await fetch(url, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function getStudentsPaginated(page, status, size = 20) {
  let url = `${BASE_URL}/students/paginated?page=${page}&size=${size}`;
  if (status) {
    url += `&status=${status}`;
  }

  const res = await fetch(url, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function getStudentById(id) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Error al obtener alumno");
  return res.json();
}

export async function getStudentSummary() {
  const res = await fetch(`${BASE_URL}/students/summary`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Error al obtener resumen");
  return res.json();
}

export async function createStudent(student) {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(student)
  });

  if (!res.ok) throw new Error("Error al crear alumno");
  return res.json();
}

export async function updateStudent(id, student) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(student)
  });
  if (!res.ok) throw new Error("Error al actualizar alumno");
  return res.json();
}

export async function deleteStudent(id) {
  await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Error al eliminar alumno");
  return res.json();
}

/**
 * Intenta loguear al usuario y guarda el resultado en localStorage
 */
export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");

  const data = await res.json(); // { token, username, role }

  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
}

/**
 * Registra un nuevo usuario
 */
export async function register(username, password, role) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  });

  if (!res.ok) {
    const errorMsg = await res.text();
    throw new Error(errorMsg || "Error en el registro");
  }

  return res.text();
}

/**
 * Limpia la sesión del usuario
 */
export function logout() {
  localStorage.removeItem("user");
}

/**
 * Recupera los datos del usuario logueado (si existen)
 */
export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
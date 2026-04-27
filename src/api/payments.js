import { BASE_URL } from "./config";
import { getAuthHeaders } from "./authHeader";

export async function createPaymentForStudent(studentId, payment) {
  const res = await fetch(`${BASE_URL}/students/${studentId}/payments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payment)
  });

  if (!res.ok) throw new Error("Error al registrar pago");
  return res.json();
}

export async function getPaymentsByStudent(studentId) {
  const res = await fetch(`${BASE_URL}/students/${studentId}/payments`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Error al obtener pagos");
  return res.json();
}
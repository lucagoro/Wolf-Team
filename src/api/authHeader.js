export function getAuthHeaders() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    };
  } else {
    return {
      "Content-Type": "application/json"
    };
  }
}
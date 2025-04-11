export const baseUrl = "http://localhost:5000";

// Save the token to localStorage
export function saveAuthToken(token: string): void {
  localStorage.setItem("authToken", token);
}

// Retrieve the token from localStorage, or return null if not found
export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

// Check if the user is logged in (by checking that a token exists)
export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

// Return the Authorization header value with the Bearer token
export function getAuthHeader(): string {
  const token = getAuthToken();
  return token ? `Bearer ${token}` : "";
}

// Logout function: Remove the token from localStorage
export function logout(): void {
  localStorage.removeItem("authToken");
}

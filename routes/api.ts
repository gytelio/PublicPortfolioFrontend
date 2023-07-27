export default function main() {
  return {
    async login(email: string, password: string): Promise<Response> {
      const loginInfo = { email, password };
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      };
      return fetch("http://localhost:8000/login", requestOptions);
    },
    async register(email: string, password: string): Promise<Response> {
      const registerInfo = { email, password };
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(registerInfo),
      };
      return fetch("http://localhost:8000/register", requestOptions);
    },
    async logout(): Promise<Response> {
      const logoutOptions: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      return fetch("http://localhost:8000/logout", logoutOptions);
    },
  };
}

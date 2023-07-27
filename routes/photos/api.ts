export default function photo() {
  return {
    async post(data: FormData): Promise<Response> {
      return await fetch("http://localhost:8000/photo", {
        method: "POST",
        body: data,
        credentials: "include",
      });
    },
    async patch(data: FormData, public_id: string): Promise<Response> {
      return await fetch(`http://localhost:8000/photo/update/${public_id}`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
    },
    async delete(public_id: string): Promise<Response> {
      return await fetch(`http://localhost:8000/photo/${public_id}`, {
        method: "DELETE",
        credentials: "include",
      });
    },
    async get(): Promise<Response> {
      return await fetch("http://localhost:8000/photos", {
        method: "GET",
        credentials: "include",
      });
    },
  };
}

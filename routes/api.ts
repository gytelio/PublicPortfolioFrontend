export default function main() {
  return {
    async get(): Promise<Response> {
      return await fetch("http://localhost:8000/posts", { method: "GET" });
    },
    async post(aa: string): Promise<Response> {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return await fetch("http://localhost:8000/posts", { method: "POST", body: aa });
    },
  };
}

import { create } from "apisauce";
export const URL = `http://45.63.104.40:5000/`;

const api = create({
  baseURL: `${URL}`,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

export default api;

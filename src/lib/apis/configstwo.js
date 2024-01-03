import { create } from "apisauce";

export const URL2 = `https://uat-api.augmontgold.com/api/`



const api2 = create({
    baseURL: `${URL2}`,

    headers: { Accept: "application/json", 'Content-Type': 'application/json' }
});

export default api2;

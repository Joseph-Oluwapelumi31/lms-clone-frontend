import { api } from "../lib/api";

export const authAPI = {
    register: (data : {name: string; email: string, password: string})=>
        api.post('/auth/register', data),
    
    login: (data: { email: string; password: string }) =>
        api.post("/auth/login", data),

    me: () => api.get("/auth/me"),

    logout: () => api.post("/auth/logout"),


}
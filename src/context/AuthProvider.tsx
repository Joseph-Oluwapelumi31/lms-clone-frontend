import { useState, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { authAPI } from "../services/auth";
import type { User } from '../types/user'
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    authAPI
        .me()
        .then((res) => setUser(res.data.user))
        .catch(()=> setUser(null))
        .finally(()=> setLoading(false))
  },[])

  const login = async (email: string, password: string) =>{
    const res = await authAPI.login({email, password})
    setUser(res.data.user);
  }

  const logout = async () =>{
    await authAPI.logout();
    setUser(null)
    
  }

  const register = async (name: string ,email: string, password : string,) =>{
    const res = await authAPI.register({name, email, password}) 
    setUser(res.data.user)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout ,loading, setLoading}}>
      {children}
    </AuthContext.Provider>
  );
}
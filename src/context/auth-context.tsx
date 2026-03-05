import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type{ User } from "../types/user";

export type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  register: (email: string, password: string, role: string)=> Promise<void>;
  login: (email: string, password: string,) => Promise<void>;
  logout: ()=> Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
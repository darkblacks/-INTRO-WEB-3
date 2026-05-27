import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
  usuario: UsuarioLogin;
  setUsuario: React.Dispatch<React.SetStateAction<UsuarioLogin>>;
  handleLogin: (usuarioLogin: UsuarioLogin) => Promise<void>;
  handleLogout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const usuarioInicial: UsuarioLogin = {
  id: 0,
  nome: "",
  usuario: "",
  senha: "",
  foto: "",
  token: "",
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
      return JSON.parse(usuarioSalvo);
    }

    return usuarioInicial;
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login("/usuarios/logar", usuarioLogin, (resposta: UsuarioLogin) => {
        setUsuario(resposta);
        localStorage.setItem("usuario", JSON.stringify(resposta));
      });

      toast.success("Login realizado com sucesso!");
      navigate("/blog/feed");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Usuário ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario(usuarioInicial);
    localStorage.removeItem("usuario");
    toast.info("Você saiu da conta.");
    navigate("/blog/login");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        handleLogin,
        handleLogout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

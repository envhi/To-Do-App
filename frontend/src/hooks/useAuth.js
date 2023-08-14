// Este arquivo contém o custom hook useAuth, que fornece funcionalidades relacionadas à autenticação do usuário.

// Ele inclui a lógica para verificar o token de autenticação armazenado no localStorage, enviar automaticamente
//o token em todas as requisições à API e outras funções relacionadas à autenticação, como register e authUser.

// esse CUSTOM HOOK vai fazer chamadas na API

// definir acesso a API no api.js na pasta utils
import api from "../utils/api";

// aqui useState é usado para gerenciar o estado authenticated,
//enquanto useEffect é usado para executar efeitos colaterais, como configurar o cabeçalho de autorização na instância api,
//quando o componente que usa esse hook é montado.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(null);

  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  // A lógica dentro do useEffect verifica a existência do token no localStorage e,
  // se existir, configura o cabeçalho de autorização para todas as requisições na API.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
    } else {
      api.defaults.headers.Authorization = undefined;
    }
  }, [authenticated]);

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/users/add", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      console.log(error.message);
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/user/mytodos");

    setAuthenticated(true);
  }

  async function login(user) {
    let msgText = "Logged In";
    let msgType = "success";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  function logout() {
    let msgText = "Logged out!";
    let msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");

    setFlashMessage(msgText, msgType);
  }

  // O custom hook useAuth é definido ccomo uma função que retorna algumas funcionalidades de autenticação,
  // como authenticated (estado de autenticação do usuário) e register (função para registrar um novo usuário).
  return { authenticated, register, login, logout };
}

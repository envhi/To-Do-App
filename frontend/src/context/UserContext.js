import { createContext } from "react";

// Essa importação permite o uso das funcionalidades de autenticação fornecidas pelo useAuth(authenticated, register, etc..)
import useAuth from "../hooks/useAuth";

// criando variavel contexto
const Context = createContext();

// Aqui, é definido um componente chamado UserProvider, que é um wrapper em torno dos componentes filhos ({children}).
// O objetivo desse wrapper é fornecer o contexto de autenticação para todos os componentes dentro de sua árvore de componentes filhos.
function UserProvider({ children }) {
  //const { authenticated, register } = useAuth(): O hook useAuth é invocado dentro do componente UserProvider,
  // e suas funcionalidades são armazenadas nas constantes authenticated e register.
  const { authenticated, register, login, logout } = useAuth();

  // {children}: Os componentes filhos são renderizados dentro do UserProvider usando a propriedade children.
  // Isso garante que todos os componentes dentro deste contexto tenham acesso ao estado authenticated e
  // à função register através do contexto Context.
  return (
    <Context.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };

import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Footer from "./components/layout/Footer";
import Message from "./components/layout/Message";

// pages
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import Navibar from "./components/layout/Navibar";
import Container from "./components/layout/Container";
import Home from "./components/pages/Home";

// Context
import { UserProvider } from "./context/UserContext";
import MyToDos from "./components/pages/User/MyToDos";
import Profile from "./components/pages/User/Profile";

function App() {
  return (
    <div className="container">
      <Router>
        {/* envolvendo todos os componentes com o provider, para todos os componentes conseguirem acessar o contexto do usuário (se está logado ou não) */}
        <UserProvider>
          <Navibar />
          <Message />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/mytodos" element={<MyToDos />} />
              <Route path="/user/profile" element={<Profile />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;

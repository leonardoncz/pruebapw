import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Login from './components/usuario/Login';
import Registro from './components/usuario/Registro';
import RecuperarContraseña from './components/usuario/RecuperarContraseña';
import PanelUsuario from './components/usuario/PanelUsuario';
import DetalleOrden from './components/usuario/DetalleOrden';
import EditarPerfil from './components/usuario/EditarPerfil';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/panel" element={<PanelUsuario />} />
        <Route path="/orden/:id" element={<DetalleOrden />} />
        <Route path="/perfil/editar" element={<EditarPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;

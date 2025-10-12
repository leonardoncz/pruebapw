import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

// Componentes y Páginas
import Home from "./components/Home";
import Login from "./components/usuario/Login";
import Registro from "./components/usuario/Registro";
import PanelUsuario from "./components/usuario/PanelUsuario";
import EditarPerfil from "./components/usuario/EditarPerfil";
import RecuperarContraseña from "./components/usuario/RecuperarContraseña";
import Busqueda from "./components/usuario/Busqueda";
import CarritoPage from "./components/carrito/CarritoPage";
import CheckoutPage from "./components/carrito/CheckoutPage";
import ConfirmacionPage from "./components/carrito/ConfirmacionPage";
import DetalleOrden from "./components/usuario/DetalleOrden";
// ... etc.

import RutaProtegida from "./components/RutaProtegida";
import Header from "./components/layout/Header";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              {/* --- Rutas Públicas --- */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
              <Route path="/busqueda" element={<Busqueda />} />
              <Route path="/carrito" element={<CarritoPage />} />
              <Route path="/confirmacion" element={<ConfirmacionPage />} />


              {/* --- Rutas Privadas (requieren inicio de sesión) --- */}
              <Route 
                path="/perfil/editar" 
                element={
                  <RutaProtegida>
                    <EditarPerfil />
                  </RutaProtegida>
                } 
              />
               <Route 
                path="/panel" 
                element={
                  <RutaProtegida>
                    <PanelUsuario />
                  </RutaProtegida>
                } 
              />
              <Route 
                path="/orden/:id" 
                element={
                  <RutaProtegida>
                    <DetalleOrden />
                  </RutaProtegida>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <RutaProtegida>
                    <CheckoutPage />
                  </RutaProtegida>
                } 
              />
              
              {/* Aquí puedes añadir más rutas protegidas si es necesario */}

            </Routes>
          </main>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;


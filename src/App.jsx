import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";
import { MascotasProvider } from "./context/MascotasContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import { OrdenesProvider } from "./context/OrdenesContext";

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
import DetalleOrdenAdmin from "./components/admin/DetalleOrdenAdmin";
import DetalleUsuarioAdmin from "./components/admin/DetalleUsuarioAdmin";
import GestionOrdenes from "./components/admin/GestionOrdenes";
import GestionUsuarios from "./components/admin/GestionUsuarios";
import RutaProtegida from "./components/RutaProtegida";
import Header from "./components/layout/Header";
import GestionMascotas from "./components/admin/GestionMascotas";
import FormularioMascota from "./components/admin/FormularioMascotas";



function App() {
  return (
    <AuthProvider>
      <UsuariosProvider>
        <MascotasProvider>
          <OrdenesProvider>
            <CarritoProvider>
              <Router>
                <Header/>
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

                    {/* Rutas de Administrador */}
                    <Route path="/admin/usuarios" element={<GestionUsuarios />} />
                    <Route path="/admin/usuario/:id" element={<DetalleUsuarioAdmin />} />
                    <Route path="/admin/ordenes" element={<GestionOrdenes />} />
                    <Route path="/admin/orden/:id" element={<DetalleOrdenAdmin />} />

                    <Route path="/admin/mascotas" element={<GestionMascotas />} />
                    <Route path="/admin/mascotas/agregar" element={<FormularioMascota />} />
                    <Route path="/admin/mascotas/editar/:id" element={<FormularioMascota />} />

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
          </OrdenesProvider>
        </MascotasProvider>
      </UsuariosProvider>
    </AuthProvider>
  );
}

export default App;


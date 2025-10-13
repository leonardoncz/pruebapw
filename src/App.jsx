import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MascotasProvider from "./context/MascotasContext";
import { CarritoProvider } from "./context/CarritoContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import { OrdenesProvider } from "./context/OrdenesContext";

// Componentes y Páginas
import Header from "./components/layout/Header";
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
import RutaProtegida from "./components/RutaProtegida";

// Componentes de Admin
import Dashboard from "./components/admin/DashboardAdmin";
import GestionUsuarios from "./components/admin/GestionUsuarios";
import DetalleUsuarioAdmin from "./components/admin/DetalleUsuarioAdmin";
import GestionOrdenes from "./components/admin/GestionOrdenes";
import DetalleOrdenAdmin from "./components/admin/DetalleOrdenAdmin";
// CORRECCIÓN: Nombres unificados
import GestionProductos from "./components/admin/GestionProductos";
import FormularioProducto from "./components/admin/FormularioProducto";

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
                    <Route path="/busqueda" element={<Busqueda />} />
                    <Route path="/recuperar-contrasena" element={<RecuperarContraseña />} />
                    <Route path="/carrito" element={<CarritoPage />} />
                    <Route path="/confirmacion" element={<ConfirmacionPage />} />
                    {/* ... (otras rutas públicas) ... */}

                    {/* --- Rutas de Administrador (Unificadas) --- */}
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/usuarios" element={<GestionUsuarios />} />
                    <Route path="/admin/usuario/:id" element={<DetalleUsuarioAdmin />} />
                    <Route path="/admin/ordenes" element={<GestionOrdenes />} />
                    <Route path="/admin/orden/:id" element={<DetalleOrdenAdmin />} />
                    <Route path="/admin/productos" element={<GestionProductos />} />
                    <Route path="/admin/mascotas/agregar" element={<FormularioProducto />} />
                    <Route path="/admin/mascotas/editar/:id" element={<FormularioProducto />} />

                    {/* --- Rutas Privadas --- */}
                    <Route path="/perfil/editar" element={<RutaProtegida><EditarPerfil /></RutaProtegida>} />
                    <Route path="/panel" element={<RutaProtegida><PanelUsuario /></RutaProtegida>} />
                    <Route path="/orden/:id" element={<RutaProtegida><DetalleOrden /></RutaProtegida>} />
                    <Route path="/checkout" element={<RutaProtegida><CheckoutPage /></RutaProtegida>} />
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


// src/App.jsx

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
import DetalleProducto from "./components/DetalleProducto";

// Componentes de Admin
import DashboardAdmin from "./components/admin/DashboardAdmin";
import GestionUsuarios from "./components/admin/GestionUsuarios";
import DetalleUsuarioAdmin from "./components/admin/DetalleUsuarioAdmin";
import GestionOrdenes from "./components/admin/GestionOrdenes";
import DetalleOrdenAdmin from "./components/admin/DetalleOrdenAdmin";
import GestionProductos from "./components/admin/GestionProductos";
import FormularioProducto from "./components/admin/FormularioProducto";

// Componente para agrupar todos los providers y limpiar App.jsx
const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UsuariosProvider>
        <MascotasProvider>
          <OrdenesProvider>
            <CarritoProvider>
              {children}
            </CarritoProvider>
          </OrdenesProvider>
        </MascotasProvider>
      </UsuariosProvider>
    </AuthProvider>
  );
};

function App() {
  return (
    <AppProviders>
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
            <Route path="/producto/:id" element={<DetalleProducto />} />

            {/* --- Rutas de Administrador Protegidas --- */}
            <Route path="/admin" element={<RutaProtegida><DashboardAdmin /></RutaProtegida>} />
            <Route path="/admin/usuarios" element={<RutaProtegida><GestionUsuarios /></RutaProtegida>} />
            <Route path="/admin/usuario/:id" element={<RutaProtegida><DetalleUsuarioAdmin /></RutaProtegida>} />
            <Route path="/admin/ordenes" element={<RutaProtegida><GestionOrdenes /></RutaProtegida>} />
            <Route path="/admin/orden/:id" element={<RutaProtegida><DetalleOrdenAdmin /></RutaProtegida>} />
            <Route path="/admin/mascotas" element={<RutaProtegida><GestionProductos /></RutaProtegida>} />
            <Route path="/admin/mascotas/agregar" element={<RutaProtegida><FormularioProducto /></RutaProtegida>} />
            <Route path="/admin/mascotas/editar/:id" element={<RutaProtegida><FormularioProducto /></RutaProtegida>} />

            {/* --- Rutas Privadas de Usuario Protegidas --- */}
            <Route path="/perfil/editar" element={<RutaProtegida><EditarPerfil /></RutaProtegida>} />
            <Route path="/panel" element={<RutaProtegida><PanelUsuario /></RutaProtegida>} />
            <Route path="/orden/:id" element={<RutaProtegida><DetalleOrden /></RutaProtegida>} />
            <Route path="/checkout" element={<RutaProtegida><CheckoutPage /></RutaProtegida>} />
            <Route path="/confirmacion" element={<RutaProtegida><ConfirmacionPage /></RutaProtegida>} />
          </Routes>
        </main>
      </Router>
    </AppProviders>
  );
}

export default App;


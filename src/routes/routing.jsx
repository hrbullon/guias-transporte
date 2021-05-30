import Starter from '../views/starter/starter.jsx';

// Paginas
import { Users } from '../views/users/users.jsx';
import { Vehicles } from '../views/vehicles/vehicles.jsx';
import { Companies } from '../views/companies/companies.jsx';
import { Products } from '../views/products/products.jsx';
import { Documents } from '../views/documents/documents.jsx';
import { Form } from '../views/documents/form.jsx';

var ThemeRoutes = [
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    icon: 'mdi mdi-gauge', 
    component: Starter 
  },
  {
    path:"/settings",
    name:"Configuración",
    icon: "mdi mdi-settings",
    component: Starter
  },
  {
    path:"/users",
    name:"Usuarios",
    icon: "mr-2 mdi mdi-account-box-outline",
    component: Users
  },
  {
    path:"/documents/create",
    name:"Gestión de Guías",
    icon: "mr-2 mdi mdi-note-multiple-outline",
    component: Form
  },
  {
    path:"/customers",
    name:"Clientes",
    icon: "mr-2 mdi mdi-account-card-details",
    component: Companies
  },
  {
    path:"/companies",
    name:"Empresas",
    icon: "mr-2 mdi mdi-bank",
    component: Companies
  },
  {
    path:"/products",
    name:"Productos",
    icon: "mr-2 mdi mdi-format-list-bulleted",
    component: Products
  }, 
  {
    path:"/vehicles",
    name:"Vehiculos",
    icon: "mr-2 mdi mdi-truck-delivery",
    component: Vehicles
  },
  
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;

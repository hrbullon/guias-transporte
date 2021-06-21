import Starter from '../views/starter/starter.jsx';

// Paginas
import { Users } from '../views/users/users.jsx';
import { Vehicles } from '../views/vehicles/vehicles.jsx';
import { Companies } from '../views/companies/companies.jsx';
import { Products } from '../views/products/products.jsx';
import { Documents } from '../views/documents/documents.jsx';
import { Form } from '../views/documents/form.jsx';
import { Workdays } from '../views/workdays/workdays.jsx';
import { People } from '../views/people/people';
import { Categories } from '../views/categories/categories.jsx';
import { Forms } from '../views/products/forms/forms.jsx';
import { Outputs } from '../views/outputs/outputs.jsx';
import { Inputs } from '../views/inputs/inputs.jsx';

var ThemeRoutes = [
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    icon: 'mdi mdi-gauge',
    menu: true,
    role: ["Administrador_Role","Super_Role","Usuario_Role"],
    component: Starter 
  },
  {
    path:"/users",
    name:"Usuarios",
    icon: "mr-2 mdi mdi-account-circle",
    menu: true,
    role: ["Administrador_Role","Super_Role"],
    component: Users
  },
  {
    path:"/documents/create/",
    name:"Gestión de Guías",
    icon: "",
    menu: false,
    component: Form
  },
  {
    path:"/documents/update/:id",
    name:"Gestión de Guías",
    icon: "",
    menu: false,
    component: Form
  },
  {
    path:"/outputs",
    name:"Salidas",
    icon: "mr-2 mdi mdi-arrow-right",
    menu: true,
    role: ["Administrador_Role","Super_Role","Usuario_Role"],
    component: Outputs
  },
  {
    path:"/inputs",
    name:"Entradas",
    icon: "mr-2 mdi mdi-arrow-left",
    menu: true,
    role: ["Administrador_Role","Super_Role","Usuario_Role"],
    component: Inputs
  },
  {
    path:"/workdays",
    name:"Jornadas",
    icon: "mr-2 mdi mdi-calendar",
    menu: true,
    role: ["Administrador_Role","Super_Role"],
    component: Workdays
  },
  {
    path:"/customers",
    name:"Clientes",
    icon: "mr-2 mdi mdi-account-card-details",
    menu: true,
    role: ["Administrador_Role","Super_Role","Usuario_Role"],
    component: Companies
  },
  {
    path:"/companies",
    name:"Empresas",
    icon: "mr-2 mdi mdi-bank",
    menu: true,
    role: ["Administrador_Role","Super_Role"],
    component: Companies
  },
  {
    path:"/products",
    name:"Productos",
    icon: "mr-2 mdi mdi-format-list-bulleted",
    menu: true,
    role: ["Administrador_Role","Super_Role","Usuario_Role"],
    component: Products
  }, 
  {
    path:"/forms",
    name:"Presentación productos",
    icon: "mr-2 mdi mdi-bookmark",
    menu: true,
    role: ["Administrador_Role","Super_Role","Usuario_Role"],
    component: Forms
  }, 
  {
    path:"/vehicles",
    name:"Vehiculos",
    icon: "mr-2 mdi mdi-truck-delivery",
    menu: true,
    role: ["Administrador_Role","Super_Role","Usuario_Role"],
    component: Vehicles
  },
  {
    path:"/people",
    name:"Personas",
    icon: "mr-2 mdi mdi-account-multiple",
    menu: true,
    role: ["Administrador_Role","Super_Role","Usuario_Role"],
    component: People
  },
  {
    path:"/categories",
    name:"Categorías",
    icon: "mr-2 mdi mdi-tag-multiple",
    menu: true,
    role: ["Administrador_Role","Super_Role"],
    component: Categories
  },
  
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;

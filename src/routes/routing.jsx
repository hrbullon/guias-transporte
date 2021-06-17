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
    component: Starter 
  },
  
  {
    path:"/users",
    name:"Usuarios",
    icon: "mr-2 mdi mdi-account-circle",
    menu: true,
    component: Users
  },
  {
    path:"/users",
    name:"Usuarios",
    icon: "mr-2 mdi mdi-account-box-outline",
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
    component: Outputs
  },
  {
    path:"/inputs",
    name:"Entradas",
    icon: "mr-2 mdi mdi-arrow-left",
    menu: true,
    component: Inputs
  },
  {
    path:"/workdays",
    name:"Jornadas",
    icon: "mr-2 mdi mdi-calendar",
    menu: true,
    component: Workdays
  },
  {
    path:"/customers",
    name:"Clientes",
    icon: "mr-2 mdi mdi-account-card-details",
    menu: true,
    component: Companies
  },
  {
    path:"/companies",
    name:"Empresas",
    icon: "mr-2 mdi mdi-bank",
    menu: true,
    component: Companies
  },
  {
    path:"/products",
    name:"Productos",
    icon: "mr-2 mdi mdi-format-list-bulleted",
    menu: true,
    component: Products
  }, 
  {
    path:"/forms",
    name:"Presentación productos",
    icon: "mr-2 mdi mdi-bookmark",
    menu: true,
    component: Forms
  }, 
  {
    path:"/vehicles",
    name:"Vehiculos",
    icon: "mr-2 mdi mdi-truck-delivery",
    menu: true,
    component: Vehicles
  },
  {
    path:"/people",
    name:"Personas",
    icon: "mr-2 mdi mdi-account-multiple",
    menu: true,
    component: People
  },
  {
    path:"/categories",
    name:"Categorías",
    icon: "mr-2 mdi mdi-tag-multiple",
    menu: true,
    component: Categories
  },
  
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;

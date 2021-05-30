import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/** Componentes de la plantilla principal **/
import { Header } from "../components/layouts/Header";
import { LeftSideBar } from "../components/layouts/LeftSideBar";
import { BreadCrumb } from "../components/layouts/BreadCrumb";
import { Footer } from "../components/layouts/Footer";

/** Paginas **/
import { HomeScreen } from "../components/home/HomeScreen";
import { UsersScreen } from "../components/users/UsersScreen";

export const MainRouter = () => {

  const menu = [
    {
      icon: "mdi mdi-settings",
      title:"Configuración",
      to:"/settings",
      children: []
    },  
    {
      icon: "me-2 mdi mdi-lock-open-outline",
      title:"Control de Acceso",
      to:"",
      children: [
        {
          title:"Usuarios",
          to:"/users"
        },
        {
          title:"Historial Operaciones",
          to:"/audits"
        }
      ]
    },
    {
      icon: "me-2 mdi mdi-database",
      title:"Mantenedor",
      to:"",
      children: [
        {
          title:"Clientes",
          to:"/customers"
        },
        {
          title:"Empresas",
          to:"/companies"
        },
        {
          title:"Vehículos",
          to:"/vehicles"
        },
        {
          title:"Productos",
          to:"/products"
        }
      ]
    },
    {
      icon: "me-2 mdi mdi-lock-open-outline",
      title:"Gestión de Guías",
      to:"",
      children: [
        {
          title:"Listado",
          to:"/documents"
        },
        {
          title:"Crear",
          to:"/documents/create"
        }
      ]
    }
  ];

  return (
    <Router>
        <Header/>
        <LeftSideBar items={ menu }/>
        <div class="page-wrapper">
          <div class="container-fluid">
            <BreadCrumb/>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/users" component={UsersScreen} />
            </Switch>
          </div>
          <Footer/>
        </div>
    </Router>
  )
}  

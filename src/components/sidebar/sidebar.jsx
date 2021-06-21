import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from 'react-redux';
const Sidebar = (props) => {

    const { role } = useSelector(state => state.auth)
    const [ roleString , setRoleString ] = useState()

    useEffect(() => {
        setRoleString(role)
    }, [role])

    /*--------------------------------------------------------------------------------*/
    /*To Expand SITE_LOGO With Sidebar-Menu on Hover                                  */
    /*--------------------------------------------------------------------------------*/
    const expandLogo = () => {
        document.getElementById("logobg").classList.toggle("expand-logo");
    }
    /*--------------------------------------------------------------------------------*/
    /*Verifies if routeName is the one active (in browser input)                      */
    /*--------------------------------------------------------------------------------*/

    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? 'selected' : '';
    }

    return (
        <aside className="left-sidebar" id="sidebarbg" data-sidebarbg="skin6" onMouseEnter={expandLogo.bind(null)} onMouseLeave={expandLogo.bind(null)}>
            <div className="scroll-sidebar">
                <PerfectScrollbar className="sidebar-nav">
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Sidebar Menus will go here                                                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <Nav id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className=""></i>
                            <span className="hide-menu">MENÚ PRINCIPAL</span>
                        </li>
                        {props.routes.map((prop, key) => {
                            if (prop.redirect) {
                                return null;
                            }
                            else {
                                console.log(prop.role?.indexOf( roleString ))
                                if(prop.menu && prop.role?.indexOf( roleString ) >= 0){
                                    return (
                                        /*--------------------------------------------------------------------------------*/
                                        /* Adding Sidebar Item                                                            */
                                        /*--------------------------------------------------------------------------------*/
                                        <li className={activeRoute(prop.path) + (prop.pro ? ' active-pro' : '') + ' sidebar-item'} key={key}>
                                            <NavLink exact to={prop.path} className="sidebar-link" activeClassName="active">
                                                <i className={prop.icon} />
                                                <span className="hide-menu">{prop.name}</span>
                                            </NavLink>
                                        </li>
                                    );
                                }
                            }
                        })}
                    </Nav>
                </PerfectScrollbar>
            </div>
        </aside>
    );
}
export default Sidebar;

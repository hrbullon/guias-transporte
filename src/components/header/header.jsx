import React, { useEffect } from 'react';
import {
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    Collapse,
    DropdownItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux'

import profilephoto from '../../assets/images/users/1.jpg';

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from '../../assets/images/logo.png';
import logolighticon from '../../assets/images/logo-light-icon.png';
import logodarktext from '../../assets/images/logo-text.png';
import logolighttext from '../../assets/images/logo-light-text.png';
import { startLogout, startLoadingCompany } from '../../actions/auth';

const Header = () => {

    const dispatch = useDispatch()
    const uid  = useSelector(state => state.auth)
    const { sesionCompany, displayName }  = useSelector(state => state.auth)

    useEffect(() => {
        dispatch( startLoadingCompany( uid ) )
    }, [])

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    /*--------------------------------------------------------------------------------*/
    /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
    /*--------------------------------------------------------------------------------*/
    const showMobilemenu = () => {
        document.getElementById('main-wrapper').classList.toggle('show-sidebar');
    }

    return (
        <header className="topbar navbarbg" data-navbarbg="skin6">
            <Navbar className="top-navbar" dark expand="md">
                <div className="navbar-header" id="logobg" data-logobg="skin6">
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <NavbarBrand href="/">
                        <b className="logo-icon">
                            <img src={logodarkicon} alt="homepage" className="dark-logo" />
                            <img
                                src={logolighticon}
                                alt="homepage"
                                className="light-logo"
                            />
                        </b>
                        {/* <span className="logo-text">
                            <img src={logodarktext} alt="homepage" className="dark-logo" />
                            <img
                                src={logolighttext}
                                className="light-logo"
                                alt="homepage"
                            />
                        </span> */}
                    </NavbarBrand>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <button className="btn-link nav-toggler d-block d-md-none" onClick={() => showMobilemenu()}>
                        <i className="ti-menu ti-close" />
                    </button>
                </div>
                <Collapse className="navbarbg" navbar data-navbarbg="skin6" >
                    <Nav className="ml-auto float-right" navbar>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Profile Dropdown                                                         */}
                        {/*--------------------------------------------------------------------------------*/}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <img
                                    src={profilephoto}
                                    alt="user"
                                    className="rounded-circle"
                                    width="31"
                                />
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                                <DropdownItem>
                                    <i className="ti-user mr-1 ml-1" /> { displayName }
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="ti-wallet mr-1 ml-1" /> { sesionCompany?.nombre }
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem divider />
                                <DropdownItem onClick={ handleLogout }>
                                    <i className="fa fa-power-off mr-1 ml-1" /> Salir
                                </DropdownItem>
                                <DropdownItem divider />
                                <Button
                                    color="success"
                                    className="btn-rounded ml-3 mb-2 mt-2"
                                >
                                    Ver perfil
                                </Button>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Profile Dropdown                                                           */}
                        {/*--------------------------------------------------------------------------------*/}
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}
export default Header;

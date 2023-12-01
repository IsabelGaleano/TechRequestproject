// import node module libraries
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
    Row,
    Col,
    Image,
    Dropdown,
    ListGroup,
} from 'react-bootstrap';

// simple bar scrolling used for notification item scrolling
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import signOut from '../lib/userSignOut';

// import data files
import NotificationList from 'data/Notification';

// import hooks
import useMounted from 'hooks/useMounted';

import { useRouter } from 'next/navigation';
import { useAuthContext } from "../context/AuthContext";

const QuickMenu = () => {
    const { user } = useAuthContext()
    const { userInfo } = useAuthContext()
    const router = useRouter()
    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    const getUsuario = async () => {
        try {
            // const prop = { email: user.email };

            console.log("user", user);

            const response = await fetch(`/api/usuarios?reference=${user.uid}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            setUsuario(data);

            setNombre(data.nombre);
            setApellido(data.apellido);

        } catch (error) {
            console.error("There was a problem fetching the data:", error.message);
        }
    };

    useEffect(() => {
        if (user == null) router.push("/")

        getUsuario();
    }, [user])



    const handleLogout = async () => {
        const { error } = await signOut();

        if (error) {
            console.log(error);
        } else {
            console.log('Deslogueado');
            router.push('/');
        }
    };


    const hasMounted = useMounted();

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const Notifications = () => {
        return (
            <SimpleBar style={{ maxHeight: '300px' }}>
                <ListGroup variant="flush">
                    {NotificationList.map(function (item, index) {
                        return (
                            <ListGroup.Item className={index === 0 ? 'bg-light' : ''} key={index}>
                                <Row>
                                    <Col>
                                        <Link href="#" className="text-muted">
                                            <h5 className=" mb-1">{item.sender}</h5>
                                            <p className="mb-0"> {item.message}</p>
                                        </Link>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </SimpleBar>
        );
    }

    const QuickMenuDesktop = () => {
        return (
            <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
                <Dropdown as="li" className="stopevent">
                    <Dropdown.Toggle as="a"
                        bsPrefix=' '
                        id="dropdownNotification"
                        className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted">
                        <i className="fe fe-bell"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0"
                        aria-labelledby="dropdownNotification"
                        align="end"
                        show
                    >
                        <Dropdown.Item className="mt-3" bsPrefix=' ' as="div"  >
                            <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                                <span className="h4 mb-0">Notifications</span>
                                <Link href="/" className="text-muted">
                                    <span className="align-middle">
                                        <i className="fe fe-settings me-1"></i>
                                    </span>
                                </Link>
                            </div>
                            <Notifications />
                            <div className="border-top px-3 pt-3 pb-3">
                                <Link href="/dashboard/notification-history" className="text-link fw-semi-bold">
                                    See all Notifications
                                </Link>
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li" className="ms-2">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=' '
                        className="rounded-circle"
                        id="dropdownUser">
                        <div className="avatar avatar-md avatar-indicators avatar-online">
                            <Image alt="avatar" src='/images/avatar/avatar-1.jpg' className="rounded-circle" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dropdown-menu dropdown-menu-end "
                        align="end"
                        aria-labelledby="dropdownUser"
                        show
                    >
                        <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=' '>
                            <div className="lh-1 ">
                                <h5 className="mb-1">{nombre} {apellido}</h5>
                                <Link href={'/pages/settings'} className="text-inherit fs-6">Ver mi Perfil</Link>
                            </div>
                            <div className=" dropdown-divider mt-3 mb-2"></div>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                            <div>
                                <Link href={'/pages/settings'}><i className="fe fe-user me-2"></i> Editar Perfil</Link>
                            </div>
                        </Dropdown.Item>
                        {/* <Dropdown.Item eventKey="3">
                            <i className="fe fe-activity me-2"></i> Activity Log
                        </Dropdown.Item>
                        <Dropdown.Item className="text-primary">
                            <i className="fe fe-star me-2"></i> Go Pro
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <i className="fe fe-settings me-2"></i> Account Settings
                        </Dropdown.Item> */}
                        <Dropdown.Item onClick={handleLogout}>
                            <i className='fe fe-power me-2'></i>Cerrar sesión
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
        )
    }

    const QuickMenuMobile = () => {
        return (
            <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
                <Dropdown as="li" className="stopevent">
                    <Dropdown.Toggle as="a"
                        bsPrefix=' '
                        id="dropdownNotification"
                        className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted">
                        <i className="fe fe-bell"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0"
                        aria-labelledby="dropdownNotification"
                        align="end"
                    >
                        <Dropdown.Item className="mt-3" bsPrefix=' ' as="div"  >
                            <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                                <span className="h4 mb-0">Notifications</span>
                                <Link href="/" className="text-muted">
                                    <span className="align-middle">
                                        <i className="fe fe-settings me-1"></i>
                                    </span>
                                </Link>
                            </div>
                            <Notifications />
                            <div className="border-top px-3 pt-3 pb-3">
                                <Link href="/dashboard/notification-history" className="text-link fw-semi-bold">
                                    See all Notifications
                                </Link>
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li" className="ms-2">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=' '
                        className="rounded-circle"
                        id="dropdownUser">
                        <div className="avatar avatar-md avatar-indicators avatar-online">
                            <Image alt="avatar" src='/images/avatar/avatar-1.jpg' className="rounded-circle" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dropdown-menu dropdown-menu-end "
                        align="end"
                        aria-labelledby="dropdownUser"
                    >
                        <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=' '>
                            <div className="lh-1 ">
                                <h5 className="mb-1">{nombre} {apellido}</h5>

                                <Link href={'/pages/settings'} className="text-inherit fs-6">Ver mi Perfil</Link>
                            </div>
                            <div className=" dropdown-divider mt-3 mb-2"></div>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                            <div>
                                <Link href={'/pages/settings'}><i className="fe fe-user me-2"></i> Editar Perfil</Link>
                            </div>
                        </Dropdown.Item>
                        {/* <Dropdown.Item eventKey="3">
                            <i className="fe fe-activity me-2"></i> Activity Log
                        </Dropdown.Item>
                        <Dropdown.Item className="text-primary">
                            <i className="fe fe-star me-2"></i> Go Pro
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <i className="fe fe-settings me-2"></i> Account Settings
                        </Dropdown.Item> */}
                        <Dropdown.Item onClick={handleLogout}>
                            <i className='fe fe-power me-2'></i>Cerrar sesión
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
        )
    }

    return (
        <Fragment>
            {hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
        </Fragment>
    )
}

export default QuickMenu;
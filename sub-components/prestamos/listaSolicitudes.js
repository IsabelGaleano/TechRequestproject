// import node module libraries
import React from "react";
import Link from 'next/link';
import { Card, Table, Dropdown, Image } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';

import { Component, useEffect, useState } from "react";
// import widget as custom components

import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

// import required data files
import TeamsData from "data/dashboard/TeamsData";

const ListaSolicitudes = () => {


    const { user } = useAuthContext()
    const router = useRouter()
    const [equipos, setEquipos] = useState([])
    const [solicitudes, setSolicitudes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getEquipos();
                await getSolicitudes();
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setLoading(false);
            }
        };

        fetchData();
        if (user == null) router.push("/");
    }, [user]);


    const getEquipos = async () => {
        try {
            const response = await fetch("/api/equipos", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            setEquipos(data);
            console.log(data)
        } catch (error) {
            console.error("There was a problem fetching the data:", error.message);
        }
    };

    const getSolicitudes = async () => {
        try {
            const response = await fetch("/api/prestamos", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            setSolicitudes(data);
            console.log(data)
        } catch (error) {
            console.error("There was a problem fetching the data:", error.message);
        }
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        (<Link
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="text-muted text-primary-hover">
            {children}
        </Link>)
    ));

    CustomToggle.displayName = 'CustomToggle';

    const ActionMenu = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    <MoreVertical size="15px" className="text-muted" />
                </Dropdown.Toggle>
                <Dropdown.Menu align={'end'}>
                    <Dropdown.Item eventKey="1">
                        Realizar Devolución
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        Something else here
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return (

        <Card className="h-100">
            <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Información </h4>
            </Card.Header>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <Table responsive className="text-nowrap">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha Inicial</th>
                            <th>Fecha Devolución</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.map((solicitud, index) => {
                            const equipo = equipos.find(e => e.reference === solicitud.idEquipo);
                            if (!equipo) {
                                // Manejar el caso donde no se encuentra un equipo correspondiente
                                console.error(`No se encontró un equipo para la solicitud con idEquipo ${solicitud.idEquipo}`);
                                return null;
                            }
                            return (
                                <tr key={index}>
                                    <td className="align-middle">
                                        <div className="d-flex align-items-center">

                                            <div className="ms-3 lh-1">
                                                <h5 className=" mb-1">{equipo.nombre}</h5>
                                                <p className="mb-0">{equipo.modelo}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="align-middle">{solicitud.fechaInicio}</td>
                                    <td className="align-middle">{solicitud.fechaFin}</td>
                                    <td className="align-middle">{solicitud.estado}</td>
                                    <td className="align-middle">

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </Table>)}
        </Card>
    )
}

export default ListaSolicitudes
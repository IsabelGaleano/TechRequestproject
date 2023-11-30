import React from "react";
import Link from 'next/link';
import { Card, Table, Button } from 'react-bootstrap';

import { Component, useEffect, useState } from "react";
// import widget as custom components

import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const ListaEquipos = () => {


    const { user } = useAuthContext()
    const router = useRouter()
    const [equipos, setEquipos] = useState([])

    useEffect(() => {
        getEquipos();
        if (user == null) router.push("/")
    }, [user])


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

    return (
        <Card className="h-100">
            <Card.Header className="bg-white py-4 d-flex">
                <h4 className="mb-0 me-auto">Información </h4>
                <Button variant="primary" onClick={() => router.push('/pages/formEquipo')}>Crear Equipo</Button>
            </Card.Header>
            <Table responsive className="text-nowrap">
                <thead className="table-light">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map(({nombre, modelo, cantidad, descripcion, estado}, index) => {
                        return (
                            <tr key={index}>
                                <td className="align-middle">
                                    <div className="d-flex align-items-center">
                                        
                                        <div className="ms-3 lh-1">
                                            <h5 className=" mb-1">{nombre}</h5>
                                            <p className="mb-0">{modelo}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle">{descripcion}</td>
                                <td className="align-middle">{cantidad}</td>
                                <td className="align-middle">{estado}</td>
                                <td className="align-middle">
                                  
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </Table>
        </Card>
    )
}

export default ListaEquipos
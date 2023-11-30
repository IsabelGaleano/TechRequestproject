import { Container } from 'react-bootstrap';
import { Component, useEffect, useState } from "react";


import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import DefaultDashboardLayout from "../../layouts/DefaultDashboardLayout";

import RegistrarEquipo from 'sub-components/equipos/registrarEquipo';

const FormEquipos = () => {
    const { user } = useAuthContext();
    const router = useRouter();
    
    useEffect(() => {
        if (user == null) router.push("/");
    }, [user]);


    const Layout =
        Component.Layout ||
        (router.pathname && router.pathname.includes("dashboard")
            ? router.pathname.includes("instructor") ||
                router.pathname.includes("student")
                ? DefaultDashboardLayout
                : DefaultDashboardLayout
            : DefaultDashboardLayout);

    return (

        <Layout>
            <Container fluid className="p-6">
                <RegistrarEquipo />
            </Container>
        </Layout>

    )
}

export default FormEquipos
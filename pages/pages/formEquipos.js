// import node module libraries
import { Container } from 'react-bootstrap';
import { Component, useEffect, useState } from "react";
// import widget as custom components
import { PageHeading } from 'widgets'

import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import DefaultDashboardLayout from "../../layouts/DefaultDashboardLayout";

// import sub components
import { Notifications, DeleteAccount, GeneralSetting, EmailSetting, Preferences } from 'sub-components'
import RegistrarPrestamos from 'sub-components/prestamos/registrarPrestamos';

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

                <RegistrarPrestamos />

            </Container>
        </Layout>

    )
}

export default FormEquipos
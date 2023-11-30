// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';
import { Component, useEffect, useState } from "react";
// import widget as custom components
import { PageHeading } from 'widgets'

import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import DefaultDashboardLayout from "../../layouts/DefaultDashboardLayout";
import ListaSolicitudes from 'sub-components/prestamos/listaSolicitudes';


const Solicitudes = () => {

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
        {/* Page Heading */}
        <PageHeading heading="Solicitudes" />
        <ListaSolicitudes/>

      </Container>
    </Layout>

  )
}

export default Solicitudes
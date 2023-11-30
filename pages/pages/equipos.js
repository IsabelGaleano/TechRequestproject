import { Container } from 'react-bootstrap';
import { Component, useEffect } from "react";
import { PageHeading } from 'widgets'

import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import DefaultDashboardLayout from "../../layouts/DefaultDashboardLayout";
import ListaEquipos from 'sub-components/equipos/listaEquipos';


const Equipos = () => {

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
        <PageHeading heading="Equipos" />
        <ListaEquipos/>
      </Container>
    </Layout>

  )
}

export default Equipos
// import node module libraries
import { Component, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import {
  ActiveProjects,
  Teams,
  TasksPerformance,

} from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

import { useAuthContext } from "../context/AuthContext";

import DefaultDashboardLayout from "../layouts/DefaultDashboardLayout";
import { useRouter } from "next/router";
import SignIn from "./authentication/sign-in";
import ListaSolicitudes from "sub-components/prestamos/listaSolicitudes";

const Home = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  const Layout =
    Component.Layout ||
    (router.pathname.includes("dashboard")
      ? router.pathname.includes("instructor") ||
        router.pathname.includes("student")
        ? DefaultDashboardLayout
        : DefaultDashboardLayout
      : DefaultDashboardLayout);

  console.log(user);
  return user ? (
    <Layout>
      <div className="bg-primary pt-10 pb-21"></div>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            {/* Page header */}
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  text-white">Solicitudes de Equipos</h3>
                </div>
                <div>
                  <Link href="/pages/formEquipos" className="btn btn-white">Crear Solicitud</Link>
                </div>
              </div>
            </div>
          </Col>

        </Row>
        {/* Active Projects  */}
        <div className="my-4"> 
          <ListaSolicitudes />
        </div>


      </Container>
    </Layout>
  ) : (
    <SignIn />
  );
};
export default Home;

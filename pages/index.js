// import node module libraries
import { Component, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";


// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

import DefaultDashboardLayout from "../layouts/DefaultDashboardLayout";
import { useRouter } from "next/router";
import SignIn from "./authentication/sign-in";


const Home = () => {

    const router = useRouter();

    const Layout =
    Component.Layout ||
    (router.pathname.includes("dashboard")
      ? router.pathname.includes("instructor") ||
        router.pathname.includes("student")
        ? DefaultDashboardLayout
        : DefaultDashboardLayout
      : DefaultDashboardLayout);

    return (
        <SignIn />
    )
}
export default Home;

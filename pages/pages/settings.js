// import node module libraries
import { Container } from 'react-bootstrap';
import { Component, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import DefaultDashboardLayout from "../../layouts/DefaultDashboardLayout";

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import { Notifications, DeleteAccount, GeneralSetting, EmailSetting, Preferences } from 'sub-components'
import { useRouter } from "next/navigation";

const Settings = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  const getUsuario = async () => {
    try {
      // const prop = { email: user.email };

      const response = await fetch(`/api/usuarios?email=${user.email}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setUsuario(data);

    } catch (error) {
      console.error("There was a problem fetching the data:", error.message);
    }
  };

  useEffect(() => {
    if (user == null) router.push("/");

    getUsuario();

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
        <PageHeading heading="General" />

        {/* General Settings */}
        <GeneralSetting usuario={usuario}/>

        {/* Email Settings */}
        {/* <EmailSetting /> */}

        {/* Settings for Preferences */}
        {/* <Preferences /> */}

        {/* Settings for Notifications */}
        {/* <Notifications /> */}

        {/* Delete Your Account */}
        {/* <DeleteAccount /> */}

      </Container>
    </Layout>
  )
}

export default Settings
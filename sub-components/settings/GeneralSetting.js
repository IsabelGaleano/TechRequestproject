import { Col, Row, Form, Card, Button, Image, Spinner } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import { Component, useEffect, useState } from "react";

const GeneralSetting = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const usuario = props.usuario;

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/usuarios?reference=${usuario.reference}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 5000);
      } else {
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
      }

      setIsLoading(false);

      // Additional logic after successful form submission

      // router.push("/dashboard");
    } catch (error) {
      setIsLoading(false);
      // console.error("There was a problem fetching the data:", error.message);
    }
  };

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Ajustes Generales</h4>
          <p className="mb-0 fs-5 text-muted">Ajustes del Perfil </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          <Card.Body>
            <div className="mb-6">
              <h4 className="mb-1">Ajustes Generales</h4>
            </div>
            <div>
              <div className="mb-6">
                <h4 className="mb-1">Información Básica</h4>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <label
                    htmlFor="nombre"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Nombre Completo
                  </label>
                  <div className="col-sm-4 mb-3 mb-lg-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={usuario ? usuario.nombre : "Nombre"}
                      id="nombre"
                      {...register("nombre", { required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={usuario ? usuario.apellido : "Apellido"}
                      id="apellido"
                      {...register("apellido", { required: true })}
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="correoElectronico"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Correo Electrónico
                  </label>
                  <div className="col-md-8 col-12">
                    <input
                      type="correoElectronico"
                      className="form-control"
                      placeholder={
                        usuario ? usuario.correoElectronico : "Correo Electrónico"
                      }
                      id="correoElectronico"
                      {...register("correoElectronico", { required: true })}
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="telefono">
                    Teléfono <span className="text-muted">(Opcional)</span>
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder={usuario ? usuario.telefono : "Teléfono"}
                      id="telefono"
                      {...register("telefono")}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="direccion">
                    Dirección
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder={usuario ? usuario.direccion : "Dirección"}
                      id="direccion"
                      {...register("direccion", { required: true })}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  {/* Add other input fields here */}
                </Row>
                <Row className="mb-3">
                  <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                    <Button variant="primary" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="d-flex align-items-center">
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            className="me-2"
                          />
                          <span>Salvando...</span>
                        </div>
                      ) : (
                        "Salvar Cambios"
                      )}
                    </Button>
                  </Col>
                  <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                    {showSuccessAlert && (
                      <div className="alert alert-success" role="alert">
                        Los cambios han sido salvados con éxito!
                      </div>
                    )}
                  </Col>
                  
                  <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                    {showErrorAlert && (
                      <div className="alert alert-error" role="alert">
                        Ocurrió un error al salvar los cambios, por favor intente de nuevo.
                      </div>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralSetting;
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const GeneralSetting = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const usuario = props.usuario;

  useEffect(() => {
    if (props.usuario) {
      setNombre(props.usuario.nombre || "");
      setApellido(props.usuario.apellido || "");
      setCorreoElectronico(props.usuario.correoElectronico || "");
      setTelefono(props.usuario.telefono || "");
      setDireccion(props.usuario.direccion || "");
    }
  }, [props.usuario]);

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
      } else {
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
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
                      id="nombre"
                      {...register("nombre", { required: true })}
                      defaultValue={nombre}
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      {...register("apellido", { required: true })}
                      defaultValue={apellido}
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
                      id="correoElectronico"
                      {...register("correoElectronico", { required: true })}
                      defaultValue={correoElectronico}
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
                      id="telefono"
                      {...register("telefono")}
                      defaultValue={telefono}
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
                      id="direccion"
                      {...register("direccion", { required: true })}
                      defaultValue={direccion}
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

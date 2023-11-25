// import node module libraries
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";

// import widget as custom components
import { FormSelect, DropFiles } from "widgets";

const GeneralSetting = props => {
  const usuario = props.usuario;

  console.log(props);

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Ajustes Generales</h4>
          <p className="mb-0 fs-5 text-muted">
            Ajustes del Perfil{" "}
          </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">Ajustes Generales</h4>
            </div>
            <Row className="align-items-center mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                <h5 className="mb-0">Foto de Perfil</h5>
              </Col>
              <Col md={9}>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <Image
                      src="/images/avatar/avatar-5.jpg"
                      className="rounded-circle avatar avatar-lg"
                      alt=""
                    />
                  </div>
                  <div>
                    <Button
                      variant="outline-white"
                      className="me-2"
                      type="submit"
                    >
                      Cambiar{" "}
                    </Button>
                    <Button variant="outline-white" type="submit">
                      Eliminar{" "}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            {/* col */}
            <Row className="mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                {/* heading */}
                <h5 className="mb-0">Foto de Portada</h5>
              </Col>
              <Col md={9}>
                {/* dropzone input */}
                <div>
                  <Form
                    action="#"
                    className="dropzone mb-3 py-10 border-dashed"
                  >
                    <DropFiles />
                  </Form>
                  <Button variant="outline-white" type="submit">
                    Change{" "}
                  </Button>
                </div>
              </Col>
            </Row>
            <div>
              {/* border */}
              <div className="mb-6">
                <h4 className="mb-1">Información Básica</h4>
              </div>
              <Form>
                {/* row */}
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Nombre Completo
                  </label>
                  <div className="col-sm-4 mb-3 mb-lg-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={usuario ? usuario.nombre : "Nombre"}
                      id="fullName"
                      required
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={usuario ? usuario.apellido : "Apellido"}
                      id="lastName"
                      required
                    />
                  </div>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <label
                    htmlFor="email"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Correo Electrónico
                  </label>
                  <div className="col-md-8 col-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={usuario ? usuario.correoElectronico : "Correo Electrónico"}
                      id="email"
                      required
                    />
                  </div>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="phone">
                    Teléfono <span className="text-muted">(Opcional)</span>
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder={usuario ? usuario.telefono : "Teléfono"}
                      id="phone"
                    />
                  </Col>
                </Row>

                {/* Address Line One */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="addressLine">
                    Dirección
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder={usuario ? usuario.direccion : "Dirección"}
                      id="addressLine"
                      required
                    />
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

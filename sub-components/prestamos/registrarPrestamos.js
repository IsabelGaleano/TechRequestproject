// import node module libraries
import { Col, Row, Form, Card, Button, Spinner } from 'react-bootstrap';
import { Component, useEffect, useState } from "react";
// import widget as custom components
import { FormSelect } from 'widgets';

import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegistrarPrestamos = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuthContext()
    const router = useRouter()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [equipos, setEquipos] = useState([])
    const [seleccioneEquiposDisabled, setSeleccioneEquiposDisabled] = useState(false)
    const [cantidadDisponible, setCantidadDisponible] = useState(0);
    const [selectedEquipoId, setSelectedEquipoId] = useState("");
    const isSubmitDisabled = isLoading || cantidadDisponible <= 0 || selectedEquipoId === "";


    useEffect(() => {
        getEquipos();
        if (user == null) router.push("/")
    }, [user])


    const getEquipos = async () => {
        try {
            const response = await fetch("/api/equipos", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            setEquipos(data);
            console.log(data)
        } catch (error) {
            console.error("There was a problem fetching the data:", error.message);
        }
    };


    const onEquipoSelect = (event) => {
        const selectedId = event.target.value;

        if (selectedId !== "") {
            const selectedEquipo = equipos.find((equipo) => equipo.reference === selectedId);

            if (selectedEquipo) {
                setCantidadDisponible(selectedEquipo.cantidad);
                setSeleccioneEquiposDisabled(true);
            }
        } else {

            setCantidadDisponible(0);
            setSeleccioneEquiposDisabled(false);
        }


        setSelectedEquipoId(selectedId);
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            console.log(data);
            data.idUsuario = user.email

            const response = await fetch('/api/prestamos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                //router.push("/pages/ciudades");

                setIsLoading(false);
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <Row className="mb-8">
            <Col xl={3} lg={4} md={12} xs={12}>
                <div className="mb-4 mb-lg-0">
                    <h4 className="mb-1">Solicitud de Equipo</h4>
                    <p className="mb-0 fs-5 text-muted">La duración máxima permitida para adquirir un equipo es de 5 días.
                        Por favor, asegúrese de devolver el equipo solicitado dentro de este período especificado.</p>
                </div>
            </Col>
            <Col xl={9} lg={8} md={12} xs={12}>
                <Card id="preferences">
                    <Card.Body>
                        <div className="mb-6">
                            <h4 className="mb-1">Solicitud</h4>
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group className="mb-3 row" controlId="idEquipo">
                                <Form.Label className="col-sm-4 col-form-label">Equipo</Form.Label>
                                <Col md={8} xs={12}>
                                    <Form.Select
                                        aria-label="Equipo"
                                        name="idEquipo"
                                        {...register("idEquipo", { required: true })}
                                        onClick={onEquipoSelect}
                                        className={errors.idEquipo ? "form-control is-invalid" : "form-control"}
                                    >
                                        <option value="" disabled={seleccioneEquiposDisabled}>
                                            Seleccione un equipo
                                        </option>
                                        {equipos.map((equipo) => (
                                            <option key={equipo.reference} value={equipo.reference}>
                                                {equipo.nombre} ({equipo.cantidad})
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.idEquipo && <div className="invalid-feedback">Este campo es requerido.</div>}
                                    {cantidadDisponible <= 0 && selectedEquipoId !== "" && (
                                        <p style={{ color: "red", marginTop: "5px" }}>No hay cantidad suficiente de equipo.</p>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3 row" controlId="fechaInicio">
                                <Form.Label className="col-sm-4 col-form-label">Fecha Inicial</Form.Label>

                                <Col md={8} xs={12}>
                                    <Form.Control
                                        type="date"
                                        name='fechaInicio'
                                        {...register("fechaInicio", { required: true })}
                                        className={errors.fechaInicio ? "form-control is-invalid" : "form-control"}
                                    />
                                    {errors.fechaInicio && (
                                        <div className="invalid-feedback">Este campo es requerido.</div>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3 row" controlId="fechaFin">
                                <Form.Label className="col-sm-4 col-form-label">Fecha de Devolución</Form.Label>

                                <Col md={8} xs={12}>
                                    <Form.Control
                                        type="date"
                                        name='fechaFin'
                                        {...register("fechaFin", { required: true })}
                                        className={errors.fechaFin ? "form-control is-invalid" : "form-control"}
                                    />
                                    {errors.fechaFin && (
                                        <div className="invalid-feedback">Este campo es requerido.</div>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3 row" controlId="comentarios">
                                <Form.Label className="col-sm-4 col-form-label">Comentarios adicionales</Form.Label>

                                <Col md={8} xs={12}>
                                    <Form.Control
                                        as="textarea"  // Especifica que el control sea un text area
                                        name='comentarios'
                                        {...register("comentarios", { required: true })}
                                        className={errors.comentarios ? "form-control is-invalid" : "form-control"}
                                    />
                                    {errors.comentarios && (
                                        <div className="invalid-feedback">Este campo es requerido.</div>
                                    )}
                                </Col>
                            </Form.Group>


                            <div>
                                {/* Button */}
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
                                        {isLoading ? (
                                            <div className="d-flex align-items-center">
                                                <Spinner animation="border" size="sm" role="status" className="me-2" />
                                                <span>Enviando...</span>
                                            </div>
                                        ) : (
                                            'Enviar'
                                        )}
                                    </Button>
                                </div>

                            </div>
                        </Form>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default RegistrarPrestamos
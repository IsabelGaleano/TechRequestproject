import { Col, Row, Form, Card, Button, Spinner, Alert } from 'react-bootstrap';
import {  useEffect, useState } from "react";

import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegistrarEquipo = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuthContext()
    const router = useRouter()

    const [error, setError] = useState(null)
    const [submitted, setSubmitted] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isSubmitDisabled = isLoading


    useEffect(() => {
        if (user == null) router.push("/")
    }, [user])



    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            console.log(data);
            data.idUsuario = user.email

            const response = await fetch('/api/equipos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                reset()
                setIsLoading(false)
                setSubmitted(true)
                setTimeout(() => {
                    setSubmitted(false)
                  }, 2000);
            }

        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    return (
        <Row className="mb-8">
            <Col xl={3} lg={4} md={12} xs={12}>
                <div className="mb-4 mb-lg-0">
                    <h4 className="mb-1">Registro de Equipo</h4>
                    {submitted && <Alert variant="success">                                                    
    Equipo registrado con éxito
</Alert>}
                </div>
            </Col>
            <Col xl={9} lg={8} md={12} xs={12}>
                <Card id="preferences">
                    <Card.Body>
                        <div className="mb-6">
                            <h4 className="mb-1">Equipo</h4>
                            {error && (
                                <div className="alert alert-danger mt-4" role="alert">
                                    {error}
                                </div>
                            )}
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group className="mb-3 row" controlId="nombre">
                                <Form.Label className="col-sm-4 col-form-label">Nombre</Form.Label>

                                <Col md={8} xs={12}>
                                    <Form.Control
                                        type="text"
                                        name='nombre'
                                        {...register("nombre", { required: true })}
                                        className={errors.nombre ? "form-control is-invalid" : "form-control"}
                                    />
                                    {errors.nombre && (
                                        <div className="invalid-feedback">Este campo es requerido.</div>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3 row" controlId="modelo">
                                <Form.Label className="col-sm-4 col-form-label">Modelo</Form.Label>

                                <Col md={8} xs={12}>
                                    <Form.Control
                                        type="text"
                                        name='modelo'
                                        {...register("modelo", { required: true })}
                                        className={errors.modelo ? "form-control is-invalid" : "form-control"}
                                    />
                                    {errors.modelo && (
                                        <div className="invalid-feedback">Este campo es requerido.</div>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-3 row" controlId="cantidad">
                                <Form.Label className="col-sm-4 col-form-label">Cantidad</Form.Label>

                                <Col md={8} xs={12}>
                                    <Form.Control
                                        type="number"
                                        name='cantidad'
                                        {...register("cantidad", { required: true })}
                                        className={errors.modelo ? "form-control is-invalid" : "form-control"}
                                    />
                                    {errors.cantidad && (
                                        <div className="invalid-feedback">Este campo es requerido.</div>
                                    )}
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3 row" controlId="comentarios">
                                <Form.Label className="col-sm-4 col-form-label">Descripción</Form.Label>

                                <Col md={8} xs={12}>
                                    <Form.Control
                                        as="textarea"
                                        name='descripcion'
                                        {...register("descripcion", { required: true })}
                                        className={errors.descripcion ? "form-control is-invalid" : "form-control"}
                                    />
                                    {errors.descripcion && (
                                        <div className="invalid-feedback">Este campo es requerido.</div>
                                    )}
                                </Col>
                            </Form.Group>


                            <div>
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

export default RegistrarEquipo
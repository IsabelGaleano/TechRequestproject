import { db } from "../../lib/firebase";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await getPrestamosHandler(res);
    } else if (req.method === "POST") {
        await createPrestamoHandler(req, res);
    }

}

const getPrestamosHandler = async (res) => {
    try {

        const prestamosSnap = await db
            .collection("prestamos")
            .get();
        const prestamos = prestamosSnap.docs.map((doc) => ({
            reference: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};


const createPrestamoHandler = async (req, res) => {
    const {
        fechaInicio,
        fechaFin,
        estado,
        idEquipo,
        idUsuario,
        comentarios,
    } = req.body;

    try {
        const newPrestamo = {
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            idEquipo: idEquipo,
            idUsuario: idUsuario,
            estado: estado,
            comentarios: comentarios
        };
        const ref = await db.collection("prestamos").add(newPrestamo);

        const prestamo = {
            ...newPrestamo,
            reference: ref.id,
        };
        res.status(200).json(prestamo);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Something went wrong" });
    }
};
import { db } from "../../lib/firebase";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await getEquiposHandler(res);
    } else if (req.method === "POST") {
        await createEquipoHandler(req, res);
    }

}

const getEquiposHandler = async (res) => {
    try {
        
        const prestamosSnap = await db
            .collection("equipos")
            .get();
        const prestamos = prestamosSnap.docs.map((doc) => ({
            reference: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong getting all equipments" });
    }
};

const createEquipoHandler = async (req, res) => {
    const {
        nombre,
        modelo,
        descripcion,
        cantidad,
    } = req.body;

    try {
        const newEquipo = {
            nombre: nombre,
            modelo: modelo,
            descripcion: descripcion,
            cantidad: cantidad,
            estado: "Activo"
        };
        const ref = await db.collection("equipos").add(newEquipo);

        const equipo = {
            ...newEquipo,
            reference: ref.id,
        };
        res.status(200).json(equipo);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Something went wrong with registering the equipment" });
    }
};
import { db } from "../../lib/firebase";

export default async function handler(req, res) {
    if (req.method === "GET") {
        if(req.query.email) {
            await getUsuarioByCorreoElectronicoHandler(req, res);
        }
    }
}

const getUsuarioByCorreoElectronicoHandler = async (req, res) => {
    try {
        const usuarioSnap = await db
            .collection("usuarios")
            .where("correoElectronico", "==", req.query.email)
            .get();

        const usuario = usuarioSnap.docs.map((doc) => ({
            reference: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(usuario[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

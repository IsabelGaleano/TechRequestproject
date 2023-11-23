import { db } from "../../lib/firebase";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await getPrestamosHandler(res);
    } 

}

const getPrestamosHandler = async (res) => {
    try {
        const equipajeSnap = await db
            .collection("prestamos")
            .get();
        const equipaje = equipajeSnap.docs.map((doc) => ({
            reference: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(equipaje);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

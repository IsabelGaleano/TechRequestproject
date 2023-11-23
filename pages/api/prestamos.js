import { db } from "../../lib/firebase";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await getPrestamosHandler(res);
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

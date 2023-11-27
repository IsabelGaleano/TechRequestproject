import { db } from "../../lib/firebase";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await getEquiposHandler(res);
    } 

}

const getEquiposHandler = async (res) => {
    try {

        const equiposSnap = await db
            .collection("equipos")
            .get();
        const equipos = equiposSnap.docs.map((doc) => ({
            reference: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(equipos);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
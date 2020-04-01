import { v4 as uuid } from 'uuid';
import { clientId, redirectUri, scopes } from "../src/config";

export default router => {

    router.get("/greeting", (req, res) => {

        res.json({ message: `Hello, world! Unique ID: ${uuid()}` });

    });

    router.get("/login", (req, res) => {

        res.send("login server active");
        console.log(clientId + " " + redirectUri + " " + scopes);

    });
}
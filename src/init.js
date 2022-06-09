import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Product";
import "./models/Order";
import "./models/User";
import app from "./server";



const PORT = process.env.PORT || 3000;

const handleListen = () => console.log(`Server Listening on port ${PORT}`);



app.listen(PORT, handleListen); 
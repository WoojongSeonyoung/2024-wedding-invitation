import {getDatabase} from "firebase/database";
import firebaseApp from "@/config/firebase.js";

const db = getDatabase(firebaseApp);

export default db;

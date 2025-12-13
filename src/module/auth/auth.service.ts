import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const login=async(email:string , password:string)=>{
    

    const result= await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
}
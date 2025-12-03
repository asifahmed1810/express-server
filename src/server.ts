import express, { Request, Response } from "express"

import config from "./config"
import initDB, { pool } from "./config/db";
import { userRoutes } from "./module/user/user.routes";


const app = express()
const port = config.port; 

app.use(express.json())

initDB();

app.use("/users",userRoutes)


//todos

app.post("/todos",async(req:Request, res:Response)=>{
  
  const {user_id, title}=req.body

  try {

    const result=await pool.query(`INSERT INTO todos(user_id , title) VALUES($1,$2) RETURNING *`, [user_id,title])


    
     res.status(201).json({
    success:true,
    message:"todo is posting successfully",
    data:result.rows[0]
  })

  } catch (error:any) {
     res.status(500).json({
    success:false,
    message:error.message,
    
  })

  }

 
})


app.get("/todos",async(req:Request , res:Response)=>{
  try {
    const result =await pool.query(`SELECT * FROM todos `)

    res.status(201).json({
      success:true,
      message:"Data retrived successfully",
      data:result.rows
    })
    
  } catch (err:any) {
    res.status(500).json({
      success:false,
      message:err.message
    })
    
  }
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

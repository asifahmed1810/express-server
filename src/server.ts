import express, { Request, Response } from "express"

import config from "./config"
import initDB, { pool } from "./config/db";


const app = express()
const port = config.port; 

app.use(express.json())

initDB();



app.get('/', (req:Request, res:Response) => {
  res.send('Next level development')
})

app.post("/users",async(req:Request, res:Response)=>{
  
  const {name , email}=req.body

  try {

    const result=await pool.query(`INSERT INTO users(name , email) VALUES($1,$2) RETURNING *`, [name , email])


    
     res.status(201).json({
    success:true,
    message:"data is posting successfully",
    data:result.rows[0]
  })

  } catch (error:any) {
     res.status(500).json({
    success:false,
    message:error.message,
    
  })

  }

 
})

app.get("/users",async(req:Request, res:Response)=>{
  try {
    const result =await pool.query(`SELECT * FROM users`)

     res.status(200).json({
      success:true,
      message:"data retrive successfully",
      data:result.rows

    })
    
  } catch (err:any) {
    res.status(500).json({
      success:false,
      message:err.message

    })
    
  }
})

app.get("/users/:id", async(req:Request , res:Response)=>{
   try {
    const result =await pool.query(`SELECT * FROM users WHERE id = $1`,[req.params.id])

    if(result.rows.length === 0){
      res.status(404).json({
          success:false,
      message:"data  not found"
      })
    }else{

      res.status(200).json({
      success:true,
      message:"data retrive successfully",
      data:result.rows[0]

    })
    }
     
    
  } catch (err:any) {
    res.status(500).json({
      success:false,
      message:err.message

    })
    
  }
})



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

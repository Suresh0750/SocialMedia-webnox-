
import app from './app'

import { PORT } from './config/env'
import { connectDB } from './infrastructure/database/connectDB'




app.listen(PORT,()=>{
    connectDB()
    console.log(`http://localhost:${PORT}`)
})



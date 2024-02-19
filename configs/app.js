'use strict'
 
//importaciones
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from "dotenv"
import userRoutes from '../src/users/users.routes.js'
import courseRoutes from '../src/courses/courses.routes.js'
 
//configuraciones
const app = express()
config()
const port = process.env.PORT || 3056
 
//configuracion del servidor
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //aceptar o denegar solicitudes de diferentes origenes (local, remoto) / politicas de acceso
app.use(helmet()) //aplica capa de seguridad basica al servidor
app.use(morgan('dev')) //logs de solicitudes al servidor HTTP
 
//declaracion de rutas
app.use(userRoutes)
app.use(courseRoutes)
 
//levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
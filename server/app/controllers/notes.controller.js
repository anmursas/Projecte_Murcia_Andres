// Ejemplo del controlador
// ubicado en controller.nots.controller.js
// utiliza el modelo Notes para obtener los datos
// lee la peticion (req) y da respuesta al cliente (res)

const Notes = require("../models/notes.model.js");


exports.obtener = (req, res) => {

    if (req.user.role!='alumne'){
        res.status(400).send("Solo pueden consultar alumnos");
    }

    Notes.recuperar(req.user.id_alumne,(err,data)=>{
        if(err)
            res.status(500).send({
                "ok":false,
                "error":err
            });
        else{
            // retornar les dades al client
            res.status(200).send(
                {
                    "ok":true,
                    "data":data
                }
            )
        }
        
    });
}
import React from "react";
import { CreateUser } from "../API/data";
import { GenericModal } from "../components/SweetAlert";
import { useNavigate } from "react-router-dom";

export default function Create() {

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que la página se recargue al enviar el formulario
      };
    const CREATE = async () =>{
        const documento = document.getElementById("inputDocumento").value
        const nombre = document.getElementById("inputNombre").value
        const edad = document.getElementById("inputEdad").value
        const profesion = document.getElementById("inputProfesion").value

        if(!documento || !nombre || !edad || !profesion) {
            GenericModal('error', 'Todos los campos son obligatorios', 'aceptar', false, false)
            return
        }
        const result = await GenericModal('warning', '¿Estas seguro de querer registrar este elemento?', 'registrar', true, true)
        
        if(result){
            await CreateUser(documento, nombre, Number(edad), profesion).then((response)=>{
                if(response.statusCode === 200){
                    GenericModal('success', 'Elemento registrado', 'aceptar', false, false).
                    then(
                        ()=>navigate('/')
                    )
                }else{
                    GenericModal('error', response.message, 'aceptar', false, false)
                }
            })
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label for="inputDocumento">Documento</label>
                <input type="number" className="form-control" id="inputDocumento" placeholder="documento"/>
                </div>
                <div className="form-group col-md-6">
                <label for="inputNombre">Nombre</label>
                <input type="text" className="form-control" id="inputNombre" placeholder="Nombre"/>
                </div>

                <div className="form-group col-md-6">
                <label for="inputEdad">Edad</label>
                <input type="number" className="form-control" id="inputEdad" placeholder="Edad"/>
                </div>
                <div className="form-group col-md-6">
                <label for="inputProfesion">Profesion</label>
                <input type="text" className="form-control" id="inputProfesion" placeholder="Profesion"/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>{CREATE()}}>Create</button>
            {"  "}
            <button type="submit" className="btn btn-success" onClick={()=>{navigate('/')}}>Back</button>
        </form>
    );
}
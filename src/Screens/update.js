import React from "react";
import { UpdateUser } from "../API/data";
import { GenericModal } from "../components/SweetAlert";
import { useNavigate, useLocation } from "react-router-dom";

export default function Update() {
    const location = useLocation();
    const navigate = useNavigate()
    const [profesion, setProfesion] = React.useState(location.state.profesion || '');

    const handleProfesionChange = (e) => {
        setProfesion(e.target.value);
      };
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que la página se recargue al enviar el formulario
      };
    const UPDATE = async () =>{
        const documento = document.getElementById("inputDocumento").value
        const profesion = document.getElementById("inputProfesion").value

        if(!documento || !profesion) {
            GenericModal('error', 'Todos los campos son obligatorios', 'aceptar', false, false)
            return
        }
        if(documento !== location.state.documento){
            GenericModal('error', 'El documento no puede ser cambiado', 'aceptar', false, false)
            return 
        }
        const result = await GenericModal('warning', '¿Estas seguro de querer Actualizar este elemento?', 'Actualizar', true, true)
        
        if(result){
            await UpdateUser(documento, profesion).then((response)=>{
                if(response.statusCode === 200){
                    GenericModal('success', response.message, 'aceptar', false, false).
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
                <input  className="form-control" id="inputDocumento" placeholder="documento" readOnly value={location.state.documento}/>
                </div>

                <div className="form-group col-md-6">
                <label for="inputProfesion">Profesion</label>
                <input type="text" className="form-control" id="inputProfesion" placeholder="Profesion" value={profesion} onChange={handleProfesionChange}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>{UPDATE()}}>Create</button>
            <button type="submit" className="btn btn-success" onClick={()=>{navigate('/')}}>Back</button>
            </form>
    );
}
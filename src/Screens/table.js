import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { GetData, DeleteUser } from "../API/data";
import { GenericModal } from "../components/SweetAlert";




export default function Table() {
    const navigate = useNavigate()
    const [data, setData] = React.useState([])
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await GetData()
            setData(response)
        }
        fetchData()
    },[])

    const DeleteElement = async (documento) => {
        var result = await GenericModal('question', '¿Estas seguro de querer borrar este elemento?', 'borrar', true, true)
        if(result){
            await DeleteUser(documento).then((response)=>{
                if(response.statusCode === 200){
                    const fetchData = async()=>{
                        const response = await GetData()
                        setData(response)
                    }
                    fetchData()
                    GenericModal('success', 'Elemento borrado', 'Aceptar', false, false)
                }
            })
            
        }
    }
    return (
            
           <table className="table table-hover ">
               <thead className="table-dark">
               <tr>
                    <th scope="col">#</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Profesion</th>
                    <th scope="col">Acciones</th>
               </tr>
               </thead>
               <tbody>
               {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={item.documento}>
                        <td>{index + 1}</td>
                        <td>{item.documento}</td>
                        <td>{item.nombre}</td>
                        <td>{item.edad}</td>
                        <td>{item.profesion}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => navigate('/update', {state: {documento: item.documento, profesion: item.profesion}})}>
                            Editar
                            </button>{" "}
                            <button className="btn btn-danger" onClick={() => DeleteElement(item.documento)}>
                            Eliminar
                            </button>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="6">No hay datos disponibles</td>
                    </tr>
                    )}

               </tbody>
               <tfoot>
                   <button className="btn btn-secondary" onClick={() => navigate('/create')}>Agregar Usuario</button>
               </tfoot>
           </table>
    )
}
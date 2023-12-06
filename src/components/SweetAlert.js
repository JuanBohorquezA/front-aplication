import Swal from 'sweetalert2';

export const GenericModal = async (icon, title, accion, mostrarCancelar, mostrarTexto) => {
    const result = await Swal.fire({
         title: title,
         text: mostrarTexto ? 'Esta accion no se puede deshacer' : '',
         icon: icon,
         showCancelButton: mostrarCancelar,
         confirmButtonText: `${accion}`,
         cancelButtonText: 'Cancelar',
       })
     return result.value;
}
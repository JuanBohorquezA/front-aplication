export const GetData = async () => {
    try{
        const response = await fetch('https://localhost:7236/API/User/GetUsers');
        const data = await response.json();
        return data.data;
    }catch(err){
        console.log(err)
    }
}
export const CreateUser = async (documento, nombre, edad, profesion) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        "documento": documento,
        "nombre": nombre,
        "edad": edad,
        "profesion": profesion
      });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      const response = await fetch("https://localhost:7236/API/User/CreateUser", requestOptions);

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(`Error en CreateUser: ${err.message}`);
    }
  };
  
export const UpdateUser = async (documento, profesion)=>{
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "documento": documento,
            "profesion": profesion
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("https://localhost:7236/API/User/UpdateUser", requestOptions);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(`Error en CreateUser: ${err.message}`);
    }
};
export const DeleteUser = async (documento)=>{
    try{
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
        const response = await fetch(`https://localhost:7236/API/User/DeleteUser?documento=${documento}`, requestOptions)
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err)
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const form = document.getElementById("formulario-tareas");
    const InputTask = document.getElementById("tareaInput");
    const TaskList = document.getElementById("taskList");
    const respuesta = document.getElementById("respuesta");

    const mostrarTareas = async()=>{
        TaskList.innerHTML="";
        const resp = await fetch("https://api-topicos.onrender.com/");
        const datos = await resp.json();

        datos.map((tarea)=>{
            const nuevaTarea = document.createElement("li");
            nuevaTarea.className = "container-Task--List_item";
            nuevaTarea.textContent = tarea.tarea;
            TaskList.appendChild(nuevaTarea)
        });
    }
    const eventoFormulario = async (e)=>{
            e.preventDefault();
            const valorTarea = InputTask.value.trim();
            const respuestaFetch = await fetch("https://api-topicos.onrender.com/",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({tarea:valorTarea})
            });

            const datos = await respuestaFetch.json();

            if(respuestaFetch.status==200){
                respuesta.className = "respuesta-ok"            
            }else{
                respuesta.className = "respuesta-error"            
            }
            
            respuesta.textContent= datos.message

            mostrarTareas();
    }
    form.addEventListener("submit",eventoFormulario)
})
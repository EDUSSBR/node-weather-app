console.log("Loaded");


    const formulario = document.querySelector("form");
    const search = document.querySelector("input");
    const resultadoErro = document.querySelector("#error");
    const resultadoResp = document.querySelector("#resp");
    formulario.addEventListener("submit", (e)=>{
        e.preventDefault() 
        resultadoErro.textContent = "Loading...";
        resultadoResp.textContent = "";
        const cidade = search.value   
    
        fetch(`/weather?localizacao=${cidade}`)
        .then((resp)=>resp.json())
        .then((data)=> {
            if(data.error){
                resultadoErro.textContent = data.error;
            } else {
                resultadoErro.textContent = "";
                resultadoResp.textContent = data.weatherDados;
            } 
        })                
    })

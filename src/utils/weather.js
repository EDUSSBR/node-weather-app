const request = require("postman-request");

const weather = (latitude, longitude , cidade, callback)=> {

    const url = `http://api.weatherstack.com/current?access_key=21f26cfb2699bbfe59eee4eb1751e45e&query=${latitude},${longitude}`
    request({url, json: true},(error,{body} = {})=>{
        if(error){
            callback("Problema com sua conexão", undefined);
        } else if (body.location.error){
            callback("Não foi possível encontrar essa localização", undefined)
        } else {
            callback(undefined, `Você está em ${body.location.name} e agora a temperatura é ${body.current.temperature} Celsius`)
        }
    })
}
module.exports = weather;
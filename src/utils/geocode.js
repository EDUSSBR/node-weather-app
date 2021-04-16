const request = require("postman-request");

const geocode = (adress, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoiYmxzZHVkdSIsImEiOiJja25lc3hoeTIwNnRvMm5vNnZmdGVvd3NiIn0.7WMmoMFTJAFO02QtizySZw`;
    request({url, json: true}, (error,{body}= {})=>{
        if(error){
            callback("Ocorreu um problema com sua conexão.", undefined)
        } else if (body.features.length===0) {
            callback("Por favor, defina uma localização existente.", undefined)
        } else{ 
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                localizacao:body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;
var loterias = require('./../loterias')
var path = require('path');

let diretorioTemporario = path.join('temp', 'tempFiles');

var resultados = [];

listarLoterias = function(array){
    resultados.push(array);
    if(resultados.length == 2){
        console.log(resultados);
    }
}

loterias.megasenaJson(diretorioTemporario)
    .then((jsonArray)=>{
        listarLoterias(jsonArray);
    }).catch((err)=>{
        console.debug(err);
    })

loterias.lotofacilJson(diretorioTemporario)
    .then((jsonArray)=>{
        listarLoterias(jsonArray);
    }).catch((err)=>{
        console.debug(err);
    })


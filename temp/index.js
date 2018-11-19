const restify = require('restify');
const loterias = require('./../loterias')
const path = require('path');

const server = restify.createServer();

let diretorioTemporario = path.join('temp', 'tempFiles');

server.get('/ultimosresultados', (req, res) => {
    getUltimosResultadosLoterias(res);
});

server.listen(3000, () => {
    
});

listarUltimosResultadosLoterias = function(res, resultados){
    if(resultados.length == 4){
        resultados.sort(function(a, b){return a.CodigoLoteria - b.CodigoLoteria});
        res.send(resultados);
    }
}

getUltimosResultadosLoterias = function(res){
    var resultados = [];

    loterias.megasenaJson(diretorioTemporario)
        .then((jsonArray)=>{
            resultados.push(jsonArray);
            listarUltimosResultadosLoterias(res, resultados);
        }).catch((err)=>{
            console.debug(err);
        })

    loterias.lotofacilJson(diretorioTemporario)
        .then((jsonArray)=>{
            resultados.push(jsonArray);
            listarUltimosResultadosLoterias(res, resultados);
        }).catch((err)=>{
            console.debug(err);
        })

    loterias.quinaJson(diretorioTemporario)
        .then((jsonArray)=>{
            resultados.push(jsonArray);
            listarUltimosResultadosLoterias(res, resultados);
        }).catch((err)=>{
            console.debug(err);
        })

    loterias.lotomaniaJson(diretorioTemporario)
        .then((jsonArray)=>{
            resultados.push(jsonArray);
            listarUltimosResultadosLoterias(res, resultados);
        }).catch((err)=>{
            console.debug(err);
        })
    
}


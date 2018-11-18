const restify = require('restify');
const loterias = require('./../loterias')
const path = require('path');

const server = restify.createServer();

let diretorioTemporario = path.join('temp', 'tempFiles');

server.get('/ultimosresultados', (req, res) => {
    getUltimosResultadosLoterias(res);
});

server.listen(3000, () => {
    console.log("Servidor em pé");
});

listarUltimosResultadosLoterias = function(res, resultados){
    if(resultados.length == 2){
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
    
}


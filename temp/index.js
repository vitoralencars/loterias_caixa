const restify = require('restify');
const loterias = require('./../loterias')
const path = require('path');

const server = restify.createServer();

let diretorioTemporario = path.join('temp', 'tempFiles');

server.get('/ultimosresultados', (req, res) => {
    getUltimosResultadosLoterias(res);
});

server.get('/loteria/:idloteria/:concurso', (req, res) => {
    getResultadosLoteria(res, parseInt(req.params.idloteria), parseInt(req.params.concurso));
});

server.listen(3000, () => {
    
});

listarUltimosResultadosLoterias = function(res, resultados){
    if(resultados.length == 4){
        resultados.sort(function(a, b){return a.CodigoLoteria - b.CodigoLoteria});
        res.send(resultados);
    }
}

getResultadoConcurso = function(res, resultado){
    res.send(resultado);
}

getUltimosResultadosLoterias = function(res){
    var resultados = [];

    loterias.megasenaJson(diretorioTemporario, -1)
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

    loterias.quinaJson(diretorioTemporario, -1)
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

getResultadosLoteria = function(res, loteria, concurso){
    switch(loteria){
        case 1:
            loterias.megasenaJson(diretorioTemporario, concurso)
                .then((jsonArray)=>{
                    getResultadoConcurso(res, jsonArray);
                }).catch((err)=>{
                    console.debug(err);
                })
            break;
        case 2:
            loterias.lotofacilJson(diretorioTemporario, concurso)
                .then((jsonArray)=>{
                    getResultadoConcurso(res, jsonArray);
                }).catch((err)=>{
                    console.debug(err);
                })
            break;
        case 3:
            loterias.quinaJson(diretorioTemporario, concurso)
                .then((jsonArray)=>{
                    getResultadoConcurso(res, jsonArray);
                }).catch((err)=>{
                    console.debug(err);
                })
            break;
        case 4:
            loterias.lotomaniaJson(diretorioTemporario, concurso)
                .then((jsonArray)=>{
                    getResultadoConcurso(res, jsonArray);
                }).catch((err)=>{
                    console.debug(err);
                })
            break;    
    }
}
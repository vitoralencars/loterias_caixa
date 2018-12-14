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

server.get('/timemania/timescoracao', (req, res) => {
    getTimesTimemania(res);
});

server.listen(3000, () => {
    
});

listarUltimosResultadosLoterias = function(res, resultados){
    if(resultados.length == 5){
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

    loterias.lotofacilJson(diretorioTemporario, -1)
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

    loterias.lotomaniaJson(diretorioTemporario, -1)
        .then((jsonArray)=>{
            resultados.push(jsonArray);
            listarUltimosResultadosLoterias(res, resultados);
        }).catch((err)=>{
            console.debug(err);
        })

    loterias.timemaniaJson(diretorioTemporario, -1)
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
        case 5:
            loterias.timemaniaJson(diretorioTemporario, concurso)
                .then((jsonArray)=>{
                    getResultadoConcurso(res, jsonArray);
                }).catch((err)=>{
                    console.debug(err);
                })
            break;    
    }
}

getTimesTimemania = function(res){
    var times = ["ABC/RN", "AMÉRICA/MG", "AMÉRICA/RJ", "AMÉRICA/RN", "AMERICANO/RJ", "ATLÉTICO/GO", "ATLÉTICO/MG", "ATLÉTICO/PR", "AVAÍ/SC", "BAHIA/BA", 
    "BANGU/RJ", "BARUERI/SP", "BOTAFOGO/PB", "BOTAFOGO/RJ", "BRAGANTINO/SP", "BRASILIENSE/DF", "CEARÁ/CE", "CORINTHIANS/SP", "CORITIBA/PR", "CRB/AL", 
    "CRICIÚMA/SC", "CRUZEIRO/MG", "CSA/AL", "DESPORTIVA/ES", "FUIGUEIRENSE/SC", "FLAMENGO/RJ", "FLUMINENSE/RJ", "FORTALEZA/CE", "GAMA/DF", "GOIÁS/GO", 
    "GRÊMIO/RS", "GUARANI/SP", "INTER DE LIMEIRA/SP", "INTERNACIONAL/RS", "IPATINGA/MG", "ITUANO/SP", "JI-PARANÁ/PR", "JOINVILLE/SC", "JUVENTUDE/RS", "JUVENTUS/SP", 
    "LONDRINA/PR", "MARÍLIA/SP", "MIXTO/MT", "MOTO CLUBE/MA", "NACIONAL/AM", "NÁUTICO/PE", "OLARIA/RJ", "OPERÁRIO/PR", "PALMAS/TO", "PALMEIRAS/SP", 
    "PARANÁ/PR", "PAULISTA/SP", "PAYSANDU/PA", "PONTE PRETA/SP", "PORT. DE DESPORTOS/SP", "REMO/PA", "RIO BRANCO/AC", "RIO BRANCO/ES", "RIVER/PI", "RORAIMA/RR", 
    "SAMPAIO CORRÊA/MA", "SANTA CRUZ/PE", "SANTO ANDRÉ/SP", "SANTOS/SP", "SÃO CAETANO/SP", "SÃO PAULO/SP", "SÃO RAIMUNDO/AM", "SERGIPE/SE", "SPORT/PE", "TREZE/PB", 
    "TUNA LUSO/PA", "UBERLÂNDIA/MG", "UNIÃO BARBARENSE/SP", "UNIÃO SÃO JOÃO/SP", "VASCO DA GAMA/RJ", "VILA NOVA/GO", "VILLA NOVA/MG", "VITÓRIA/BA", "XV DE PIRACICABA/SP", "YPIRANGA/AP"];
    
    res.send(times);
}
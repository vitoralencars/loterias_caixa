var downloader = require('./../util/downloader');
var request = require('request');

exports.downloadResultadosLoteria = function(folder, url, indicadorLoteria, htm) {
    return downloader.downloadResultados(folder, url, indicadorLoteria, htm);
}

exports.htmlToJson = function(htmlFile, concurso) {
    //  Informa que irá processar o arquivo e o caminho dele
    //console.log("... Convertendo arquivo HTML em JSON. Arquivo:", htmlFile);
    let cheerio = require('cheerio');
  
    // Cria a Promise
    return new Promise(function(resolve, reject) {
  
        // Processa o  arquivo
        fs = require('fs');
        fs.readFile(htmlFile, 'latin1', function(err, html) {
  
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
  
        const $ = cheerio.load(html);

        function getText(element) {
          if (element) {
            if ($(element).text()) {
              return $(element).text().trim();
            }
          }
          return undefined;
        }

        function getDate(data){
          var splitData = data.split('/');
          return new Date(splitData[2], splitData[1] - 1, splitData[0]);
        }
  
        let trs = $('tr');        

        var sorteio = {};
        var cidades = [];
        var estados = [];
        var ultimoIndex = 0;
        var indexLocais = 0;

        trs.each(function(index, element){
            
          var tds = $(this).find('td');

          if(tds && tds.length > 2){
              ultimoIndex = index;
              indexLocais = index + 1;
          }

        });
  
        trs.each(function(index, element) {
  
            var tds = $(this).find('td');

            if (tds && tds.length > 0 && ((concurso === -1 && ultimoIndex === index) || concurso === downloader.parseToInt(getText(tds[0])))) {
                
                var numDezenas = 5;           
                var dezenas = [];
                var ganhadores = [];
                var rateio = [];
                
                sorteio.CodigoLoteria = 3;
                sorteio.NomeLoteria = "Quina";
                sorteio.CorPadrao = "#434375";
                sorteio.QtdMinimaDezenasAposta = 5;
                sorteio.QtdMaximaDezenasAposta = 15;
                sorteio.QtdDezenasTotal = 80;
                sorteio.Concurso = downloader.parseToInt(getText(tds[0]));
                sorteio.DataSorteio = getDate(getText(tds[1]));
                var i;
                for(i = 2; i < numDezenas + 2; i++){  
                    dezenas.push(downloader.parseToInt(getText(tds[i])));
                }
                sorteio.Dezenas = dezenas;
                sorteio.ArrecadacaoTotal = downloader.parseToFloat(getText(tds[i]));
                cidades.push(getText(tds[i + 2]));
                estados.push(getText(tds[i + 3]));
                
                ganhadores.push(downloader.parseToInt(getText(tds[i + 1])));
                ganhadores.push(downloader.parseToInt(getText(tds[i + 5])));
                ganhadores.push(downloader.parseToInt(getText(tds[i + 7])));
                ganhadores.push(downloader.parseToInt(getText(tds[i + 9])));
                sorteio.Ganhadores = ganhadores;

                rateio.push(downloader.parseToFloat(getText(tds[i + 4])));
                rateio.push(downloader.parseToFloat(getText(tds[i + 6])));
                rateio.push(downloader.parseToFloat(getText(tds[i + 8])));
                rateio.push(downloader.parseToFloat(getText(tds[i + 10])));
                sorteio.Rateio = rateio;
                
                sorteio.ValorAcumulado = downloader.parseToFloat(getText(tds[i + 12]));
                sorteio.EstimativaPremio = downloader.parseToFloat(getText(tds[i + 13]));
                sorteio.AcumuladoSaoJoao = downloader.parseToFloat(getText(tds[i + 14]));    

                if(tds && indexLocais === index){
                    cidades.push(getText(tds[0]));
                    estados.push(getText(tds[1]));
    
                    indexLocais ++;
                } 
            }   
            
        });

        sorteio.Cidades = cidades;
        sorteio.Estados = estados;
        
        request.get("https://www.lotodicas.com.br/api/quina", (error, response, body) => {
          if(error) {
            sorteio.ProximoSorteio = null;
          }else{
            auxData = JSON.parse(body).proximo_data.split('-');
            dataProximoSorteio = auxData[2] + "/" + auxData[1] + "/" + auxData[0];

            sorteio.ProximoSorteio = getDate(dataProximoSorteio);
          }

          resolve(sorteio);
        });
      });
    });
  }
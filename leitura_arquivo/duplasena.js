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
            
            var numDezenas = 6;    
            var dezenas = [];
            var ganhadores = [];
            var rateio = [];
            
            sorteio.CodigoLoteria = 6;
            sorteio.NomeLoteria = "Dupla Sena";
            sorteio.CorPadrao = "#911531";
            sorteio.CorSecundaria = "#FFFFFF";
            sorteio.QtdMinimaDezenasAposta = 6;
            sorteio.QtdMaximaDezenasAposta = 15;
            sorteio.QtdDezenasTotal = 50;
            sorteio.Concurso = downloader.parseToInt(getText(tds[0]));
            sorteio.DataSorteio = getDate(getText(tds[1]));
            var i;
            for(i = 2; i < numDezenas + 2; i++){  
                dezenas.push(downloader.parseToInt(getText(tds[i])));
            }
            sorteio.DezenasPrimeiroSorteio = dezenas;
            dezenas = [];

            sorteio.ArrecadacaoTotal = downloader.parseToFloat(getText(tds[i]));
            cidades.push(getText(tds[i + 2]));
            estados.push(getText(tds[i + 3]));

            ganhadores.push(downloader.parseToInt(getText(tds[i + 1])));
            ganhadores.push(downloader.parseToInt(getText(tds[i + 7])));
            ganhadores.push(downloader.parseToInt(getText(tds[i + 9])));
            ganhadores.push(downloader.parseToInt(getText(tds[i + 11])));
            sorteio.GanhadoresPrimeiroSorteio = ganhadores;
            ganhadores = [];

            rateio.push(downloader.parseToFloat(getText(tds[i + 4])));
            rateio.push(downloader.parseToFloat(getText(tds[i + 8])));
            rateio.push(downloader.parseToFloat(getText(tds[i + 10])));
            rateio.push(downloader.parseToFloat(getText(tds[i + 12])));
            sorteio.RateioPrimeiroSorteio = rateio;
            rateio = [];
          
            var k;
            for(k = i + 13; k < numDezenas + i + 13; k++){
                dezenas.push(downloader.parseToInt(getText(tds[k])));  
            }
            sorteio.DezenasSegundoSorteio = dezenas;

            ganhadores.push(downloader.parseToInt(getText(tds[k])));
            ganhadores.push(downloader.parseToInt(getText(tds[k + 2])));
            ganhadores.push(downloader.parseToInt(getText(tds[k + 4])));
            ganhadores.push(downloader.parseToInt(getText(tds[k + 6])));
            sorteio.GanhadoresSegundoSorteio = ganhadores;

            rateio.push(downloader.parseToFloat(getText(tds[k + 1])));
            rateio.push(downloader.parseToFloat(getText(tds[k + 3])));
            rateio.push(downloader.parseToFloat(getText(tds[k + 5])));
            rateio.push(downloader.parseToFloat(getText(tds[k + 7])));
            sorteio.RateioSegundoSorteio = rateio;

            sorteio.ValorAcumulado = downloader.parseToFloat(getText(tds[i + 6]));
            sorteio.EstimativaPremio = downloader.parseToFloat(getText(tds[k + 8]));
            sorteio.AcumuladoPascoa = downloader.parseToFloat(getText(tds[k + 9]));
            
            indexLocais = index;
          }

          if(tds && index === indexLocais + 1 && tds.length <= 2){
            cidades.push(getText(tds[0]));
            estados.push(getText(tds[1]));

            indexLocais ++;
          }  
        });

        sorteio.Cidades = cidades;
        sorteio.Estados = estados;

        request.get("https://www.lotodicas.com.br/api/dupla-sena", (error, response, body) => {
          if(error) {
            sorteio.ProximoSorteio = null;
          }else{
            auxData = JSON.parse(body).proximo_data.split('-');
            dataProximoSorteio = auxData[2] + "/" + auxData[1] + "/" + auxData[0];

            sorteio.ProximoSorteio = getDate(dataProximoSorteio);
          }

          resolve(sorteio);
          return false;
        });
      });
    });
  }
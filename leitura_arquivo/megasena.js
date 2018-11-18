var downloader = require('./../util/downloader');

exports.downloadResultadosLoteria = function(folder, url, indicadorLoteria, htm) {
    return downloader.downloadResultados(folder, url, indicadorLoteria, htm);
}

exports.htmlToJson = function(htmlFile) {
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

          if(tds.length > 2){
              ultimoIndex = index;
              indexLocais = index + 1;
          }

        });
  
        trs.each(function(index, element) {
  
          if (ultimoIndex === index) {

            var tds = $(this).find('td');
            var numDezenas = 6;
          
            if (tds && tds.length > 0) {            
              var dezenas = [];
              var ganhadores = [];
              var rateio = [];
              
              sorteio.CodigoLoteria = 1;
              sorteio.NomeLoteria = "Mega-Sena";
              sorteio.CorPadrao = "#3B815F";
              sorteio.QtdDezenasTotal = 60;
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
              sorteio.Ganhadores = ganhadores;

              rateio.push(downloader.parseToFloat(getText(tds[i + 4])));
              rateio.push(downloader.parseToFloat(getText(tds[i + 6])));
              rateio.push(downloader.parseToFloat(getText(tds[i + 8])));
              sorteio.Rateio = rateio;
            
              sorteio.ValorAcumulado = downloader.parseToFloat(getText(tds[i + 10]));
              sorteio.EstimativaPremio = downloader.parseToFloat(getText(tds[i + 11]));
              sorteio.AcumuladoMegadaVirada = downloader.parseToFloat(getText(tds[i + 12]));    
            }

            if(tds && indexLocais === index){
              cidades.push(getText(tds[0]));
              estados.push(getText(tds[1]));

              indexLocais ++;
            }    
          }
        });

        sorteio.Cidades = cidades;
        sorteio.Estados = estados;
        
        resolve(sorteio);
      });
    });
  }
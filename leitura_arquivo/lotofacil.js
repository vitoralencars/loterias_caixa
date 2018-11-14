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
  
            var tds = $(this).find('td');

            if (ultimoIndex === index) {

                var numDezenas = 15;
                
                if (tds) {
                    var dezenas = [];
                    var ganhadores = [];
                    var rateio = [];
                    
                    sorteio.NomeLoteria = "Lotofácil";
                    sorteio.CorPadrao = "#A50662";
                    sorteio.QtdDezenasTotal = 25;
                    sorteio.Concurso = downloader.parseToInt(getText(tds[0]));
                    sorteio.DataSorteio = getText(tds[1]);
                    var i;
                    for(i = 2; i < numDezenas + 2; i++){  
                        dezenas.push(downloader.parseToInt(getText(tds[i])));
                    }
                    sorteio.Dezenas = dezenas;
                    sorteio.ArrecadacaoTotal = downloader.parseToFloat(getText(tds[i]));
                    cidades.push(getText(tds[i + 2]));
                    estados.push(getText(tds[i + 3]));
                    
                    ganhadores.push(downloader.parseToInt(getText(tds[i + 1])));
                    ganhadores.push(downloader.parseToInt(getText(tds[i + 4])));
                    ganhadores.push(downloader.parseToInt(getText(tds[i + 5])));
                    ganhadores.push(downloader.parseToInt(getText(tds[i + 6])));
                    ganhadores.push(downloader.parseToInt(getText(tds[i + 7])));
                    sorteio.Ganhadores = ganhadores;

                    rateio.push(downloader.parseToFloat(getText(tds[i + 8])));
                    rateio.push(downloader.parseToFloat(getText(tds[i + 9])));
                    rateio.push(downloader.parseToFloat(getText(tds[i + 10])));
                    rateio.push(downloader.parseToFloat(getText(tds[i + 11])));
                    rateio.push(downloader.parseToFloat(getText(tds[i + 12])));
                    sorteio.Rateio = rateio;
                    
                    sorteio.ValorAcumulado = downloader.parseToFloat(getText(tds[i + 13]));
                    sorteio.EstimativaPremio = downloader.parseToFloat(getText(tds[i + 14]));
                    sorteio.AcumuladoEspecial = downloader.parseToFloat(getText(tds[i + 15]));
                }

            }

            if(tds && indexLocais === index){
                cidades.push(getText(tds[0]));
                estados.push(getText(tds[1]));

                indexLocais ++;
            }        
        
        });

        sorteio.Cidades = cidades;
        sorteio.Estados = estados;

        resolve(sorteio);
      });
    });
  }
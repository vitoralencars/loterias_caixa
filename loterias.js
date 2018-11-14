var path = require('path');

exports.megasenaJson = function(tempDirectory) {
  let megaSena = require('./leitura_arquivo/megasena');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_megase.zip';

  return megaSena.downloadResultadosLoteria(path.normalize(tempDirectory), url, 'D_megase', 'D_MEGA.HTM')
    .then(function(nomeArquivoComResultados) {
      return megaSena.htmlToJson(nomeArquivoComResultados);
    });
};

exports.lotofacilJson = function(tempDirectory) {
  let lotofacil = require('./leitura_arquivo/lotofacil');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_lotfac.zip';

  return lotofacil.downloadResultadosLoteria(path.normalize(tempDirectory), url, 'D_lotfac', 'D_LOTFAC.HTM')
    .then(function(nomeArquivoComResultados) {
      return lotofacil.htmlToJson(nomeArquivoComResultados);
    });
};
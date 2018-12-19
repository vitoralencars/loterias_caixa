var path = require('path');

exports.megasenaJson = function(tempDirectory, concurso) {
  let megaSena = require('./leitura_arquivo/megasena');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_megase.zip';

  return megaSena.downloadResultadosLoteria(path.normalize(tempDirectory), url, 'D_megase', 'D_MEGA.HTM')
    .then(function(nomeArquivoComResultados) {
      return megaSena.htmlToJson(nomeArquivoComResultados, concurso);
    });
};

exports.lotofacilJson = function(tempDirectory, concurso) {
  let lotofacil = require('./leitura_arquivo/lotofacil');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_lotfac.zip';

  return lotofacil.downloadResultadosLoteria(path.normalize(tempDirectory), url, 'D_lotfac', 'D_LOTFAC.HTM')
    .then(function(nomeArquivoComResultados) {
      return lotofacil.htmlToJson(nomeArquivoComResultados, concurso);
    });
};

exports.quinaJson = function(tempDirectory, concurso) {
  let quina = require('./leitura_arquivo/quina');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_quina.zip';

  return quina.downloadResultadosLoteria(path.normalize(tempDirectory), url, 'D_quina', 'D_QUINA.HTM')
    .then(function(nomeArquivoComResultados) {
      return quina.htmlToJson(nomeArquivoComResultados, concurso);
    });
};

exports.lotomaniaJson = function(tempDirectory, concurso) {
  let lotomania = require('./leitura_arquivo/lotomania');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_lotoma.zip';

  return lotomania.downloadResultadosLoteria(path.normalize(tempDirectory), url, 'D_lotoma', 'D_LOTMAN.HTM')
    .then(function(nomeArquivoComResultados) {
      return lotomania.htmlToJson(nomeArquivoComResultados, concurso);
    });
};

exports.timemaniaJson = function(tempDirectory, concurso) {
  let timemania = require('./leitura_arquivo/timemania');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_timema.zip';

  return timemania.downloadResultadosLoteria(path.normalize(tempDirectory), url, 'D_timema', 'D_TIMEMA.HTM')
    .then(function(nomeArquivoComResultados) {
      return timemania.htmlToJson(nomeArquivoComResultados, concurso);
    });
};

exports.duplasenaJson = function(tempDirectory, concurso) {
  let duplasena = require('./leitura_arquivo/duplasena');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/d_dplsen.zip';

  return duplasena.downloadResultadosLoteria(path.normalize(tempDirectory), url, 'D_dplsen', 'D_DPLSEN.HTM')
    .then(function(nomeArquivoComResultados) {
      return duplasena.htmlToJson(nomeArquivoComResultados, concurso);
    });
};
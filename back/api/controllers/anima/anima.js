module.exports = app => {
    const controller = {};

    controller.inserirInscricao = function (req, res) {
        db.MongoClient.connect(db.url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('desafio');
            let dto = {
                idinscricao: Token.genGuid(),
                name: req.body.nome,
                phone: req.body.fone,
                aceitoLGPD: req.body.aceitolgpd,
                otherResults: req.body.otherResults,
                // perguntasSelecionadas: req.body.pgts,
                // respondidas: req.body.respondidas,
                acertos: req.body.acertos,
                perfil: req.body.perfil,
                maiorTipo: req.body.maiorTipo,
                maiorValor: req.body.maiorValor,
                pontos: {
                    Rock: req.body.pontos.Rock,
                    Lofi: req.body.pontos.Lofi,
                    Sertanejo: req.body.pontos.Sertanejo,
                    Eletronica: req.body.pontos.Eletronica,
                    Pop: req.body.pontos.Pop,
                    Funk: req.body.pontos.Funk,
                    Pagode: req.body.pontos.Pagode,
                    Rap: req.body.pontos.Rap
                }
            };



            dbo.collection('inscricao').insertOne(dto, function (error, response) {
                if (error) response.error = error;

                res.status(200).json(response);
            });

        })
    };

    controller.listarInscricao = function (req, res) {
        db.MongoClient.connect(db.url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('desafio');

            let projection = {
                idinscricao: 1,
                name: 1,
                phone: 1,
                aceitoLGPD: 1,
                otherResults: 1,
                perguntasSelecionadas: 1,
                respondidas: 1,
                acertos: 1,
                pontos: 1
            };

            let query = {};

            dbo.collection('inscricao').find(query, { projection: projection }).toArray(function (err, response) {
                if (err) throw err;

                res.status(200).json(response);

                db.close();
            });

        });
    };

    return controller;
}
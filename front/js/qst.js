let Qst = {

    pontos: {
        rock: 0,
        lofi: 0,
        sertanejo: 0,
        eletronic: 0,
        pop: 0,
        funk: 0,
        pagode: 0,
        rap: 0
    },

    perguntas: [{
        id: 123,
        desc: 'O que você mais gosto de fazer nos finais de semana?',
        respostas: [{
            desc: 'Ficar de boa',
            pesos: {
                rock: 2,
                lofi: 3,
                sertanejo: 1,
                eletronic: 0,
                pop: 1,
                funk: 0,
                pagode: 2,
                rap: 0
            }
        }, {
            desc: 'Virar a noite jogando',
            pesos: {
                rock: 1,
                lofi: 2,
                sertanejo: 0,
                eletronic: 3,
                pop: 0,
                funk: 0,
                pagode: 0,
                rap: 0
            }
        }, {
            desc: 'Sair com os meus amigos',
            pesos: {
                rock: 0,
                lofi: 0,
                sertanejo: 4,
                eletronic: 2,
                pop: 2,
                funk: 5,
                pagode: 3,
                rap: 3
            }
        }, {
            desc: 'Meto aquele treino',
            pesos: {
                rock: 0,
                lofi: 0,
                sertanejo: 0,
                eletronic: 2,
                pop: 2,
                funk: 0,
                pagode: 1,
                rap: 2
            }
        }]
    }, {
        id: 124,
        desc: 'Se alguém furasse alguma fila na minha frente eu iria...',
        respostas: [{
            desc: 'Cair no soco',
            pesos: {
                rock: 5,
                lofi: 0,
                sertanejo: 1,
                eletronic: 0,
                pop: 0,
                funk: 2,
                pagode: 0,
                rap: 4
            }
        }, {
            desc: 'Xingar mentalmente',
            pesos: {
                rock: 1,
                lofi: 2,
                sertanejo: 0,
                eletronic: 3,
                pop: 0,
                funk: 0,
                pagode: 0,
                rap: 0
            }
        }, {
            desc: 'Xingar na cara da pessoa',
            pesos: {
                rock: 0,
                lofi: 0,
                sertanejo: 4,
                eletronic: 2,
                pop: 2,
                funk: 5,
                pagode: 3,
                rap: 3
            }
        }, {
            desc: 'Nem ligar',
            pesos: {
                rock: 0,
                lofi: 0,
                sertanejo: 0,
                eletronic: 2,
                pop: 2,
                funk: 0,
                pagode: 1,
                rap: 2
            }
        }]
    }],

    renderPoints: function () {
        let html = '';

        html += `
            <div>${JSON.stringify(this.pontos)}</div>
        `;

        document.getElementById('renderPoints').innerHTML = html;
    },

    addPoint: function (rock, lofi, sertanejo, eletronic, pop, funk, pagode, rap) {        

        this.pontos.rock += rock;
        this.pontos.lofi += lofi;
        this.pontos.sertanejo += sertanejo;
        this.pontos.eletronic += eletronic;
        this.pontos.pop += pop;
        this.pontos.funk += funk;
        this.pontos.pagode += pagode;
        this.pontos.rap += rap;

        this.renderPoints();
    },

    renderQST: function (pergunta) {
        let html = `
            <div style="text-align:center">
                <span>${pergunta.desc}</span>
                <br>
                <div id="respostas${pergunta.id}">
        `;

        for (let index = 0; index < pergunta.respostas.length; index++) {
            const resposta = pergunta.respostas[index];
            
            html += `
                <button onclick="Qst.addPoint(
                    ${resposta.pesos.rock},
                    ${resposta.pesos.lofi},
                    ${resposta.pesos.sertanejo},
                    ${resposta.pesos.eletronic},
                    ${resposta.pesos.pop},
                    ${resposta.pesos.funk},
                    ${resposta.pesos.pagode},
                    ${resposta.pesos.rap},
                    )" id="${resposta.id}" type="radio" name="${pergunta.id}">
                <span>${resposta.desc}</span>
                </button><br>
            `;
        }

        html += `
                </div>
            </div>
        `;

        document.getElementById('renderPerguntas').innerHTML = html;
    }


};
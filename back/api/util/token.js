Token = {

    Asc: function (String) {
        return String.charCodeAt(0);
    },

    Chr: function (AsciiNum) {
        return String.fromCharCode(AsciiNum);
    },
    
    genGuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            },
        );
    },

    montarToken: function (username, password, _cb) {
        var mensx = '',
            l,
            i,
            j = 0,
            ch,
            dados =
                this.genGuid() +
                '-/-/-' +
                password +
                '-/-/-' +
                this.genGuid() +
                '-/-/-' +
                username +
                '-/-/-' +
                this.genGuid();

        ch = 'assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm--;//$#';
        for (i = 0; i < dados.length; i++) {
            j++;
            l = this.Asc(dados.substr(i, 1)) + this.Asc(ch.substr(j, 1));
            if (j == 50) {
                j = 1;
            }
            if (l > 255) {
                l -= 256;
            }
            mensx += this.Chr(l);
        }

        return _cb(mensx);
    },

    desmontarToken: function (token, _cb) {
        var mensx = '',
            l,
            i,
            j = 0,
            ch,
            dados,
            username,
            password;

        ch = 'assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm--;//$#';
        for (i = 0; i < token.length; i++) {
            j++;
            l = this.Asc(token.substr(i, 1)) - this.Asc(ch.substr(j, 1));
            if (j == 50) {
                j = 1;
            }
            if (l < 0) {
                l += 256;
            }
            mensx += this.Chr(l);
        }

        dados = mensx.split('-/-/-');
        username = dados[3];
        password = dados[1];

        return _cb(username, password);
    },

    validaToken: function (token, listaUsuarios,_cb) {
        let me = this;

        if (!token)
            return _cb(false);

        me.desmontarToken(token, (username, password)=>{
            me.recuperarUsuario(username, listaUsuarios, (usuario)=>{
                return _cb(usuario.senha == password, usuario);
            });
        });
    },

    recuperarUsuario: function (username, listaUsuarios, _cb) {
        let u = listaUsuarios.find((user) => {
            return user.usuario === username;
        });

        if (!u)
            console.log('Usuário "' + username + '" não encontrado! => recuperarUsuario => !u');

        return _cb(u);        
    },

    validaTokenAdmin: function (token, listaUsuarios,_cb) {
        let me = this;

        if (!token) return _cb(false);

        me.desmontarToken(token, (username, password)=>{
            me.recuperarUsuario(username, listaUsuarios, (usuario)=>{
                return _cb(usuario.permissions[0].admin);
            });
        });
    },
};
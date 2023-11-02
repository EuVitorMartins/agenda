const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});


const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if (this.errors.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário não existe!');
            return;
        }


        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }

    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;

        await this.userExiste();
        if (!this.body.nome) this.errors.push('Nome é obrigatório.');
        if (this.body.password !== this.body.passwordConfirm) this.errors.push('As senha não são iguais.');
        
  
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);

    }

    async userExiste() {
       this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Usuario já existe.');
    }

    valida() {
        this.cleanUp()
       if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
        
        if (this.body.password.length < 4 || this.body.password.length > 20) {
            this.errors.push('Senha precisa ter entre 4 a 20 caracteres.')
        };


    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            password: this.body.password,
            passwordConfirm: this.body.passwordConfirm
        };
    }
}

module.exports = Login;
export default class ValidaLogin {
    constructor(login) {
        this.formulario = document.querySelector(`.${login}`)
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.valida(e);

        });
    }

    valida(e) {
        e.preventDefault();
        this.validaCampo();
        this.validaSenhas();
        if (this.validaCampo() && this.validaSenhas()) this.formulario.submit();

    }

    validaCampo() {
        let ehValido = true

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.form-control')) {

            if (!campo.value) this.criaErro(campo, `O campo não pode esta em branco.`);
            
        }
        return ehValido;
    }

    validaSenhas() {
        let ehValido = true
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.senhaConfim');

        if (senha.value !== repetirSenha.value) {
            this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.');
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
            return ehValido = false;
        }

        return ehValido;
    }



    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

}
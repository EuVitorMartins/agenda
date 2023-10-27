const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato');
}

exports.register = async (req, res) => {
    const contato = new Contato(req.body);
    await contato.register();

    if (this.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(() => { res.redirect('/contato/index') });
        return
    }

    req.flash('success', 'Contato Criado com Sucesso.');
    req.session.save(() => { res.redirect('back') });
    
}


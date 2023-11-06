import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/staly.css';
import ValidaLogin from './assets/js/LoginVerifica';

const registro = new ValidaLogin('register');

registro.eventos();
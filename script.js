import Calculator from './core/Calculator.js';

document.addEventListener('DOMContentLoaded', () => {
    let calc = new Calculator(
        document.getElementById('calculator'),
        document.querySelectorAll('.btn-default'),
        document.getElementById('result'),
        document.getElementById('history'),
        document.getElementById('history-btn'),
        document.getElementById('reset-btn'),
        document.getElementById('themeTumbler'),
        document.getElementById('soundTumbler'),
        document.getElementById('keyboardTumbler'),
        document.getElementById('historyWrap')
    );

    calc.init();
});
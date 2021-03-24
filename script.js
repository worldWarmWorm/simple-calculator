import Calculator from './core/Calculator.js';

document.addEventListener('DOMContentLoaded', () => {
    let calc = new Calculator(
        document.querySelectorAll('.btn-default'),
        document.getElementById('result'),
        document.getElementById('history'),
        document.getElementById('history-btn'),
        document.getElementById('reset-btn'),
        document.getElementById('themeTumbler'),
        document.getElementById('soundTumbler')
    ),
    wrap = document.getElementById('historyWrap'),
    ask = 'Are you sure you want to delete history?';

    calc.setDefaultHistoryLabel();

    calc.activateButtons();
    calc.activateToggleHistory(wrap);
    calc.activateResetHistory(ask);
    calc.activateThemeSwitch();
    calc.activateSoundModeSwitch();
    calc.activateKeybord();
});
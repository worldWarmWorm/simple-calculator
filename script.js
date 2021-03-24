import Calculator from './core/Calculator.js';

document.addEventListener('DOMContentLoaded', () => {
    let calc = new Calculator(
        document.querySelectorAll('.btn-default'),
        document.getElementById('result'),
        document.getElementById('history'),
        document.getElementById('history-btn'),
        document.getElementById('reset-btn'),
        document.getElementById('themeTumbler'),
        document.getElementById('soundTumbler'),
        document.getElementById('historyWrap')
    );

    calc.setDefaultHistoryLabel();
    calc.activateButtons();
    calc.activateToggleHistory();
    calc.activateResetHistory();
    calc.activateThemeSwitch();
    calc.activateSoundModeSwitch();
    calc.activateKeybord();
});
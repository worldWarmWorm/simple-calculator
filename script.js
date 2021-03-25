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

    calc.setDefaultHistoryLabel();
    calc.activateButtons();
    calc.activateKeybord();
    calc.activateToggleHistory();
    calc.activateToggleThemes();
    calc.activateToggleSoundModes();
    calc.activateKeyboardModes();
    calc.activateResetHistory();
});
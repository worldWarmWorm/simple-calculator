import Calculator from './core/Calculator.js';

document.addEventListener('DOMContentLoaded', () => {
    let calc = new Calculator(
        document.querySelectorAll('.btn-default'),
        document.getElementById('result'),
        document.getElementById('history'),
        document.querySelector('.history-default-label'),
        document.getElementById('history-btn'),
        document.getElementById('reset-btn'),
        document.getElementById('themeTumbler')
    ),
    wrap = document.getElementById('historyWrap'),
    ask = 'Are you sure you want to delete history?';

    calc.setDefaultHistoryLabel();

    calc.keys.forEach((el) => {
        el.addEventListener('click', () => {
            let val = el.getAttribute('data-value');

            calc.makeSounds(calc.sounds.click);

            if (val >= 0 && val <= 9 || val == '+' || val == '-' || val == '*' || val == '/' || val == '.') {
                calc.res.value += val;
            }

            if (val === 'c') {
                calc.res.value = '';
            }

            if (val === '<-') {
                calc.res.value = calc.res.value.slice(0, -1);
            }

            if (val === '%') {
                calc.res.value = calc.res.value / 100;
            }

            if (val === '=' && calc.res.value) {
                calc.res.value = eval(calc.res.value);
                if (!isFinite(calc.res.value)) {
                    calc.makeSounds(calc.sounds.error);
                    setTimeout(() => {
                        return window.confirm('Error:\n recived too large number or deviding on 0');
                    }, 200);
                    calc.res.value = '';
                }
            }

            // calc.historyDefaultLabel.style.display = 'none';

            calc.pressKeys(calc.simbols, val);
        });
    });

    calc.toggleHistory(wrap);
    calc.resetHistory(ask);
    calc.themeSwitch();
});
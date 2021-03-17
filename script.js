document.addEventListener('DOMContentLoaded', () => {
    let keys = document.querySelectorAll('.btn-default'),
        res = document.getElementById('result'),
        history = document.getElementById('history'),
        historyDefaultLabel = document.querySelector('.history-default-label'),
        simbols = ['<-', '=', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '000'],
        toggleHistoryBtn = document.getElementById('history-btn'),
        resetHistoryBtn = document.getElementById('reset-btn'),
        tumbler = document.getElementById('tumbler'),
        lineNumber = 0;

    keys.forEach((el) => {
        el.addEventListener('click', () => {

            let val = el.getAttribute('data-value');
            if (val >= 0 && val <= 9 || val == '+' || val == '-' || val == '*' || val == '/' || val == '.') res.value += val;

            if (val === 'c') res.value = '';

            if (val === '<-') res.value = res.value.slice(0, -1);

            if (val === '%') res.value = res.value / 100;

            if (val === '=' && res.value) {
                res.value = eval(res.value);
                if (!isFinite(res.value)) {
                    window.confirm('Error:\n Deviding on 0 dosn\'t make since');
                    res.value = '';
                }
            }

            historyDefaultLabel.style.display = 'none';
            function press(simbols) {
                simbols.forEach((simbol) => {
                    if (val === simbol) {
                        lineNumber++;
                        console.log(lineNumber);
                        history.innerHTML += `${lineNumber}| Pressed "${val}"\n`;
                    }
                    if (!history.innerHTML) {
                        resetHistoryBtn.classList.remove('blocked-btn');
                    }
                });
            }

            press(simbols);
        });
    });

    toggleHistoryBtn.addEventListener('click', (e) => {
        let wrap = document.getElementById('historyWrap');
        wrap.classList.contains('hidden') ?
            wrap.classList.remove('hidden') :
            wrap.classList.add('hidden');
    });

    resetHistoryBtn.addEventListener('click', (e) => {
        let answer = window.confirm('Are you sure you want to delete history?');
        if (answer) {
            historyDefaultLabel.style.display = 'initial';
            history.innerHTML = '';
            resetHistoryBtn.classList.add('blocked-btn');
            lineNumber = 0;
        }
    });

    tumbler.addEventListener('click', () => {
        let tumblerClass = document.body.classList;
        if (tumblerClass.contains('dark')) {
            tumblerClass.remove('dark');
            tumblerClass.add('light');
        } else {
            tumblerClass.remove('light');
            tumblerClass.add('dark');
        }
    });
});
let keys = document.querySelectorAll('.btn-default'),
    res = document.getElementById('result'),
    history = document.getElementById('history'),
    tmp = document.getElementById('tmp'),
    simbols = ['<-', '=', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '000'],
    showHistoryBtn = document.getElementById('show'),
    resetHistoryBtn = document.getElementById('reset');

keys.forEach((el) => {
    el.addEventListener('click', () => {
        // calculate
        let val = el.getAttribute('data-value');
        if (val >= 0 && val <= 9 || val == '+' || val == '-' || val == '*' || val == '/' || val == '.') {
            res.value += val;
        }

        if (val === 'c') {
            res.value = '';
        }

        if (val === '<-') {
            res.value = res.value.slice(0, -1);
        }

        if (val === '=' && res.value) {
            res.value = eval(res.value);
        }

        // // history
        tmp.style.display = 'none';

        function press(simbols) {
            simbols.forEach((simbol) => {
                if (val === simbol) {
                    history.innerHTML += `pressed "${val}"\n`;
                }
            });
        }

        press(simbols);
    });
});

showHistoryBtn.addEventListener('click', (e) => {
    let wrap = document.getElementById('historyWrap');
    wrap.classList.contains('hidden') ?
        wrap.classList.remove('hidden') :
        wrap.classList.add('hidden');

    e.target.innerHTML == 'Show history' ?
        e.target.innerHTML = 'Hide history' :
        e.target.innerHTML = 'Show history';
});

resetHistoryBtn.addEventListener('click', (e) => {
    let answer = window.confirm('Are you sure you want to delete history?');
    if (answer) {
        tmp.style.display = 'initial';
        history.innerHTML = '';
    }
})
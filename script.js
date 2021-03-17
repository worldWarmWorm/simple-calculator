document.addEventListener('DOMContentLoaded', () => {
    let keys = document.querySelectorAll('.btn-default'),
        res = document.getElementById('result'),
        history = document.getElementById('history'),
        historyDefaultLabel = document.querySelector('.history-default-label'),
        simbols = ['<-', '=', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '000'],
        toggleHistoryBtn = document.getElementById('history-btn'),
        resetHistoryBtn = document.getElementById('reset-btn'),
        theme = document.getElementById('theme'),
        lineNumber = 0,
        soundClick = () => {
            let audio = new Audio('./sounds/click.mp3');
            return audio.play();
        },
        soundError = () => {
            let audio = new Audio('./sounds/error.mp3');
            return audio.play();
        },
        soundScroll = () => {
            let audio = new Audio('./sounds/scroll.mp3');
            return audio.play();
        },
        soundReset = () => {
            let audio = new Audio('./sounds/reset.mp3');
            return audio.play();
        },
        soundDark = () => {
            let audio = new Audio('./sounds/dark.mp3');
            return audio.play();
        },
        soundLight = () => {
            let audio = new Audio('./sounds/light.mp3');
            return audio.play();
        };

    keys.forEach((el) => {
        el.addEventListener('click', () => {
            let val = el.getAttribute('data-value');
            soundClick();
            if (val >= 0 && val <= 9 || val == '+' || val == '-' || val == '*' || val == '/' || val == '.') res.value += val;

            if (val === 'c') res.value = '';

            if (val === '<-') res.value = res.value.slice(0, -1);

            if (val === '%') res.value = res.value / 100;

            if (val === '=' && res.value) {
                res.value = eval(res.value);
                if (!isFinite(res.value)) {
                    soundError();
                    setTimeout(() => {
                        return window.confirm('Error:\n Deviding on 0 dosn\'t make since');
                    }, 100);
                    res.value = '';
                }
            }

            historyDefaultLabel.style.display = 'none';

            function press(simbols) {
                simbols.forEach((simbol) => {
                    if (val === simbol) {
                        lineNumber++;
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
        soundScroll();
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
            soundReset();
        }
    });

    theme.addEventListener('click', () => {
        let themeClass = document.body.classList;
        if (themeClass.contains('dark')) {
            soundLight();
            themeClass.remove('dark');
            themeClass.add('light');
        } else {
            soundDark();
            themeClass.remove('light');
            themeClass.add('dark');
        }
    });
});
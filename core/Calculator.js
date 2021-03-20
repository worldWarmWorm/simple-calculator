class Calculator {
    constructor(
        keys = [],
        // Кнопки клавиатуры

        res = '',
        // Табло результата

        history = '',
        // История нажатых клавиш

        historyDefaultLabel = 'History is empty.',
        // Заголовок истории по умолчанию

        toggleHistoryBtn = null,
        // Кнопка показа/скрытия истории

        resetHistoryBtn = null,
        // Кнопка очистки истории

        themeTumbler = null,
        // Кнопка переключения темы

        lineNumber = 0,
        // Начальный номер строки истории

        simbols = ['<-', '=', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '000'],
        // Символы клавиш

        sounds = {
            click: './sounds/click.mp3',
            error: './sounds/error.mp3',
            history: './sounds/history.mp3',
            reset: './sounds/reset.mp3',
            dark: './sounds/dark.mp3',
            light: './sounds/light.mp3'
        },
        // Звуки калькулятора

        themes = {
            ligth: 'light',
            dark: 'dark'
        }
        // themes - стандартные названия классов для темы калькулятора
    ) {
        this.keys = keys;
        this.res = res;
        this.history = history;
        this.historyDefaultLabel = historyDefaultLabel;
        this.simbols = simbols;
        this.toggleHistoryBtn = toggleHistoryBtn;
        this.resetHistoryBtn = resetHistoryBtn;
        this.themeTumbler = themeTumbler;
        this.lineNumber = lineNumber;
        this.simbols = simbols;
        this.sounds = sounds;
        this.themes = themes;
    }

    setDefaultHistoryLabel(label = this.historyDefaultLabel) {
        this.history.innerHTML = label;
    }

    makeSounds(sound) {
        let audio = new Audio(sound);
        return audio.play();
    }

    pressKeys(simbols, val) {
        simbols.forEach((simbol) => {
            if (val === simbol) {
                this.lineNumber++;
                this.history.innerHTML += `${this.lineNumber}| Pressed "${val}"\n`;
            }
            if (!this.history.innerHTML) {
                this.resetHistoryBtn.classList.remove('blocked-btn');
            }
        });
    }

    // wrap - контейнер для истории
    toggleHistory(wrap) {
        this.toggleHistoryBtn.addEventListener('click', () => {
            this.makeSounds(this.sounds.history);
            wrap.classList.contains('hidden') ?
                wrap.classList.remove('hidden') :
                wrap.classList.add('hidden');
        });
    }

    // ask - сообщение при очистке истории
    resetHistory(ask) {
        this.resetHistoryBtn.addEventListener('click', () => {
            let answer = window.confirm(ask);
            if (answer) {
                // this.historyDefaultLabel.style.display = 'initial';
                this.history.innerHTML = '';
                this.resetHistoryBtn.classList.add('blocked-btn');
                this.lineNumber = 0;
                this.makeSounds(this.sounds.reset);
            }
        });
    }

    // themes - стандартные названия классов для темы калькулятора
    themeSwitch(themes = this.themes) {
        this.themeTumbler.addEventListener('click', () => {
            let themeClass = document.body.classList;
            if (themeClass.contains(themes.dark)) {
                themeClass.remove(themes.dark);
                themeClass.add(themes.ligth);
                this.makeSounds(this.sounds.light);
            } else {
                themeClass.remove(themes.ligth);
                themeClass.add(themes.dark);
                this.makeSounds(this.sounds.dark);
            }
        });
    }
}

export default Calculator;
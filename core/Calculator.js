class Calculator {
    constructor(
        // Кнопки клавиатуры
        keys = [],

        // Табло результата
        res = '',

        // История нажатых клавиш
        history = '',

        // Кнопка показа/скрытия истории
        toggleHistoryBtn = null,

        // Кнопка очистки истории
        resetHistoryBtn = null,

        // Кнопка переключения темы
        themeTumbler = null,

        // Заголовок истории по умолчанию
        historyDefaultLabel = 'History is empty.',

        // Начальный номер строки истории
        lineNumber = 0,

        // Символы клавиш
        simbols = ['<-', '=', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '000'],

        // Звуки калькулятора
        sounds = {
            click: './sounds/click.mp3',
            error: './sounds/error.mp3',
            history: './sounds/history.mp3',
            reset: './sounds/reset.mp3',
            dark: './sounds/dark.mp3',
            light: './sounds/light.mp3'
        },

        // themes - стандартные названия классов для темы калькулятора
        themes = {
            ligth: 'light',
            dark: 'dark'
        }
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

    setDefaultHistoryLabel(defaultLabel = this.historyDefaultLabel) {
        this.history.innerHTML = defaultLabel;
    }

    resetDefaultHistoryLabel() {
        this.history.innerHTML = '';
    }

    // sound - путь до файла звука
    makeSounds(sound) {
        let audio = new Audio(sound);
        return audio.play();
    }

    // simbols - массив символов на клавиатуре
    pressKeys(simbols, val) {
        simbols.forEach((simbol) => {
            if(this.lineNumber === 0) {
                this.resetDefaultHistoryLabel();
            }
            if (val === simbol) {
                this.defaultLabel = '';
                this.lineNumber++;
                this.history.innerHTML += `${this.lineNumber}| Pressed "${val}"\n`;
            }
            if (this.history.innerHTML) {
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
            if (answer && this.res) {
                this.setDefaultHistoryLabel();
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
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

        // Кнопка переключения звуковых режимов
        soundModeTumbler = null,

        // Заголовок истории по умолчанию
        historyDefaultLabel = 'History is empty.',

        // Начальный номер строки истории
        lineNumber = 0,

        // Символы клавиш
        simbols = ['<', '=', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '000'],

        // массив ключей объекта события keydown
        eventKeys = ['<', '=', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],

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
        },

        // soundModes - режимы звука
        soundModes = {
            sound: 'sound',
            mute: 'mute'
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
        this.soundModeTumbler = soundModeTumbler;
        this.lineNumber = lineNumber;
        this.simbols = simbols;
        this.sounds = sounds;
        this.themes = themes;
        this.soundModes = soundModes;
    }

    setDefaultHistoryLabel(defaultLabel = this.historyDefaultLabel) {
        this.history.innerHTML = defaultLabel;
    }

    resetDefaultHistoryLabel() {
        this.history.innerHTML = '';
    }

    /**
     * 
     * @param {*} sound - путь до файла звука
     * @param {*} soundModes - звуковые режимы
     * @returns 
     */
    makeSounds(sound, soundModes = this.soundModes) {
        let audio = new Audio(sound),
            soundModeData = this.soundModeTumbler.getAttribute('data-sound-mode');
        if (soundModeData === soundModes.sound) {
            return audio.play();
        } else {
            return false;
        }
    }

    /**
     * 
     * @param {*} soundModes - звуковые режимы
     */
    soundModeSwitch(soundModes = this.soundModes) {
        this.soundModeTumbler.addEventListener('change', () => {
            let soundModeData = this.soundModeTumbler.getAttribute('data-sound-mode');
            soundModeData === soundModes.sound ?
                this.soundModeTumbler.setAttribute('data-sound-mode', soundModes.mute) :
                this.soundModeTumbler.setAttribute('data-sound-mode', soundModes.sound);
        });
    }

    /**
     * 
     * @param {*} simbols - массив символов на клавиатуре
     * @param {*} val - значение аттрибута data-value нажатой кнопки
     */
    pressButtons(simbols, val) {
        simbols.forEach((simbol) => {
            if (this.lineNumber < 1) {
                this.resetDefaultHistoryLabel();
            }
            if (val === simbol) {
                this.lineNumber++;
                this.history.innerHTML += `${this.lineNumber}| Pressed "${val}"\n`;
            }
            if (this.history.innerHTML) {
                this.resetHistoryBtn.classList.remove('blocked-btn');
            }
        });
    }

    presskeybord(keys, val) {
        document.addEventListener('keydown', (e) => {
            console.log(e.key, typeof e.key);
        });
    }

    /**
     * 
     * @param {*} wrap - контейнер для истории
     */
    toggleHistory(wrap) {
        this.toggleHistoryBtn.addEventListener('click', () => {
            this.makeSounds(this.sounds.history);
            wrap.classList.contains('hidden') ?
                wrap.classList.remove('hidden') :
                wrap.classList.add('hidden');
        });
    }

    /**
     * 
     * @param {*} ask - сообщение во всплывающем окне при очистке истории
     */
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

    /**
     * 
     * @param {*} themes - стандартные названия классов для темы калькулятора
     */
    themeSwitch(themes = this.themes) {
        this.themeTumbler.addEventListener('change', () => {
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
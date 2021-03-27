class Calculator {
    /**
     * 
     * @param {*} calculator - Контейнер клавиатуры
     * @param {*} buttons - Кнопки клавиатуры
     * @param {*} res - Табло результата
     * @param {*} history - История нажатых клавиш
     * @param {*} toggleHistoryBtn - Кнопка показа/скрытия истории
     * @param {*} resetHistoryBtn - Кнопка очистки истории
     * @param {*} themeTumbler - Кнопка переключения темы
     * @param {*} soundModeTumbler - Кнопка переключения звуковых режимов
     * @param {*} keyboardTumbler - Кнопка переключения режимов клавиатуры
     * @param {*} wrap - контейнер для истории
     * @param {*} historyDefaultLabel - Заголовок истории по умолчанию
     * @param {*} lineNumber - Начальный номер строки истории
     * @param {*} simbols - Символы клавиш
     * @param {*} eventKeys - Массив ключей объекта события keydown
     * @param {*} sounds - Звуки калькулятора
     * @param {*} themes - Стандартные названия классов для темы калькулятора
     * @param {*} soundModes - Режимы звука
     * @param {*} keyboardModes - Режимы клавиатуры
     * @param {*} ask - Сообщение во всплывающем окне при очистке истории
     */
    constructor(
        calculator = null,
        buttons = [],
        res = '',
        history = '',
        toggleHistoryBtn = null,
        resetHistoryBtn = null,
        themeTumbler = null,
        soundModeTumbler = null,
        keyboardTumbler = null,
        wrap = null,
        historyDefaultLabel = 'History is empty.',
        lineNumber = 0,
        simbols = ['<', '=', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        eventKeys = ['Backspace', 'Enter', '+', '-', '*', 'c', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        sounds = {
            click: './sounds/click.mp3',
            error: './sounds/error.mp3',
            history: './sounds/history.mp3',
            reset: './sounds/reset.mp3',
            dark: './sounds/dark.mp3',
            light: './sounds/light.mp3'
        },
        themes = {
            ligth: 'light',
            dark: 'dark'
        },
        soundModes = {
            sound: 'sound',
            mute: 'mute'
        },
        keyboardModes = {
            on: 'on',
            off: 'off'
        },
        ask = 'Are you sure you want to delete history?'
    ) {
        this.calculator = calculator;
        this.buttons = buttons;
        this.res = res;
        this.history = history;
        this.historyDefaultLabel = historyDefaultLabel;
        this.simbols = simbols;
        this.toggleHistoryBtn = toggleHistoryBtn;
        this.resetHistoryBtn = resetHistoryBtn;
        this.themeTumbler = themeTumbler;
        this.soundModeTumbler = soundModeTumbler;
        this.keyboardTumbler = keyboardTumbler;
        this.wrap = wrap;
        this.lineNumber = lineNumber;
        this.simbols = simbols;
        this.sounds = sounds;
        this.themes = themes;
        this.soundModes = soundModes;
        this.eventKeys = eventKeys;
        this.keyboardModes = keyboardModes;
        this.ask = ask;
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
            return 0;
        }
    }

    /**
     * 
     * @param {*} soundModes - звуковые режимы
     */
    activateToggleSoundModes(soundModes = this.soundModes) {
        this.soundModeTumbler.addEventListener('change', () => {
            let soundModeData = this.soundModeTumbler.getAttribute('data-sound-mode');
            soundModeData === soundModes.sound ?
                this.soundModeTumbler.setAttribute('data-sound-mode', soundModes.mute) :
                this.soundModeTumbler.setAttribute('data-sound-mode', soundModes.sound);
        });
    }

    /**
     * 
     * @param {*} keyboardModes - режимы клавиатуры
     */
    // activateToggleKeyboardModes(keyboardModes = this.keyboardModes) {
    //     this.keyboardTumbler.addEventListener('change', () => {
    //         let keyboardModeData = this.keyboardTumbler.getAttribute('data-keyboard');

    //         this.calculator.classList.contains('disable-keyboard') ?
    //             this.calculator.classList.remove('disable-keyboard') :
    //             this.calculator.classList.add('disable-keyboard');

    //         keyboardModeData === keyboardModes.on ?
    //             this.keyboardTumbler.setAttribute('data-keyboard', keyboardModes.off) :
    //             this.keyboardTumbler.setAttribute('data-keyboard', keyboardModes.on);

    //         if (keyboardModeData === keyboardModes.on) {
    //             document.addEventListener('keydown', (e) => {
    //                 let val = e.key;
    //                 if (val >= 0 && val <= 9 || val == '+' || val == '-' || val == '*' || val == '/' || val == '.') {
    //                     this.res.value += val;
    //                 } 
    //                 if (val === 'c') {
    //                     this.res.value = '';
    //                 }
    //                 if (val === 'Backspace') {
    //                     this.res.value = this.res.value.slice(0, -1);
    //                 }
    //                 if (val === '%') {
    //                     this.res.value = this.res.value / 100;
    //                 }
    //                 if (val === 'Enter' && this.res.value) {
    //                     this.res.value = eval(this.res.value);
    //                     if (!isFinite(this.res.value)) {
    //                         this.makeSounds(this.sounds.error);
    //                         setTimeout(() => {
    //                             return window.confirm('Error:\n recived too large number or set deviding on 0');
    //                         }, 200);
    //                         this.res.value = '';
    //                     }
    //                 }
    //                 this.pressKeys(this.eventKeys, val);
    //             });
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    /**
     * 
     * @param {*} simbols - массив символов на кнопках
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
                this.makeSounds(this.sounds.click);
            }
            if (this.history.innerHTML) {
                this.resetHistoryBtn.classList.remove('blocked-btn');
            }
        });
    }

    /**
     * 
     * @param {*} simbols - массив символов на клавиатуре
     * @param {*} val - значение ключа key объекта события keydown
     */
    pressKeys(simbols, val) {
        simbols.forEach((simbol) => {
            if (this.lineNumber < 1) {
                this.resetDefaultHistoryLabel();
            }
            if (val === simbol) {
                this.lineNumber++;
                this.history.innerHTML += `${this.lineNumber}| Pressed "${val}"\n`;
                this.makeSounds(this.sounds.click);
            }
            if (this.history.innerHTML) {
                this.resetHistoryBtn.classList.remove('blocked-btn');
            }
        });
    }

    activateButtons() {
        this.buttons.forEach((el) => {
            el.addEventListener('click', () => {
                let val = el.getAttribute('data-value');
                if (val >= 0 && val <= 9 || val == '+' || val == '-' || val == '*' || val == '/' || val == '.') {
                    this.res.value += val;
                }
                if (val === 'c') {
                    this.res.value = '';
                }
                if (val === '<') {
                    this.res.value = this.res.value.slice(0, -1);
                }
                if (val === '%') {
                    this.res.value = this.res.value / 100;
                }
                if (val === '=' && this.res.value) {
                    this.res.value = eval(this.res.value);
                    if (!isFinite(this.res.value)) {
                        this.makeSounds(this.sounds.error);
                        setTimeout(() => {
                            return window.confirm('Error:\n recived too large number or set deviding on 0');
                        }, 200);
                        this.res.value = '';
                    }
                }
                this.pressButtons(this.simbols, val);
            });
        });
    }

    activateKeybord(active = false) {
        let a = document.addEventListener('keydown', (e) => {
            let val = e.key;
            if (val >= 0 && val <= 9 || val == '+' || val == '-' || val == '*' || val == '/' || val == '.') {
                this.res.value += val;
            } 
            if (val === 'c') {
                this.res.value = '';
            }
            if (val === 'Backspace') {
                this.res.value = this.res.value.slice(0, -1);
            }
            if (val === '%') {
                this.res.value = this.res.value / 100;
            }
            if (val === 'Enter' && this.res.value) {
                this.res.value = eval(this.res.value);
                if (!isFinite(this.res.value)) {
                    this.makeSounds(this.sounds.error);
                    setTimeout(() => {
                        return window.confirm('Error:\n recived too large number or set deviding on 0');
                    }, 200);
                    this.res.value = '';
                }
            }
            this.pressKeys(this.eventKeys, val);
        });

        if (active) {
            a = null;
            return false;
        } else {
            return a;
        }
    }

    /**
     * 
     * @param {*} wrap - контейнер для истории
     */
    activateToggleHistory(wrap = this.wrap) {
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
    activateResetHistory(ask = this.ask) {
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
    activateToggleThemes(themes = this.themes) {
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

    init() {
        this.setDefaultHistoryLabel();
        this.activateButtons();
        this.activateToggleHistory();
        this.activateToggleThemes();
        this.activateToggleSoundModes();
        this.activateKeybord();
        this.activateResetHistory();
    }
}

export default Calculator;
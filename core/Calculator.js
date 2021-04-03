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
            light: 'light',
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
     * @param {*} soundModes - массив звуковых режимов
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
     * @param {*} themes - массив тем
     * @param {*} keyboardModes - массив режимов подсказок клавиатуры
     * @param {*} soundModes - массив звуковых режимов
     */
    activateTogglePannel(themes = this.themes, soundModes = this.soundModes, keyboardModes = this.keyboardModes ) {
        let currentSoundStorage = localStorage.getItem('sound-mode'),
            currentKeyboardStorage = localStorage.getItem('keyboard-mode'),
            currentThemeStorage = localStorage.getItem('theme');

        window.addEventListener('load', () => {
            if (currentThemeStorage === 'light' || currentThemeStorage === undefined) {
                this.themeTumbler.setAttribute('data-theme', themes.light);
                localStorage.setItem('theme', themes.light);
                document.body.classList.remove(themes.dark);
                document.body.classList.add(themes.light);
                this.themeTumbler.removeAttribute('class');
            } else {
                this.themeTumbler.setAttribute('data-theme', themes.dark);
                localStorage.setItem('theme', themes.dark);
                document.body.classList.remove(themes.light);
                document.body.classList.add(themes.dark);
                this.themeTumbler.classList.add('checked');
            }

            if (currentSoundStorage === 'mute' || currentSoundStorage === undefined) {
                this.soundModeTumbler.setAttribute('data-sound-mode', soundModes.mute);
                this.soundModeTumbler.removeAttribute('class');
                localStorage.setItem('sound-mode', soundModes.mute);
            } else {
                this.soundModeTumbler.setAttribute('data-sound-mode', soundModes.sound);
                this.soundModeTumbler.classList.add('checked');
                localStorage.setItem('sound-mode', soundModes.sound);
            }

            if (currentKeyboardStorage === 'off' || currentKeyboardStorage === undefined) {
                this.keyboardTumbler.setAttribute('data-keyboard', keyboardModes.off);
                this.keyboardTumbler.removeAttribute('class');
                localStorage.setItem('keyboard-mode', keyboardModes.off);
                this.calculator.classList.add('hidden-keyboard-description');
            } else {
                this.keyboardTumbler.setAttribute('data-keyboard', keyboardModes.on);
                this.keyboardTumbler.classList.add('checked');
                localStorage.setItem('keyboard-mode', keyboardModes.on);
                this.calculator.classList.remove('hidden-keyboard-description');
            }
        }); 

        this.soundModeTumbler.addEventListener('change', () => {
            if (this.soundModeTumbler.getAttribute('data-sound-mode') === soundModes.mute) {
                this.soundModeTumbler.setAttribute('data-sound-mode', soundModes.sound);
                this.soundModeTumbler.classList.add('checked');
                localStorage.setItem('sound-mode', soundModes.sound);
            } else {
                this.soundModeTumbler.setAttribute('data-sound-mode', soundModes.mute);
                this.soundModeTumbler.removeAttribute('class');
                localStorage.setItem('sound-mode', soundModes.mute);
            }
        });

        this.keyboardTumbler.addEventListener('change', () => {
            this.calculator.classList.contains('hidden-keyboard-description') ?
                this.calculator.classList.remove('hidden-keyboard-description') :
                this.calculator.classList.add('hidden-keyboard-description');
            if (this.keyboardTumbler.getAttribute('data-keyboard') === keyboardModes.off) {
                this.keyboardTumbler.setAttribute('data-keyboard', keyboardModes.on);
                this.keyboardTumbler.classList.add('checked');
                localStorage.setItem('keyboard-mode', keyboardModes.on);
            } else {
                this.keyboardTumbler.setAttribute('data-keyboard', keyboardModes.off);
                this.keyboardTumbler.removeAttribute('class');
                localStorage.setItem('keyboard-mode', keyboardModes.off);
            }
        });

        this.themeTumbler.addEventListener('change', () => {
            if (this.themeTumbler.getAttribute('data-theme') === themes.light) {
                document.body.classList.remove(themes.light);
                document.body.classList.add(themes.dark);
                localStorage.setItem('theme', themes.dark);
                this.themeTumbler.classList.add('checked');
                this.themeTumbler.setAttribute('data-theme', themes.dark);
                this.makeSounds(this.sounds.dark);
            } else {
                document.body.classList.remove(themes.dark);
                document.body.classList.add(themes.light);
                localStorage.setItem('theme', themes.light);
                this.themeTumbler.setAttribute('data-theme', themes.light);
                this.themeTumbler.removeAttribute('class');
                this.makeSounds(this.sounds.light);
            }
        });
    }

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

    activateKeybord() {
        document.addEventListener('keydown', (e) => {
            
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
            if (val === ' ') {
                e.preventDefault();
                this.res.value = this.res.value.slice(0, -1);
            }
            this.pressKeys(this.eventKeys, val);
        });
    }

    /**
     * 
     * @param {*} wrap - контейнер (div) для истории
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

    init() {
        this.setDefaultHistoryLabel();
        this.activateButtons();
        this.activateToggleHistory();
        this.activateKeybord();
        this.activateResetHistory();
        this.activateTogglePannel();
    }
}

export default Calculator;
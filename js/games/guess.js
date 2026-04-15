// 猜数字游戏
const guessGame = {
    gameId: 'guess',
    targetNumber: 0,
    minNumber: 1,
    maxNumber: 100,
    guessCount: 0,
    isGameStarted: false,

    /**
     * 初始化游戏
     */
    init() {
        this.bindEvents();
        this.loadHistory();
        this.checkRules();
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        // 开始游戏按钮点击事件
        document.getElementById('start-guess').addEventListener('click', () => {
            this.startGame();
        });

        // 提交猜测按钮点击事件
        document.getElementById('submit-guess').addEventListener('click', () => {
            this.submitGuess();
        });

        // 回车键提交猜测
        document.getElementById('guess-number').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitGuess();
            }
        });

        // 清除历史按钮点击事件
        document.getElementById('clear-guess-history').addEventListener('click', () => {
            this.clearHistory();
        });

        // 规则按钮点击事件
        document.querySelector('.rule-btn[data-game="guess"]').addEventListener('click', () => {
            this.showRules();
        });

        // 最小值变化事件
        document.getElementById('guess-min').addEventListener('change', (e) => {
            this.minNumber = parseInt(e.target.value) || 1;
            if (this.minNumber < 1) this.minNumber = 1;
            if (this.minNumber >= this.maxNumber) {
                this.minNumber = this.maxNumber - 1;
            }
            e.target.value = this.minNumber;
        });

        // 最大值变化事件
        document.getElementById('guess-max').addEventListener('change', (e) => {
            this.maxNumber = parseInt(e.target.value) || 100;
            if (this.maxNumber <= this.minNumber) {
                this.maxNumber = this.minNumber + 1;
            }
            e.target.value = this.maxNumber;
        });
    },

    /**
     * 开始游戏
     */
    startGame() {
        // 获取最小值和最大值
        this.minNumber = parseInt(document.getElementById('guess-min').value) || 1;
        this.maxNumber = parseInt(document.getElementById('guess-max').value) || 100;

        // 验证范围
        if (this.minNumber < 1) this.minNumber = 1;
        if (this.maxNumber <= this.minNumber) {
            this.maxNumber = this.minNumber + 1;
            document.getElementById('guess-max').value = this.maxNumber;
        }

        // 生成随机目标数字
        this.targetNumber = Math.floor(Math.random() * (this.maxNumber - this.minNumber + 1)) + this.minNumber;
        this.guessCount = 0;
        this.isGameStarted = true;

        // 重置界面
        document.getElementById('guess-result').innerHTML = `
            <p>游戏开始！</p>
            <p>请猜一个 ${this.minNumber} 到 ${this.maxNumber} 之间的数字</p>
        `;
        document.getElementById('guess-stats').innerHTML = '<p>猜测次数：0</p>';
        document.getElementById('guess-number').value = '';
        document.getElementById('guess-number').focus();
    },

    /**
     * 提交猜测
     */
    submitGuess() {
        if (!this.isGameStarted) {
            ui.showMessage('请先点击"开始游戏"按钮', 'error');
            return;
        }

        const guessInput = document.getElementById('guess-number');
        const guess = parseInt(guessInput.value);

        // 验证输入
        if (isNaN(guess)) {
            ui.showMessage('请输入有效的数字', 'error');
            return;
        }

        if (guess < this.minNumber || guess > this.maxNumber) {
            ui.showMessage(`请输入 ${this.minNumber} 到 ${this.maxNumber} 之间的数字`, 'error');
            return;
        }

        // 增加猜测次数
        this.guessCount++;

        // 判断猜测结果
        let resultMessage = '';
        if (guess === this.targetNumber) {
            resultMessage = `
                <p style="color: #4CAF50;">恭喜你猜对了！</p>
                <p>目标数字是：${this.targetNumber}</p>
                <p>你用了 ${this.guessCount} 次猜测</p>
            `;
            this.isGameStarted = false;
            this.saveHistory();
        } else if (guess < this.targetNumber) {
            resultMessage = `<p style="color: #2196F3;">猜小了！</p>`;
        } else {
            resultMessage = `<p style="color: #FF9800;">猜大了！</p>`;
        }

        // 更新界面
        document.getElementById('guess-result').innerHTML = resultMessage;
        document.getElementById('guess-stats').innerHTML = `<p>猜测次数：${this.guessCount}</p>`;
        guessInput.value = '';
        guessInput.focus();
    },

    /**
     * 保存历史记录
     */
    saveHistory() {
        const historyData = {
            result: {
                targetNumber: this.targetNumber,
                guessCount: this.guessCount,
                minNumber: this.minNumber,
                maxNumber: this.maxNumber,
                isWon: true
            },
            metadata: {
                minNumber: this.minNumber,
                maxNumber: this.maxNumber
            }
        };
        storage.saveGameHistory(this.gameId, historyData);
        this.loadHistory();
    },

    /**
     * 加载历史记录
     */
    loadHistory() {
        const history = storage.getGameHistory(this.gameId);
        const historyContainer = document.getElementById('guess-history');

        if (history) {
            const targetNumber = history.result.targetNumber;
            const guessCount = history.result.guessCount;
            const minNumber = history.result.minNumber;
            const maxNumber = history.result.maxNumber;
            const time = ui.formatTime(history.last_play_time);

            historyContainer.innerHTML = `
                <p>目标数字：${targetNumber}</p>
                <p>猜测次数：${guessCount}</p>
                <p>范围：${minNumber} - ${maxNumber}</p>
                <p class="history-time">${time}</p>
            `;
        } else {
            historyContainer.innerHTML = '<p>暂无历史记录</p>';
        }
    },

    /**
     * 清除历史记录
     */
    clearHistory() {
        storage.clearGameHistory(this.gameId);
        this.loadHistory();
        ui.showMessage('历史记录已清除', 'success');
    },

    /**
     * 检查规则是否已查看
     */
    checkRules() {
        if (!storage.hasSeenRules(this.gameId)) {
            this.showRules();
        }
    },

    /**
     * 显示规则
     */
    showRules() {
        const rulesContent = `
            <h4>游戏规则</h4>
            <ul>
                <li>设置数字范围（默认 1-100）</li>
                <li>点击"开始游戏"按钮</li>
                <li>系统会随机生成一个目标数字</li>
                <li>输入你猜测的数字并提交</li>
                <li>系统会提示"大了"或"小了"</li>
                <li>直到你猜对数字为止</li>
                <li>记录你猜测的次数</li>
            </ul>
        `;

        ui.showModal('猜数字规则', rulesContent, () => {
            storage.markRulesAsSeen(this.gameId);
        });
    },

    /**
     * 开始游戏
     */
    start() {
        // 游戏开始逻辑
    },

    /**
     * 停止游戏
     */
    stop() {
        // 游戏停止逻辑
    }
};

// 注册游戏
gameManager.registerGame('guess', guessGame);
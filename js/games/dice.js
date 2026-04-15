// 摇骰子游戏
const diceGame = {
    gameId: 'dice',
    diceCount: 1,
    diceResults: [],

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
        const self = this;
        
        // 摇骰子按钮点击事件
        document.getElementById('roll-dice').addEventListener('click', () => {
            self.rollDice();
        });

        // 骰子数量变化事件
        document.getElementById('dice-count').addEventListener('change', function(e) {
            self.updateDiceCount(parseInt(this.value));
        });

        // 增加骰子数量按钮点击事件
        document.getElementById('increase-dice').addEventListener('click', function() {
            self.updateDiceCount(self.diceCount + 1);
        });

        // 减少骰子数量按钮点击事件
        document.getElementById('decrease-dice').addEventListener('click', function() {
            self.updateDiceCount(self.diceCount - 1);
        });

        // 清除历史按钮点击事件
        document.getElementById('clear-dice-history').addEventListener('click', () => {
            self.clearHistory();
        });

        // 规则按钮点击事件
        document.querySelector('.rule-btn[data-game="dice"]').addEventListener('click', () => {
            self.showRules();
        });
    },

    /**
     * 更新骰子数量
     */
    updateDiceCount(count) {
        this.diceCount = count || 1;
        if (this.diceCount < 1) this.diceCount = 1;
        if (this.diceCount > 9) this.diceCount = 9;
        document.getElementById('dice-count').value = this.diceCount;
    },

    /**
     * 摇骰子
     */
    rollDice() {
        const resultContainer = document.getElementById('dice-result');
        resultContainer.innerHTML = '';

        // 创建骰子容器
        const diceContainer = document.createElement('div');
        diceContainer.className = 'dice-container';
        resultContainer.appendChild(diceContainer);

        // 生成随机结果
        this.diceResults = [];
        for (let i = 0; i < this.diceCount; i++) {
            const dice = document.createElement('div');
            dice.className = 'dice rolling';
            dice.textContent = '?';
            diceContainer.appendChild(dice);

            // 模拟骰子滚动
            setTimeout(() => {
                const result = Math.floor(Math.random() * 6) + 1;
                this.diceResults.push(result);
                dice.textContent = result;
                dice.classList.remove('rolling');

                // 所有骰子都滚动完成后显示结果
                if (i === this.diceCount - 1) {
                    this.showResult();
                    this.saveHistory();
                }
            }, 1000 + i * 200);
        }
    },

    /**
     * 显示结果
     */
    showResult() {
        const resultContainer = document.getElementById('dice-result');
        const sum = this.diceResults.reduce((a, b) => a + b, 0);

        // 添加结果信息
        const resultInfo = document.createElement('div');
        resultInfo.className = 'result-info';
        resultInfo.innerHTML = `
            <p>点数：${this.diceResults.join(', ')}</p>
            <p>总和：${sum}</p>
        `;
        resultContainer.appendChild(resultInfo);
    },

    /**
     * 保存历史记录
     */
    saveHistory() {
        const sum = this.diceResults.reduce((a, b) => a + b, 0);
        const historyData = {
            result: {
                diceCount: this.diceCount,
                results: this.diceResults,
                sum: sum
            },
            metadata: {
                diceCount: this.diceCount
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
        const historyContainer = document.getElementById('dice-history');

        if (history) {
            const sum = history.result.sum;
            const results = history.result.results;
            const time = ui.formatTime(history.last_play_time);

            historyContainer.innerHTML = `
                <p>点数：${results.join(', ')}</p>
                <p>总和：${sum}</p>
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
                <li>选择骰子数量（1-9个）</li>
                <li>使用+/-按钮或直接输入数字来调整数量</li>
                <li>点击"摇骰子"按钮</li>
                <li>系统会随机生成每个骰子的点数</li>
                <li>显示所有骰子的点数和总和</li>
                <li>结果会自动保存到历史记录</li>
            </ul>
        `;

        ui.showModal('摇骰子规则', rulesContent, () => {
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
gameManager.registerGame('dice', diceGame);
// 轮盘游戏
const rouletteGame = {
    gameId: 'roulette',
    participants: [],

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
        // 旋转轮盘按钮点击事件
        document.getElementById('spin-roulette').addEventListener('click', () => {
            this.spinRoulette();
        });

        // 清除历史按钮点击事件
        document.getElementById('clear-roulette-history').addEventListener('click', () => {
            this.clearHistory();
        });

        // 规则按钮点击事件
        document.querySelector('.rule-btn[data-game="roulette"]').addEventListener('click', () => {
            this.showRules();
        });
    },

    /**
     * 旋转轮盘
     */
    spinRoulette() {
        const participantsInput = document.getElementById('roulette-participants');
        const participantsText = participantsInput.value.trim();

        if (!participantsText) {
            ui.showMessage('请输入参与者名单', 'error');
            return;
        }

        // 解析参与者名单
        this.participants = participantsText.split(',').map(p => p.trim()).filter(p => p);

        if (this.participants.length < 2) {
            ui.showMessage('至少需要2个参与者', 'error');
            return;
        }

        const resultContainer = document.getElementById('roulette-result');
        resultContainer.innerHTML = '<p>轮盘正在旋转...</p>';

        // 模拟轮盘旋转效果
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * this.participants.length);
            const winner = this.participants[randomIndex];

            resultContainer.innerHTML = `
                <p style="color: #667eea; font-weight: bold;">中奖者</p>
                <p style="font-size: 1.5rem; margin-top: 1rem;">${winner}</p>
            `;

            // 保存历史记录
            this.saveHistory({ winner, participants: this.participants });
        }, 2000);
    },

    /**
     * 保存历史记录
     */
    saveHistory(data) {
        const historyData = {
            result: {
                winner: data.winner,
                participants: data.participants
            },
            metadata: {
                participantCount: data.participants.length
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
        const historyContainer = document.getElementById('roulette-history');

        if (history) {
            const winner = history.result.winner;
            const participantCount = history.metadata.participantCount;
            const time = ui.formatTime(history.last_play_time);

            historyContainer.innerHTML = `
                <p><strong>中奖者：</strong>${winner}</p>
                <p><strong>参与人数：</strong>${participantCount}</p>
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
                <li>在文本框中输入参与者名单，用逗号分隔</li>
                <li>点击"旋转轮盘"按钮</li>
                <li>轮盘会随机选择一个参与者</li>
                <li>显示中奖者信息</li>
                <li>结果会自动保存到历史记录</li>
            </ul>
        `;

        ui.showModal('轮盘游戏规则', rulesContent, () => {
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
gameManager.registerGame('roulette', rouletteGame);
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
        this.loadParticipants();
        this.renderParticipantList();
        this.renderParticipantHistory();
    },

    /**
     * 从本地存储加载参与者
     */
    loadParticipants() {
        this.participants = storage.getParticipants();
    },

    /**
     * 保存参与者到本地存储
     */
    saveParticipants() {
        storage.saveParticipants(this.participants);
    },

    /**
     * 渲染参与者历史记录
     */
    renderParticipantHistory() {
        const history = storage.getParticipantHistory();
        if (history.length > 0) {
            const listContainer = document.getElementById('roulette-participant-list');
            const historyContainer = document.createElement('div');
            historyContainer.className = 'participant-history';
            historyContainer.innerHTML = `<h4 style="margin-top: 1rem; margin-bottom: 0.5rem; font-size: 1rem;">历史参与者</h4>`;
            
            const historyTags = document.createElement('div');
            historyTags.className = 'participant-list';
            
            history.forEach(name => {
                const tag = document.createElement('div');
                tag.className = 'participant-tag';
                tag.style.background = 'linear-gradient(135deg, #9575cd 0%, #7e57c2 100%)';
                tag.innerHTML = `
                    <span>${name}</span>
                    <button class="add-from-history-btn">+</button>
                `;
                tag.querySelector('.add-from-history-btn').addEventListener('click', () => {
                    this.addParticipantFromHistory(name);
                });
                historyTags.appendChild(tag);
            });
            
            historyContainer.appendChild(historyTags);
            listContainer.appendChild(historyContainer);
        }
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        // 添加参与者按钮点击事件
        document.querySelector('.add-participant-btn[data-game="roulette"]').addEventListener('click', () => {
            this.addParticipant();
        });

        // 参与者输入框回车添加
        document.querySelectorAll('#roulette-game .participant-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addParticipant();
                }
            });
        });

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
     * 添加参与者
     */
    addParticipant() {
        const input = document.querySelector('#roulette-game .participant-input');
        const name = input.value.trim();

        if (!name) {
            ui.showMessage('请输入参与者姓名', 'error');
            return;
        }

        if (this.participants.includes(name)) {
            ui.showMessage('该参与者已存在', 'error');
            return;
        }

        this.participants.push(name);
        input.value = '';
        this.saveParticipants();
        storage.saveParticipantHistory(name);
        this.renderParticipantList();
        this.renderParticipantHistory();
    },

    /**
     * 从历史记录添加参与者
     */
    addParticipantFromHistory(name) {
        if (this.participants.includes(name)) {
            ui.showMessage('该参与者已存在', 'error');
            return;
        }

        this.participants.push(name);
        this.saveParticipants();
        this.renderParticipantList();
    },

    /**
     * 移除参与者
     */
    removeParticipant(name) {
        this.participants = this.participants.filter(p => p !== name);
        this.saveParticipants();
        this.renderParticipantList();
    },

    /**
     * 渲染参与者列表
     */
    renderParticipantList() {
        const listContainer = document.getElementById('roulette-participant-list');
        listContainer.innerHTML = '';

        this.participants.forEach(name => {
            const tag = document.createElement('div');
            tag.className = 'participant-tag';
            tag.innerHTML = `
                <span>${name}</span>
                <button class="remove-participant-btn">×</button>
            `;
            tag.querySelector('.remove-participant-btn').addEventListener('click', () => {
                this.removeParticipant(name);
            });
            listContainer.appendChild(tag);
        });
    },

    /**
     * 旋转轮盘
     */
    spinRoulette() {
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
                <li>在输入框中输入参与者姓名，点击"添加"按钮</li>
                <li>可以添加多个参与者，每个参与者显示为一个标签</li>
                <li>点击标签右侧的"×"可以删除该参与者</li>
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
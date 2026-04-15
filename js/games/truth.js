// 真心话大冒险游戏
const truthGame = {
    gameId: 'truth',
    selectedType: 'all',
    tasks: {
        truth: [
            '你最尴尬的一次经历是什么？',
            '你最喜欢的人是谁？',
            '你做过最勇敢的事是什么？',
            '你最害怕的东西是什么？',
            '你有什么秘密一直没告诉别人？',
            '你最想拥有的超能力是什么？',
            '你最后悔的一件事是什么？',
            '你最想和谁交换人生一天？',
            '你最不喜欢自己的哪一点？',
            '你收到过最难忘的礼物是什么？'
        ],
        dare: [
            '唱一首歌给大家听',
            '模仿一个动物的动作',
            '给在场的任意一人一个拥抱',
            '跳一段即兴舞蹈',
            '说出在场所有人的优点',
            '做10个俯卧撑',
            '学一种方言说一句话',
            '表演一个魔术',
            '给一个朋友打电话说"我想你了"',
            '吃一勺辣椒酱'
        ]
    },

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
        // 类型按钮点击事件
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedType = e.target.dataset.type;
            });
        });

        // 生成任务按钮点击事件
        document.getElementById('generate-task').addEventListener('click', () => {
            this.generateTask();
        });

        // 清除历史按钮点击事件
        document.getElementById('clear-truth-history').addEventListener('click', () => {
            this.clearHistory();
        });

        // 规则按钮点击事件
        document.querySelector('.rule-btn[data-game="truth"]').addEventListener('click', () => {
            this.showRules();
        });
    },

    /**
     * 生成任务
     */
    generateTask() {
        let tasks = [];
        if (this.selectedType === 'all') {
            tasks = [...this.tasks.truth, ...this.tasks.dare];
        } else {
            tasks = this.tasks[this.selectedType];
        }

        const randomIndex = Math.floor(Math.random() * tasks.length);
        const task = tasks[randomIndex];
        const taskType = this.selectedType === 'all' ? 
            (Math.random() > 0.5 ? '真心话' : '大冒险') : 
            (this.selectedType === 'truth' ? '真心话' : '大冒险');

        // 显示任务
        const resultContainer = document.getElementById('truth-result');
        resultContainer.innerHTML = `
            <p style="color: #667eea; font-weight: bold;">${taskType}</p>
            <p style="margin-top: 1rem;">${task}</p>
        `;

        // 保存历史记录
        this.saveHistory({ task, taskType });
    },

    /**
     * 保存历史记录
     */
    saveHistory(data) {
        const historyData = {
            result: {
                task: data.task,
                taskType: data.taskType
            },
            metadata: {
                selectedType: this.selectedType
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
        const historyContainer = document.getElementById('truth-history');

        if (history) {
            const task = history.result.task;
            const taskType = history.result.taskType;
            const time = ui.formatTime(history.last_play_time);

            historyContainer.innerHTML = `
                <p><strong>${taskType}</strong></p>
                <p>${task}</p>
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
                <li>选择任务类型：全部、真心话或大冒险</li>
                <li>点击"生成任务"按钮</li>
                <li>系统会随机生成一个任务</li>
                <li>完成生成的任务</li>
                <li>结果会自动保存到历史记录</li>
            </ul>
        `;

        ui.showModal('真心话大冒险规则', rulesContent, () => {
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
gameManager.registerGame('truth', truthGame);
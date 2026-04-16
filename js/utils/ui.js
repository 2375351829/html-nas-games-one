// UI 工具函数
const ui = {
    /**
     * 显示弹窗
     * @param {string} title - 弹窗标题
     * @param {string} content - 弹窗内容
     * @param {function} callback - 确认回调函数
     */
    showModal(title, content, callback) {
        const modal = document.getElementById('rule-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const confirmBtn = document.getElementById('confirm-modal');
        const closeBtn = document.getElementById('close-modal');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('active');

        // 清除之前的事件监听器
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

        // 添加新的事件监听器
        newConfirmBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            if (callback) callback();
        });

        newCloseBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // 点击遮罩层关闭弹窗
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    },

    /**
     * 切换游戏面板
     * @param {string} gameId - 游戏ID
     */
    switchGame(gameId) {
        // 隐藏所有游戏面板
        document.querySelectorAll('.game-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // 显示选中的游戏面板
        document.getElementById(`${gameId}-game`).classList.add('active');

        // 更新游戏卡片状态
        document.querySelectorAll('.game-card').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.game === gameId) {
                btn.classList.add('active');
            }
        });
    },

    /**
     * 显示消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 (success, error, info)
     */
    showMessage(message, type = 'info') {
        // 创建消息元素
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;

        // 添加到页面
        document.body.appendChild(messageElement);

        // 自动移除
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 500);
        }, 3000);
    },

    /**
     * 显示加载状态
     * @param {boolean} show - 是否显示
     */
    showLoading(show) {
        let loadingElement = document.getElementById('loading');
        if (!loadingElement) {
            loadingElement = document.createElement('div');
            loadingElement.id = 'loading';
            loadingElement.className = 'loading';
            loadingElement.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(loadingElement);
        }

        if (show) {
            loadingElement.classList.add('active');
        } else {
            loadingElement.classList.remove('active');
        }
    },

    /**
     * 格式化时间
     * @param {string} isoString - ISO 时间字符串
     * @returns {string} 格式化后的时间
     */
    formatTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * 动画效果
     * @param {HTMLElement} element - 元素
     * @param {string} animation - 动画名称
     * @param {function} callback - 动画结束回调
     */
    animate(element, animation, callback) {
        element.classList.add(animation);
        element.addEventListener('animationend', () => {
            element.classList.remove(animation);
            if (callback) callback();
        }, { once: true });
    }
};
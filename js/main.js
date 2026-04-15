// 主逻辑文件

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    // 初始化所有游戏
    gameManager.initAllGames();

    // 绑定游戏切换事件
    bindGameSwitchEvents();

    // 添加消息样式
    addMessageStyles();
});

/**
 * 绑定游戏切换事件
 */
function bindGameSwitchEvents() {
    // 导航按钮点击事件
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const gameId = btn.dataset.game;
            ui.switchGame(gameId);
        });
    });
}

/**
 * 添加消息样式
 */
function addMessageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .message {
            position: fixed;
            top: 6rem;
            right: 1rem;
            padding: 1rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .message.success {
            background-color: #4CAF50;
        }

        .message.error {
            background-color: #f44336;
        }

        .message.info {
            background-color: #2196F3;
        }

        .message.fade-out {
            animation: fadeOut 0.5s ease-in forwards;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }

        .loading {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .loading.active {
            opacity: 1;
            visibility: visible;
        }

        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #4CAF50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .history-time {
            font-size: 0.8rem;
            color: #999;
            margin-top: 0.5rem;
        }
    `;
    document.head.appendChild(style);
}
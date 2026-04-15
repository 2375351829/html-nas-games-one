// 游戏注册管理
const gameManager = {
    games: {},

    /**
     * 注册游戏
     * @param {string} gameId - 游戏ID
     * @param {object} game - 游戏对象
     */
    registerGame(gameId, game) {
        this.games[gameId] = game;
    },

    /**
     * 获取游戏
     * @param {string} gameId - 游戏ID
     * @returns {object} 游戏对象
     */
    getGame(gameId) {
        return this.games[gameId];
    },

    /**
     * 初始化所有游戏
     */
    initAllGames() {
        Object.keys(this.games).forEach(gameId => {
            const game = this.games[gameId];
            if (game.init) {
                game.init();
            }
        });
    },

    /**
     * 启动游戏
     * @param {string} gameId - 游戏ID
     */
    startGame(gameId) {
        const game = this.games[gameId];
        if (game && game.start) {
            game.start();
        }
    },

    /**
     * 停止游戏
     * @param {string} gameId - 游戏ID
     */
    stopGame(gameId) {
        const game = this.games[gameId];
        if (game && game.stop) {
            game.stop();
        }
    },

    /**
     * 获取所有游戏ID
     * @returns {array} 游戏ID数组
     */
    getGameIds() {
        return Object.keys(this.games);
    }
};
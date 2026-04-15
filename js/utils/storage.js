// 本地存储封装
const storage = {
    /**
     * 获取存储数据
     * @param {string} key - 存储键名
     * @returns {any} 存储的数据
     */
    getItem(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting item from localStorage:', error);
            return null;
        }
    },

    /**
     * 设置存储数据
     * @param {string} key - 存储键名
     * @param {any} value - 存储的数据
     */
    setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting item to localStorage:', error);
        }
    },

    /**
     * 删除存储数据
     * @param {string} key - 存储键名
     */
    removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from localStorage:', error);
        }
    },

    /**
     * 清空所有存储
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    },

    /**
     * 检查游戏规则是否已查看
     * @param {string} gameId - 游戏ID
     * @returns {boolean} 是否已查看
     */
    hasSeenRules(gameId) {
        return this.getItem(`game_rules_seen_${gameId}`) === true;
    },

    /**
     * 标记游戏规则已查看
     * @param {string} gameId - 游戏ID
     */
    markRulesAsSeen(gameId) {
        this.setItem(`game_rules_seen_${gameId}`, true);
    },

    /**
     * 获取游戏历史记录
     * @param {string} gameId - 游戏ID
     * @returns {object} 历史记录
     */
    getGameHistory(gameId) {
        return this.getItem(`game_history_${gameId}`);
    },

    /**
     * 保存游戏历史记录
     * @param {string} gameId - 游戏ID
     * @param {object} data - 历史记录数据
     */
    saveGameHistory(gameId, data) {
        const history = {
            last_play_time: new Date().toISOString(),
            ...data
        };
        this.setItem(`game_history_${gameId}`, history);
    },

    /**
     * 清除游戏历史记录
     * @param {string} gameId - 游戏ID
     */
    clearGameHistory(gameId) {
        this.removeItem(`game_history_${gameId}`);
    }
};
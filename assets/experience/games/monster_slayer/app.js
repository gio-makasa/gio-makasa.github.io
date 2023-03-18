function getrand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
    data() {
        return {
            playerH: 100,
            monsterH: 100,
            currentRound: 0,
            winner: null,
            logs: []
        }
    },
    computed: {
        monsterbar() {
            if (this.monsterH < 0) {
                return { width: '0%' }
            }
            return { width: this.monsterH + '%' };
        },
        playerbar() {
            if (this.playerH < 0) {
                return { width: '0%' }
            }
            return { width: this.playerH + '%' };
        },
        useSpecial() {
            return this.currentRound % 3 != 0;
        }
    },
    watch: {
        playerH(value) {
            if (value <= 0 && this.monsterH <= 0) {
                this.winner = 'Draw';
            } else if (value <= 0) {
                this.winner = 'Monster';
            }
        },
        monsterH(value) {
            if (value <= 0 && this.playerH <= 0) {
                this.winner = 'Draw';
            } else if (value <= 0) {
                this.winner = 'Player';
            }
        }
    },
    methods: {
        restartgame() {
            this.playerH = 100;
            this.monsterH = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logs = [];
        },
        attackM() {
            let atckvalue = getrand(5, 12);
            this.monsterH -= atckvalue;
            this.currentRound++;
            this.attackP();
            this.addLog('Player', 'attack', atckvalue);
        },
        attackP() {
            let atckvalue = getrand(8, 15);
            this.playerH -= atckvalue;
            this.addLog('Monster', 'attack', atckvalue);
        },
        specialattack() {
            let atckvalue = getrand(10, 25);
            this.monsterH -= atckvalue;
            this.attackP();
            this.currentRound++;
            this.addLog('Player', 'attack', atckvalue);
        },
        healer() {
            let heal = getrand(8, 20);
            this.playerH += heal
            if (this.playerH > 100) {
                this.playerH = 100;
            }
            this.attackP();
            this.currentRound++;
            this.addLog('Player', 'healed', heal);
        },
        surrend() {
            this.winner = 'Monster';
        },
        addLog(who, what, value){
            this.logs.unshift({
                by: who,
                type: what,
                value: value
            });
        }
    }
}).mount('#game');
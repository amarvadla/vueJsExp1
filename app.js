new Vue({
    el: "#app",
    data: {
        monsterHealth: 100,
        playerHealth: 100,
        isGameRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.isGameRunning = true
            this.monsterHealth = 100
            this.playerHealth = 100
            this.turns = []
        },
        attack: function () {
            let damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage
            if (this.checkWin())
                return
            this.turns.unshift({
                isPlayer: true,
                text: "player attacked monster " + damage
            })
            this.monsterAttacks()
        },
        specialAttack: function () {
            let damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage
            if (this.checkWin())
                return

            this.turns.unshift({
                isPlayer: true,
                text: "player special attack monster " + damage
            })
            this.monsterAttacks()

        }, heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10
            } else {
                this.playerHealth = 100
            }

            this.turns.unshift({
                isPlayer: true,
                text: "player heals 10"
            })

            this.monsterAttacks()

        }, giveUp: function () {
            this.isGameRunning = false
            this.turns = []
        },
        monsterAttacks: function () {
            let damage = this.calculateDamage(4, 15)
            this.playerHealth -= damage
            this.checkWin()

            this.turns.unshift({
                isPlayer: false,
                text: "monster attacked player " + damage
            })
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! new game ?')) {
                    this.startGame()
                } else {
                    this.isGameRunning = false
                }
                return true
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! new game ?')) {
                    this.startGame()
                } else {
                    this.isGameRunning = false
                }
                return true
            }
            return false
        }
    }
})
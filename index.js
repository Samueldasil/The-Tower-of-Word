const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1.0

// Criação da classe para o Piso
class Floor {
    constructor() {
        this.position = {
            x: 0,
            y: canvas.height - 140 // Definindo o piso 70px acima da parte inferior da tela
        }
        this.width = canvas.width
        this.height = 140 // Aumentando a altura do piso para 70px
    }

    draw() {
        c.fillStyle = 'black' // Defina a cor do piso
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Criação da classe Player
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100 
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 60
        this.height = 60
    }

    draw() {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // Verifica se o jogador está acima do piso para aplicar a gravidade
        if (this.position.y + this.height + this.velocity.y <= canvas.height - 140) { 
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
            this.position.y = canvas.height - this.height - 140 // Posiciona o jogador em cima do piso
        }
    }
}

const player = new Player()
const floor = new Floor() // Cria o piso
const keys = {
    right: {
        pressed: false 
    },
    left: {
        pressed: false 
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    floor.draw() // Desenha o piso
    player.update()

    // Movimento do jogador
    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else player.velocity.x = 0
}
animate()

// Eventos de pressionamento de tecla
addEventListener('keydown', ({key}) => {
    console.log(key)
     
    switch(key) {
        case 'ArrowLeft':       
        console.log('left')
        keys.left.pressed = true        
        break

        case 'ArrowRight':
        console.log('right')
        keys.right.pressed = true
        break

        case 'ArrowDown':
        console.log('down')
        break

        case 'ArrowUp':
        console.log('up')
        player.velocity.y -= 15
        break       
    }
    
    console.log(keys.right.pressed)
})

// Eventos de liberação de tecla
addEventListener('keyup', ({key}) => {
    console.log(key)
     
    switch(key) {
        case 'ArrowLeft':
        console.log('left')
        keys.left.pressed = false       
        break

        case 'ArrowRight':
        console.log('right')
        keys.right.pressed = false
        break

        case 'ArrowDown':
        console.log('down')
        break
    
        case 'ArrowUp':
        console.log('up')
        player.velocity.y -= 10
        break
    }
})
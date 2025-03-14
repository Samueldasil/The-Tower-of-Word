const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


// Criação da classe para o Piso
class Floor {
    constructor() {
        this.position = {
            x: 0,
            y: canvas.height - 140 // Definindo o piso 140px acima da parte inferior da tela
        }
        this.width = canvas.width
        this.height = 140 // Aumentando a altura do piso para 140px
    }
    
    draw() {
        c.fillStyle = 'black' // Defina a cor do piso
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


// Criação da classe Player
class Player {
    constructor() {
        this.jump = 2
        this.speed = 20
        
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
        
        this.velocity.x = 0
        this.velocity.y += gravity
        
        // Movimento do jogador
            //Ir para direita
            if(keys["ArrowRight"] || keys["KeyD"]){
                this.velocity.x = this.speed
            }
            
            //Ir para a esquerda
            if(keys["ArrowLeft"] || keys["KeyA"]){
                this.velocity.x = -this.speed
            }
            
            //Ir para cima
            if(keys["Space"] || keys["ArrowUp"] && verifyJump()){
                this.velocity.y -= this.speed * 1.5
                jumptime = Date.now()
            }
            //Ir para baixo
            if(keys["ArrowDown"] || keys["KeyS"]){
        
            }
        

            if (player.y + player.height < 0) {  
                player.y = 0 - player.height;  
            }

       

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

      
        

        // Verifica se o jogador está acima do piso para aplicar a gravidade
        if (this.position.y + this.height + this.velocity.y <= canvas.height - 140) { 
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
            this.position.y = canvas.height - this.height - 140 // Posiciona o jogador em cima do piso
            this.jump = 2
        }
        //Impede de cair pela direita
        if(this.position.x < 0) this.position.x = 0
        //Impede de cair pela esquerda
        if(this.position.x + this.width > canvas.width) this.position.x = canvas.width - this.width
    }
}


/**
 * Verifica se as condições para os pulos foram atendidas
*/
function verifyJump(){
    
    //Verifica os pulos depois do primeiro
    if(player.jump > 0 && Date.now() - jumptime > 300){
        player.jump --
        return true
    }
    
    //Verifica o primeiro pulo
    if(player.position.y + player.height + player.velocity.y <= canvas.height - 140 && player.jump === 2){
        player.jump --
        return true
    }
    
    return false
}

//Define teclas presionadas para baixo em um array
document.addEventListener("keydown", (e) => {
    keys[e.code] = true
})

//Remove as teclas que deixaram de ser pressionadas do array
document.addEventListener("keyup", (e) => {
    keys[e.code] = false
})

//VARIAVEIS GLOBAIS
    //Objetos
    const player = new Player()
    const floor = new Floor() // Cria o piso

    //Outras
    const keys = []
    let jumptime = 0;
    const gravity = 0.9

/**
 * Loop principal
*/
function animate() {
    
    //Limpa a tela
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    player.update() //Atualiza posição
    player.draw() // Desenha o player
    floor.draw() // Desenha o piso
    
    //Chama o loop princiapla de novo
    requestAnimationFrame(animate)
}

//Inicia o loop principal
animate()

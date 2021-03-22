import Phaser,{DOM} from 'phaser'
import {primaryButton} from '~/ui/button'
import WebFontFile from '~/files/font'

export default class selection extends Phaser.Scene
{
    constructor()
    {
        super('selection')
    }
    preload()
    {
        const fonts = new WebFontFile(this.load,[
            'DotGothic16'
        ])
        this.load.addFile(fonts)
    
        this.load.audio('game-music','assets/music/music_level_sokoban.ogg')
        this.load.audio('confirmation','assets/sound_effects/confirmation_003.ogg')
        this.load.audio('move', 'assets/sound_effects/maximize_004.ogg')
        this.load.audio('error', 'assets/sound_effects/error_005.ogg')
        this.load.audio('click','assets/sound_effects/click_003.ogg')
    }
    create(d: {currentLevel:number})
    {
        const width = this.scale.width
        const height = this.scale.height
        this.add.text(width *0.5, height*0.3, 'Select the difficulty level:', {
            fontFamily: 'DotGothic16',
            fontSize: 48
        })
        .setOrigin(0.5)
        
        const easylvl = primaryButton('Easy') as HTMLElement
        const ez = this.add.dom(width*0.5,height*0.45,easylvl)
            .addListener('click').once('click', () =>{
                this.sound.play('click',{volume: 0.25})
                let lvl=Math.floor(Math.random() * 7) + 1 
                console.log(lvl)
                this.scene.start('game', {level: lvl})
               
            })
        const mediumlvl = primaryButton('Medium') as HTMLElement
        this.add.dom(width*0.5,ez.y+ez.height*1.2,mediumlvl)
            .addListener('click').once('click', () =>{
                this.sound.play('click',{volume: 0.25})
                let lvl2=Math.floor(Math.random() * 7) + 8
                console.log(lvl2)
                this.scene.start('game', {level: lvl2})

            })
        const hardlvl = primaryButton('Hard') as HTMLElement
        this.add.dom(width*0.5,ez.y+ez.height*2.4,hardlvl)
                .addListener('click').once('click', () =>{
                    this.sound.play('click',{volume: 0.25})
                    let lvl3=Math.floor(Math.random() * 6) + 15
                    console.log(lvl3)
                    this.scene.start('game', {level: lvl3})
                })
                const backtoPreload = primaryButton('Back') as HTMLElement
                const backTP = this.add.dom(110,50,backtoPreload)
                    .addListener('click').once('click',() =>{
                            this.sound.play('click',{volume: 0.25})
                            this.scene.start('preloader')
                            this.sound.stopAll()
                })
    }

}


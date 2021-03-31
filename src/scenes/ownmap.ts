import Phaser from 'phaser'
import {primaryButton} from '../ui/button.jsx'

export default class OwnMap extends Phaser.Scene
{
    constructor()
    {
        super('omap')
    }
    preload()
    {
        this.load.audio('click','assets/sound_effects/click_003.ogg')
    }
    create()
    {
        const width = this.scale.width
        const height = this.scale.height
        this.add.text(width*0.15,height*0.3,'Aby zagrać na swojej własnej mapie stwórz ją według opisu na Githubie w programie Tiled',{
            fontFamily: 'DotGothic16',
            fontSize: 24
        })
        const goback = primaryButton('Back to menu') as HTMLElement
                    this.add.dom(110,50,goback)
                        .addListener('click').once('click',() =>{
                            this.sound.play('click',{volume: 0.25})
                            this.scene.start('preloader')
                            this.sound.stopAll()
                        })
        const nextlvlbutton = primaryButton('Level 21') as HTMLElement
        this.add.dom(width*0.2,height*0.5,nextlvlbutton)
            .addListener('click').once('click', () =>{
                this.sound.play('click',{volume: 0.25})
                this.scene.start('game',{level:21})
            })
        const lvl22 = primaryButton('Level 22') as HTMLElement
        this.add.dom(width*0.2,height*0.6,lvl22)
                .addListener('click').once('click', () =>{
                    this.sound.play('click',{volume: 0.25})
                    this.scene.start('game',{level:22})
            })
        const lvl23 = primaryButton('Level 23') as HTMLElement
                this.add.dom(width*0.2,height*0.7,lvl23)
                        .addListener('click').once('click', () =>{
                            this.sound.play('click',{volume: 0.25})
                            this.scene.start('game',{level:23})
             }) 
        const lvl24 = primaryButton('Level 24') as HTMLElement
                this.add.dom(width*0.4,height*0.5,lvl24)
                    .addListener('click').once('click', () =>{
                     this.sound.play('click',{volume: 0.25})
                     this.scene.start('game',{level:24})
                })
        const lvl25 = primaryButton('Level 25') as HTMLElement
                this.add.dom(width*0.4,height*0.6,lvl25)
                        .addListener('click').once('click', () =>{
                            this.sound.play('click',{volume: 0.25})
                            this.scene.start('game',{level:25})
                        }) 
        const lvl26 = primaryButton('Level 26') as HTMLElement
                        this.add.dom(width*0.4,height*0.7,lvl26)
                                .addListener('click').once('click', () =>{
                                    this.sound.play('click',{volume: 0.25})
                                    this.scene.start('game',{level:26})
                                })
        const lvl27 = primaryButton('Level 27') as HTMLElement
            this.add.dom(width*0.6,height*0.5,lvl27)
                  .addListener('click').once('click', () =>{
                     this.sound.play('click',{volume: 0.25})
                     this.scene.start('game',{level:27})
                         })
        const lvl28 = primaryButton('Level 28') as HTMLElement
                this.add.dom(width*0.6,height*0.6,lvl28)
                    .addListener('click').once('click', () =>{
                        this.sound.play('click',{volume: 0.25})
                        this.scene.start('game',{level:28})
                                 })
        const lvl29 = primaryButton('Level 29') as HTMLElement
                                 this.add.dom(width*0.6,height*0.7,lvl29)
                                         .addListener('click').once('click', () =>{
                                             this.sound.play('click',{volume: 0.25})
                                             this.scene.start('game',{level:29})
                                         })                
         const lvl30 = primaryButton('Level 30') as HTMLElement
                this.add.dom(width*0.8,height*0.5,lvl30)
                    .addListener('click').once('click', () =>{
                        this.sound.play('click',{volume: 0.25})
                        this.scene.start('game',{level:30})
                 })   
        const lvl31 = primaryButton('Level 31') as HTMLElement
                 this.add.dom(width*0.8,height*0.6,lvl31)
                     .addListener('click').once('click', () =>{
                         this.sound.play('click',{volume: 0.25})
                         this.scene.start('game',{level:31})
                  })
        const lvl32 = primaryButton('Level 32') as HTMLElement
                  this.add.dom(width*0.8,height*0.7,lvl32)
                      .addListener('click').once('click', () =>{
                          this.sound.play('click',{volume: 0.25})
                          this.scene.start('game',{level:32})
        })                                                    
    }
}

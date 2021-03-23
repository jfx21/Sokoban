import Phaser from 'phaser'
import WebFontFile from '../files/font.ts'
import { primaryButton } from '~/ui/button.jsx'

export default class Preloader extends Phaser.Scene
{

constructor()
{
    super('preloader')
}
preload()
{
    const fonts = new WebFontFile(this.load,[
        'Poppins',
        'Righteous',
        'DotGothic16'
    ])
    this.load.addFile(fonts)

    this.load.audio('game-music','assets/music/music_level_sokoban.ogg')
    this.load.audio('confirmation','assets/sound_effects/confirmation_003.ogg')
    this.load.audio('click','assets/sound_effects/click_003.ogg')
}
create()
{
    this.sound.play('game-music',{
        loop:true,
        volume: 0.005
    }) 
    const width = this.scale.width
    const height = this.scale.height
    //first scene main_menu
    const sok = this.add.text(width*0.38,height*0.3,'Sokoban',{
        fontFamily: 'DotGothic16',
        fontSize: 100
    })
    const first_vs = primaryButton('First Version') as HTMLElement
    this.add.dom(width*0.3,height*0.5,first_vs)
        .addListener('click').once('click', () =>{
            this.sound.play('click', {volume: 0.25})
            this.scene.start('selection')
        })
    //sc version
    const sec_vs = primaryButton('Second Version') as HTMLElement
        this.add.dom(width*0.5,height*0.5,sec_vs)
            .addListener('click').once('click', () =>{
                this.sound.play('click', {volume: 0.25})
                this.scene.start('avancer')
            })
    //3rd version
    const thrd_vs = primaryButton('Third Version') as HTMLElement
            this.add.dom(width*0.7,height*0.5,thrd_vs)
                .addListener('click').once('click', () =>{
                    this.sound.play('click', {volume: 0.25})
                    this.scene.start('omap')
                })

}
}

import Phaser from 'phaser'
import {primaryButton} from '../ui/button.jsx'


export default class Results extends Phaser.Scene 
{   
   private score
   private current_lvl =1
    constructor()
    {
        super('results')
        
    }
    preload()
    {
        this.load.audio('click','assets/sound_effects/click_003.ogg')
    }
    init(sts:{pts:number,dcl:number})
    {
        this.score = sts.pts
        this.current_lvl = sts.dcl
        console.log('score',this.score,'lvl',this.current_lvl)
    }
    create()
    {
        const width = this.scale.width
        const height = this.scale.height
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () =>{
            this.cache.tilemap.remove('tilemap')
        });
        
        this.add.text(width *0.45, height*0.2, 'Results', {
            fontFamily: 'DotGothic16',
            fontSize: 48
        })
        
        this.add.text(width*0.4,height*0.3,`Last score: ${this.score} `,{
            fontFamily: 'DotGothic16',
            fontSize: 32   
        });
        delete this.score

        const goback = primaryButton('Back to menu') as HTMLElement
                    this.add.dom(110,50,goback)
                        .addListener('click').once('click',() =>{
                            this.sound.play('click',{volume: 0.25})
                            if(this.current_lvl == undefined)
                                this.scene.start('game',{level:1})
                            else{
                                this.scene.start('game',{level: this.current_lvl+1})
                            }
                        })
    }
    
}

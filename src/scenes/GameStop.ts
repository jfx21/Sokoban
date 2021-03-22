
import Phaser, { DOM} from 'phaser'
import {primaryButton} from '../ui/button'

export default class LevelFinishedScene extends Phaser.Scene 
{
    //second version lvlavancer engine 
    public points:number = 0
    constructor()
    {
        super('level-finished')
    }
    create(d: {moves: number,currentLevel:number})
    {

        const data = Object.assign({moves: 0, currentLevel:1 },d)
        const width = this.scale.width
        const height = this.scale.height
      
        this.add.text(width *0.5, height*0.3, 'Well Done!', {
            fontFamily: 'DotGothic16',
            fontSize: 48
        })
        .setOrigin(0.5)
        const text =this.add.text(width *0.5,height *0.4,`Moves: ${data.moves}`,{
            fontFamily: 'DotGothic16'
        }).setOrigin(0.5)

        const restartbutton = primaryButton('Restart') as HTMLElement
        const restart = this.add.dom(width*0.5,height*0.7,restartbutton)
            .addListener('click').once('click', () =>{
                this.sound.play('click',{volume: 0.25})
                this.scene.start('game', {level: data.currentLevel})
            })
            //points check
                if(data.currentLevel<7)
                {
                    //points Ez
                    if(data.moves != 0)
                    if((data.currentLevel ==1 && data.moves <=10 && data.moves != 0) ||(data.currentLevel <=2 && data.moves==27) ||(data.currentLevel ==3 && data.moves<=25) ||(data.currentLevel ==4 && data.moves<=26) ||(data.currentLevel ==5 && data.moves<=14) ||(data.currentLevel ==6 && data.moves<=22)||(data.currentLevel ==7 && data.moves<=11) )
                        this.points+=2
                    else
                        this.points++
                    console.log('points',this.points)
                }
                else if(data.currentLevel>7 &&data.currentLevel <15)
                {
                    //points med
                    if(data.moves != 0)
                    if((data.currentLevel ==8 && data.moves<=108) ||(data.currentLevel ==9 && data.moves<=45)||(data.currentLevel ==10 && data.moves<=44) || (data.currentLevel ==11 && data.moves<=72) ||(data.currentLevel ==12 && data.moves<=22) ||(data.currentLevel ==13 && data.moves<=36) ||(data.currentLevel ==14 && data.moves<=38))
                        this.points+=4
                    else
                        this.points+=2
                    console.log('points',this.points)
                }
                else if(data.currentLevel>14)
                {
                    //points hard
                    if(data.moves != 0)
                    if((data.currentLevel ==15) ||(data.currentLevel ==16 && data.moves<=109)||(data.currentLevel ==17 && data.moves<=36) || (data.currentLevel ==18 && data.moves<=86) ||(data.currentLevel ==19 && data.moves<=29) ||(data.currentLevel ==20 && data.moves<=44))
                        this.points+=8
                    else {this.points+=4}
                    console.log('points',this.points)
                }
                
        const nextlvlbutton = primaryButton('Next Level') as HTMLElement
        this.add.dom(width*0.5,restart.y+restart.height*1.2,nextlvlbutton)
            .addListener('click').once('click', () =>{
                this.sound.play('click',{volume: 0.25})
                
                this.scene.start('game',{level: data.currentLevel+1})
                if(data.currentLevel+1>20)
                    {
                        return
                    }
            })
        
        const Save = primaryButton('Save') as HTMLElement
        const sv = this.add.dom(width*0.5,height*0.622,Save)
                    .addListener('click').once('click',()=>{
                        this.sound.play('click',{volume: 0.25})
                        this.scene.start('results',{pts: this.points,dcl: data.currentLevel})
                        this.points = 0
                        console.log(this.points)
                    })
                        
        
    }
}

import Phaser from 'phaser'

//second version

export default class Avancer extends Phaser.Scene
{
    
    constructor()
    {
        super('avancer')
    }
    
    create()
    {   
        const width = this.scale.width
        const height = this.scale.height
        this.scene.start('game',{level:1})
    }
}

import Phaser, { Data, Tilemaps } from 'phaser'
import * as Colors from '../consts/color'
import {boxColorToTargetColor,targetColorToBoxColor} from '../utils/ColorUtils'
import {offsetForDirection} from '../utils/TileUtils'
import {Direction} from '../consts/Direction'
import {baseTweenForDirection} from '../utils/TweenU'
import isAllTargetsCovered from '../targets/isAllTargetsCovered'
import {primaryButton} from '../ui/button'



export default class Game extends Phaser.Scene 
{
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    
    private player?: Phaser.GameObjects.Sprite
    private layer?: Phaser.Tilemaps.TilemapLayer

    private targetsCoveredByColor: {[key: number]: number} ={}
    private boxesByColor: {[key:number]:Phaser.GameObjects.Sprite[]}={}
    private movesCountLabel?: Phaser.GameObjects.Text
    
    private movesCount = 0
    private currentLevel 

    constructor()
     {
        super('game')
    }
    init(d: {level: number})
    {
        
        let lvl=Math.floor(Math.random() *7) + 1 
        const data = Object.assign({level: lvl},d)
        this.currentLevel = data.level
        this.movesCount = 0
    }

    preload()
    {
        
        
        this.load.tilemapTiledJSON('tilemap',`levels/level${this.currentLevel}.json`)
        
        this.load.spritesheet('tiles', 'assets/sokoban_tilesheet.png', {
            frameWidth: 64,
            startFrame: 0
        })
        this.cursors = this.input.keyboard.createCursorKeys()

        this.load.audio('click','assets/sound_effects/click_003.ogg')
        this.load.audio('game-music','assets/music/music_level_sokoban.ogg')
        this.load.audio('confirmation','assets/sound_effects/confirmation_003.ogg')
        this.load.audio('move', 'assets/sound_effects/maximize_004.ogg')
        this.load.audio('error', 'assets/sound_effects/error_005.ogg')
    }

create(d: {level: number}) 
{
        const map = this.make.tilemap({key: 'tilemap'})
        

        const tiles = map.addTilesetImage('sokoban','tiles')
        this.layer = map.createLayer('Level', tiles,420 , 50)
       
        this.player = this.layer.createFromTiles(53, 0, { key: 'tiles', frame: 52 }).pop()
        this.player?.setOrigin(0)

        this.createPlayerAnims()
        this.extractBoxes(this.layer)
        //moves counter
        this.movesCountLabel = this.add.text(1190,10,`Moves: ${this.movesCount}`,{
            fontFamily: 
            'DotGothic16',
            fontSize: 40
        })
        
        //save state TODO
        
        //back to menu button I vs
        const goback = primaryButton('Back to menu') as HTMLElement
                    this.add.dom(110,50,goback)
                        .addListener('click').once('click',() =>{
                            this.sound.play('click',{volume: 0.25})
                            this.scene.start('selection')
                            this.sound.stopAll()
                        })
                  
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () =>{
            this.cache.tilemap.remove('tilemap')
        })
        //Results
        const Results = primaryButton('Results') as HTMLElement
        const res = this.add.dom(110,110,Results)
            .addListener('click').once('click',()=>{
                this.sound.play('click',{volume: 0.25}),
                this.scene.start('results')
               
            })
    }
    
    update() 
    {
        if (!this.cursors || !this.player) {
            return
        }
        const justLeft = Phaser.Input.Keyboard.JustDown(this.cursors.left!)
        const justRight = Phaser.Input.Keyboard.JustDown(this.cursors.right!)
        const justDown = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
        const justUp = Phaser.Input.Keyboard.JustDown(this.cursors.up!)

        if (justLeft) {

            this.tweenMove(Direction.Left, () =>{
                this.player?.anims.play('left',true)
            })
        }
        else if (justRight) 
            {
            this.tweenMove(Direction.Right, () =>{
                        this.player?.anims.play('right', true)
                    })
            }
        
        else if (justUp) 
        {
                this.tweenMove(Direction.Up, () =>{
                            this.player?.anims.play('up', true)
                        })
                
        }
        else if (justDown)
         {
                this.tweenMove(Direction.Down, () =>{
                            this.player?.anims.play('down', true)
                        })
                
        }
    }
private updateMovesCount()
{
    if(!this.movesCountLabel)
    {
        return
    }
    this.movesCountLabel.text = `Moves: ${this.movesCount}`
}

private handlePlayerStopped()
{
    this.movesCount++
    this.stopPlayerAnimation()
    this.updateMovesCount()
        const levelFinished = isAllTargetsCovered(this.targetsCoveredByColor,this.boxesByColor)
            if(levelFinished)
            {
                this.scene.start('level-finished',{
                moves:  this.movesCount,
                currentLevel: this.currentLevel
            })
            }
}

private changeTargetCoveredCountForColor(color: number,change: number)
{
    if(!(color in this.targetsCoveredByColor))
    {
        this.targetsCoveredByColor[color]=0
    }

    this.targetsCoveredByColor[color] += change

    if(change >0)
    {
        this.sound.play('confirmation',{volume: 0.25})
    }
}
private extractBoxes(layer: Phaser.Tilemaps.TilemapLayer)
{
    const boxColors = [
        Colors.BoxOrange,
        Colors.BoxRed,
        Colors.BoxBlue,
        Colors.BoxGreen,
        Colors.BoxGrey
    ]
    boxColors.forEach(color => {
        this.boxesByColor[color] = layer.createFromTiles(color+1,0,{ key: 'tiles', frame: color })
            .map(box => box.setOrigin(0))
        
        const targetColor = boxColorToTargetColor(color)
        this.targetsCoveredByColor[targetColor] = 0
    })
}
private tweenMove(direction: Direction,onStart: () => void)
    {
        if(!this.player || this.tweens.isTweening(this.player!))
        {
            return 
        }
        const x = this.player.x
        const y = this.player.y

        const offset = offsetForDirection(direction)
        const ox = x + offset.x
        const oy = y + offset.y

        const hasWall = this.hasWallAt(ox,oy)
        if(hasWall)
        {
            this.sound.play('error',{volume: 0.25})
            return
        }
        const baseTween = baseTweenForDirection(direction)

        const boxData = this.getBoxDataAt(ox, oy)
            if (boxData)
            {
                const nextOffset = offsetForDirection(direction,2)
                const nx = x + nextOffset.x 
                const ny = y + nextOffset.y
                const nextBoxData = this.getBoxDataAt(nx,ny)
                

                if(nextBoxData)
                {
                    this.sound.play('error',{volume: 0.25})
                    return
                }
                if(this.hasWallAt(nx,ny))
                {
                    this.sound.play('error',{volume: 0.25})
                    return
                }
                

                const box = boxData.box
                const boxColor = boxData.color
                const targetColor = boxColorToTargetColor(boxColor)

                const coveredTarget  = this.hasTargetAt(box.x,box.y,targetColor)
                if(coveredTarget)
                {
                    this.changeTargetCoveredCountForColor(targetColor, -1)
                }
                
                this.sound.play('move',{volume: 0.1})

                this.tweens.add(Object.assign(
                    baseTween,
                        {
                        targets: box,
                        onComplete: () => {
                            const coveredTarget  = this.hasTargetAt(box.x,box.y,targetColor)
                            if(coveredTarget)
                            {
                                this.changeTargetCoveredCountForColor(targetColor, 1)
                            }   
                        }
                    }
                ))
            }
            this.tweens.add(Object.assign(
                baseTween,
                {
                    targets: this.player,
                    onComplete: this.handlePlayerStopped,
                    onCompleteScope: this,
                    onStart
                }
            ))
    }
private stopPlayerAnimation()
    {
        if(!this.player) {
            return
        }
        const key = this.player?.anims.currentAnim.key
        if (!key.startsWith('idle-')) {
            this.player.anims.play(`idle-${key}`, true)
        }
    }
private getBoxDataAt(x: number, y: number) 
{
        const keys = Object.keys(this.boxesByColor)
        for(let i = 0; i < keys.length; ++i)
        {
            const color = keys[i]
            const box = this.boxesByColor[color].find(box => {
                const rect = box.getBounds()
                return rect.contains(x, y)
            })
            if(!box)
            {
                continue
            }
            return {
                box,
                color: parseInt(color)
            }
        }
    return undefined
}
private hasWallAt(x: number, y: number)
{
    if(!this.layer)
    {
        return false
    }
    const tile = this.layer.getTileAtWorldXY(x,y)
    if(!tile)
    {
        return false
    }
    return tile.index === 88
}
private hasTargetAt(x: number, y: number, tileIndex: number) 
{
    if(!this.layer)
    {
        return false
    }
    const tile = this.layer.getTileAtWorldXY(x,y)
    if(!tile)
    {
        return false
    }
    return tile.index === tileIndex+1
}
private createPlayerAnims() 
{
        this.anims.create(
            {
                key: 'idle-down',
                frames: [{ key: 'tiles', frame: 52 }]
            })
    
        this.anims.create({
            key: 'idle-left',
            frames: [{ key: 'tiles', frame: 81 }]
        })
    
        this.anims.create({
            key: 'idle-right',
            frames: [{ key: 'tiles', frame: 78 }]
        })
    
        this.anims.create({
            key: 'idle-up',
            frames: [{ key: 'tiles', frame: 55 }]
        })
        this.anims.create(
            {
                key: 'right',
                frames: this.anims.generateFrameNumbers('tiles', { start: 78, end: 80 }),
                frameRate: 10,
                repeat: -1
            })
        this.anims.create(
            {
                key: 'left',
                frames: this.anims.generateFrameNumbers('tiles', { start: 81, end: 83 }),
                frameRate: 10,
                repeat: -1
            })
        this.anims.create(
            {
                key: 'up',
                frames: this.anims.generateFrameNumbers('tiles', { start: 55, end: 57 }),
                frameRate: 10,
                repeat: -1
            })
        this.anims.create(
            {
                key: 'down',
                frames: this.anims.generateFrameNumbers('tiles', { start: 55, end: 57 }),
                frameRate: 10,
                repeat: -1
            })      
}
}
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
             if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    }); 
}
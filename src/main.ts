import Phaser from 'phaser'
import Game from './scenes/Game.ts'
import GameStop from "./scenes/GameStop.ts"
import Preloader from './scenes/preload.ts'
import selection from './scenes/selection.ts'
import avancer from './scenes/lvlavancer.ts'
import results from './scenes/results.ts'
import OwnMap from './scenes/ownmap.ts'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'phaser',
	dom: {
		createContainer: true
	},
	width: innerWidth,
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [Preloader,selection,avancer,results,OwnMap,Game, GameStop]
	

}

export default new Phaser.Game(config)

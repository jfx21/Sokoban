import Phaser from 'phaser'
import Game from './scenes/Game'
import GameStop from "./scenes/GameStop"
import Preloader from './scenes/preload'
import selection from './scenes/selection'
import avancer from './scenes/lvlavancer'
import results from './scenes/results'
import OwnMap from './scenes/ownmap'

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

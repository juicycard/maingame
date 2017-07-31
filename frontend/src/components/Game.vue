<template>
  <div id="game">
    <canvas id="game-canvas" :width="dim.w" :height="dim.h"></canvas>
    <ul id="hotbar" @click="itemSwap"><li class="active"><img src="/static/assets/Shovel.png"></li><li><img src="/static/assets/Axe.png"></li></ul>
  </div>
</template>

<script>
import Player from '@/gameobjects/player'
import GardenPatch from '@/gameobjects/gardenPatch'

export default {
  name: 'NewGame',
  data () {
    return {
      assets: {
        v: null
      },
      dim: {
        w: 0,
        h: 0
      },
      ctx: null,
      octx: null,
      activeKeys: {},
      entities: {
        player: null,
        environment: []
      }
    }
  },
  methods: {
    animateFrame (timestamp) {
      this.entities.player.update(timestamp, this.activeKeys)

      // Render map at player pos.
      let sx = this.entities.player.pos.x - (this.dim.w / 2)
      let sy = this.entities.player.pos.y - (this.dim.h / 2)
      let mapData = this.octx.getImageData(sx, sy, this.dim.w, this.dim.h)
      this.ctx.putImageData(mapData, 0, 0)

      this.entities.environment.forEach((e) => {
        e.update(timestamp)
        e.draw(this.ctx)
      })

      this.entities.player.draw(this.dim, this.ctx)
      requestAnimationFrame((ts) => { this.animateFrame(ts) })
    },
    itemSwap (e) {
      if (e.target.tagName === 'LI') {
        document.querySelector('#hotbar li.active').classList = []
        e.target.classList = ['active']
      }
    }
  },
  mounted () {
    let canvas = document.getElementById('game-canvas')
    canvas.setAttribute('tabindex', '0')
    canvas.focus()

    window.addEventListener('keydown', (e) => {
      this.activeKeys[e.keyCode] = true
    }, false)

    window.addEventListener('keyup', (e) => {
      this.activeKeys[e.keyCode] = false
    }, false)

    canvas.addEventListener('click', (e) => {
      let sx = this.entities.player.pos.x - (this.dim.w / 2) - e.clientX
      let sy = this.entities.player.pos.y - (this.dim.h / 2) + e.clientY
      this.entities.environment.push(new GardenPatch({
        x: sx,
        y: sy
      }))
    }, false)

    this.ctx = canvas.getContext('2d')
    this.dim.w = document.getElementById('game').offsetWidth
    this.dim.h = document.getElementById('game').offsetHeight
    this.entities.player = new Player(localStorage.getItem('character'))

    this.assets.map = new Image()
    this.assets.map.src = '/static/map/Map.png'
    this.assets.map.onload = () => {
      offscreenCanvas.width = this.assets.map.naturalWidth
      offscreenCanvas.height = this.assets.map.naturalHeight
      this.octx.drawImage(this.assets.map, 0, 0)

      let hq = new Image()
      hq.src = '/static/hq/HQ.png'
      hq.onload = () => {
        this.octx.drawImage(hq, 1400, 100)
      }
    }

    let offscreenCanvas = document.createElement('canvas')
    offscreenCanvas.width = this.dim.w
    offscreenCanvas.height = this.dim.h
    this.octx = offscreenCanvas.getContext('2d')

    requestAnimationFrame((ts) => { this.animateFrame(ts) })
  }
}
</script>

<style lang="scss" scoped>
  #game {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  ul#hotbar {
    position: fixed;
    bottom: 4vh;
    height: 8vh;
    width: 80vw;
    background-color: rgba(255, 255, 255, 0.22);
    left: 10vw;
    border-radius: 4px;
    list-style-type: none;
    padding: 0 10px;
    margin: 0;

    li {
      float: left;
      text-align: center;
      width: 6vh;
      height: 8vh;
      border: 2px solid #000;
      cursor: pointer;
      margin-left: 10px;

      &.active {
        border: 2px solid #eec300;
      }

      img {
        margin-top: 1vh;
        max-height: 6vh;
        max-width: 4vh;
      }
    }
  }
</style>

export default class {
  constructor (pos) {
    this.loaded = false
    this.pos = pos

    this.image = new Image()
    this.image.onload = () => { this.loaded = true }
    this.image.src = '/static/assets/Soil.png'
  }

  update (timestamp) {}

  draw (ctx) {
    if (!this.loaded) {
      return
    }

    let x = this.pos.x - (this.image.naturalWidth * 0.50)
    let y = this.pos.y - (this.image.naturalHeight * 0.50)
    ctx.drawImage(this.image, x, y, this.image.naturalWidth, this.image.naturalHeight)
  }
}

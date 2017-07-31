export default class {
  constructor (type, pos) {
    this.loadedCount = 0
    this.pos = pos || {
      x: 2030,
      y: 710
    }

    this.image = this.imageS = new Image()
    this.imageS.onload = () => { this.loadedCount++ }
    this.imageS.src = '/static/players/' + type + '/S.png'

    this.imageN = new Image()
    this.imageN.src = '/static/players/' + type + '/N.png'
    this.imageN.onload = () => { this.loadedCount++ }

    this.imageE = new Image()
    this.imageE.src = '/static/players/' + type + '/E.png'
    this.imageE.onload = () => { this.loadedCount++ }

    this.imageW = new Image()
    this.imageW.src = '/static/players/' + type + '/W.png'
    this.imageW.onload = () => { this.loadedCount++ }

    this.r = 0
    this.d = true
    this.walking = false

    this.cardinalKeys = {65: 'left', 87: 'up', 68: 'right', 83: 'down', 0: false}
    this.cardinalKeysArr = [65, 87, 68, 83]
  }

  update (timestamp, activeKeys) {
    let activeCardinals = this.cardinalKeysArr.filter(k => activeKeys[k] === true)
    let moveSpeed = 8
    this.walking = activeCardinals.length > 0

    if (this.walking) {
      if (Math.abs(this.r) > 0.1) {
        this.d = !this.d
      }
      this.r = this.d ? this.r += 0.04 : this.r -= 0.04
      activeCardinals.forEach((key) => {
        switch (this.cardinalKeys[key]) {
          case 'left':
            this.pos.x -= moveSpeed
            this.image = this.imageW
            break
          case 'up':
            this.pos.y -= moveSpeed
            this.image = this.imageN
            break
          case 'right':
            this.pos.x += moveSpeed
            this.image = this.imageE
            break
          case 'down':
            this.pos.y += moveSpeed
            this.image = this.imageS
            break
        }
      })
    }
  }

  rotateAndPaintImage (ctx, image, angleInRad, positionX, positionY, axisX, axisY) {
    ctx.translate(positionX, positionY)
    ctx.rotate(angleInRad)
    ctx.drawImage(image, -axisX, -axisY, this.image.naturalWidth * 0.30, this.image.naturalHeight * 0.30)
    ctx.rotate(-angleInRad)
    ctx.translate(-positionX, -positionY)
  }

  draw (dim, ctx) {
    if (this.loadedCount !== 4) {
      return
    }

    let x = (dim.w / 2) - (this.image.naturalWidth * 0.15)
    let y = (dim.h / 2) - (this.image.naturalHeight * 0.15)
    this.rotateAndPaintImage(ctx, this.image, this.r, x, y, (this.image.naturalWidth * 0.15), (this.image.naturalHeight * 0.15))
    // ctx.drawImage(this.image, x, y, this.image.naturalWidth * 0.30, this.image.naturalHeight * 0.30)
  }
}

<template>
  <div id="landing" class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="wobble">
          JUICY CARD FARM!<br/>
          <img class="logo" src="/static/logo.png">
        </h1>
        <img id="new-game-button" class="logo" src="/static/ui/new-game-button.png" @click="newGame">
        <audio src="/static/audio/Jockers_Dance_Orchestra_-_03_-_The_Royal_Vagabond.mp3" autoplay></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data () {
    return {
    }
  },
  methods: {
    newGame () {
      this.$router.push('new-game')
    }
  }
}
</script>

<style lang="scss" scoped>
  #landing {
    text-align: center;
    margin-top: 80px;

    h1 {
      font-size: 50px;
    }

    img {
      max-width: 50%;
    }

    #new-game-button {
      max-width: 30%;
      cursor: pointer;
      margin-top: 40px;

      &:active {
        background-color: #f0f0f0;
        border-radius: 40px;
      }
    }
  }

  @keyframes wobble  {
    0%  { transform:  rotate(0deg); }
    20%  { transform:  rotate(8deg); }
    50%  { transform:  rotate(-8deg); }
    100%  { transform:  rotate(0deg); }
  }

  .wobble { animation: wobble 5s infinite; }
</style>

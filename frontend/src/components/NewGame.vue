<template>
  <div id="new-game" class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1><small>Character Choice:</small> {{characterMeta[characters[selectedCharacterIndex]].name}}</h1>
      </div>
    </div>
    <div class="row">
      <div id="avatar" class="col-12">
        <div class="wrap">
          <div id="character-left" @click="characterLeft">
            <icon name="caret-left" scale="4"></icon>
          </div>
          <img :src="'/static/players/' + characters[selectedCharacterIndex] + '/S.png'">
          <div id="character-right" @click="characterRight">
            <icon name="caret-right" scale="4"></icon>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2><icon name="star"></icon> Character Bonus <icon name="star"></icon></h2>
        <p v-html="characterMeta[characters[selectedCharacterIndex]].bonus"></p>
        <img id="done-button" class="logo" src="/static/ui/done-button.png" @click="done">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewGame',
  data () {
    return {
      selectedCharacterIndex: 0,
      characters: [
        'lavid',
        'lek',
        'cassie',
        'sat'
      ],
      characterMeta: {
        'lavid': {
          name: 'Lavid Deeds',
          bonus: '+10% energy per day<br/>increased chance of successful negotiations'
        },
        'lek': {
          name: 'Lek Chim',
          bonus: '+25% speed when growing technology cards'
        },
        'cassie': {
          name: 'Cassie Caranas',
          bonus: '+15% profit on all cards sold'
        },
        'sat': {
          name: 'Sat Nalvione',
          bonus: 'Greatly increased chance of foraged card seeds'
        }
      }
    }
  },
  methods: {
    characterRight () {
      this.selectedCharacterIndex = this.selectedCharacterIndex + 1 < this.characters.length ? this.selectedCharacterIndex + 1 : 0
    },
    characterLeft () {
      this.selectedCharacterIndex = this.selectedCharacterIndex - 1 > 0 ? this.selectedCharacterIndex - 1 : this.characters.length - 1
    },
    done () {
      localStorage.setItem('character', this.characters[this.selectedCharacterIndex])
      this.$router.push('game')
    }
  }
}
</script>

<style lang="scss" scoped>
  #new-game {
    text-align: center;
    margin-top: 40px;

    h1 {
      font-size: 60px;
    }

    h2 {
      margin-top: 40px;
    }

    p {
      font-size: 20px;
      margin-top: 20px;
    }

    #new-game-button {
      max-width: 50%;
      cursor: pointer;

      &:active {
        background-color: #f0f0f0;
        border-radius: 40px;
      }
    }

    #avatar {
      .wrap {
        margin-top: 50px;
        display: inline-block;
        position: relative;

        #character-left {
          position: absolute;
          top: 48%;
          left: -70%;
          cursor: pointer;
        }

        #character-right {
          position: absolute;
          top: 48%;
          right: -70%;
          cursor: pointer;
        }
      }

      img {
        max-height: 38vh;
      }
    }

    #done-button {
      max-width: 30vw;
      cursor: pointer;

      &:active {
        background-color: #f0f0f0;
        border-radius: 40px;
      }
    }
  }
</style>

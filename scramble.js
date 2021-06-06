/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

 const app = Vue.createApp({

  data(){

      return {

          title: "Welcome To Scramble by Sasan",
          words: [
              'blue',
              'red',
              'yellow',
              'green',
              'black',
              'pink',
              'purpule',
              'grey',
              'white',
              'orange'
          ],

          points: 0,
          strikes: 0,
          passes: 3,
          scrambled: '',
          unscrambled: '',
          input: '',
          state: ''
      }
  },

  methods: {
      handleSubmit(){
          if(this.input === this.unscrambled){
              this.points++
              this.input = ''
              this.state = 'correct'
              let selected = shuffle(this.words)[0]
              let messed = shuffle(selected)
              this.unscrambled = selected
              this.scrambled = messed
          }else{
              this.strikes++
              if(this.strikes === 3){
                  this.state = 'lost'
              }else{
                  this.state = 'wrong'
                  this.input = ''
              }
          }
          this.save()
      },
      onPass(){
          if(this.passes > 0){
              this.passes--
              this.state = 'pass'
              let selected = shuffle(this.words)[0]
              let messed = shuffle(selected)
              this.unscrambled = selected
              this.scrambled = messed
          }
          this.save()
      },
      onPlay(){
          this.state = ''
          this.points = 0
          this.strikes = 0
          this.passes = 3
          let selected = shuffle(this.words)[0]
          let messed = shuffle(selected)
          this.unscrambled = selected
          this.scrambled = messed
          this.save()

      },
      save(){

          localStorage.state = this.state

          localStorage.points = this.points

          localStorage.strikes = this.strikes

          localStorage.passes = this.passes

          localStorage.scrambled = this.scrambled

          localStorage.unscrambled = this.unscrambled
      },
      loadStorage(){

          this.state = localStorage.state

          this.points = parseInt(localStorage.points)

          this.strikes = parseInt(localStorage.strikes)

          this.passes = parseInt(localStorage.passes) 

          this.scrambled = localStorage.scrambled

          this.unscrambled = localStorage.unscrambled
      },
  },

  mounted() {    

      if(localStorage.scrambled){

          this.loadStorage()
      }

      let selected = shuffle(this.words)[0]

      let messed = shuffle(selected)

      this.unscrambled = selected

      this.scrambled = messed
  }, 
})
app.mount('#app')	
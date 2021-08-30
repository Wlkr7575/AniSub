<template>
  <div class="carousel">
    <v-carousel v-if="$vuetify.breakpoint.smAndDown" hide-delimiters show-arrows-on-hover height="300px">
      <v-carousel-item v-for="item in random.slice(0,5)" :key="item.title" :src="item.imgUrl">
        <v-sheet style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);" height="100%" tile>
          <v-row class="fill-height d-flex flex-column pb-2" align="center" justify="end">
            <div class="headline font-weight-bold text-center">{{item.title}}</div>
            <v-btn tile router v-bind:to="{name: 'detail',params:{detail:item.id}}">Үзэх</v-btn>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
        <v-carousel v-if="$vuetify.breakpoint.mdAndUp" hide-delimiters show-arrows-on-hover height="350px">
      <v-carousel-item v-for="item in random.slice(0,5)" :key="item.title" :src="item.imgUrl">
        <v-sheet style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);" height="100%" tile>
          <v-row class="fill-height d-flex flex-column pb-2" align="center" justify="end">
            <div class="headline font-weight-bold text-center">{{item.title}}</div>
            <v-btn tile router v-bind:to="{name: 'detail',params:{detail:item.id}}">Үзэх</v-btn>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  import db from '@/views/fb'
  export default {
    data() {
      return {
        News: [],
        Movie:[]
      }
    },
    computed: {
      MyList() {
        return this.News.random()
      },
      random() {
        function shuffle(array) {
          var currentIndex = array.length,
            temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }
        return shuffle(this.News);
      }
    },
    created() {
      db.collection("Tv_Series").onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === "added") {
            this.News.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        });
      })
    }
  }
</script>
<template>
<div v-if="loading">
  <v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-text>
          <div class="text-md-center" v-if="user">
            <v-icon large color="green darken-2">mdi-check-circle</v-icon>
              <h1 class="green--text">Login Success</h1>
              <h4 class="headline mb-0"><b class="red--text">Name :</b> {{ pro.name }}</h4>
              <h4 class="headline mb-0"><b class="red--text">Email :</b> {{ user.email }}</h4>
              <h4 class="headline mb-0"><b class="red--text">Email :</b> {{ user.id }}</h4>
          </div>
        </v-card-text>
                <v-sheet>
            <v-img height="300" :src="pro.img">
                <v-row align="end" class="lightbox white--text pa-2 fill-height"
                    style="box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.8);background-image: linear-gradient(to top, rgba(0, 0, 0, 5.4) 0%, transparent 122px);">
                    <v-avatar class="profile" color="grey" size="165">
                        <v-img :src="pro.imgPro"></v-img>
                    </v-avatar>
                    <v-col>
                        <v-card-title centered>{{pro.name}}</v-card-title>
                    </v-col>
                </v-row>
            </v-img>
        </v-sheet>
     </v-card>
    </v-flex>
  </v-layout>
  </v-container>
  </div>
  <div v-else><load></load></div>
</template>

<script>
import db from '@/views/fb'
import load from '@/components/Preloader/Preloader'
  export default {
    data(){
      return{
        pro: [],
        loading:false
      }
    },
    components:{
      'load':load
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
    },
    created(){
                      db.collection('user').doc(this.$store.getters.user.id).get()
                    .then(snapshot => {
                        this.pro = snapshot.data()
                        this.loading = true;
                    })
    }
  }
</script>
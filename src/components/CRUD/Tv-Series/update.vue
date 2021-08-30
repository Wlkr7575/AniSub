<template>
  <v-sheet>
    <v-snackbar v-model="updateSuccess" top color="red">
      <span>Амжилттай заслаа</span>
      <v-btn depressed @click="updateSuccess = false">
        Close
      </v-btn>
    </v-snackbar>
        <v-snackbar v-model="failed" top>
      <span>Засах үед ямар нэг алдаа гарлаа</span>
      <v-btn depressed @click="updateSuccess = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-card>
      <v-card-title>Засах</v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Гарчиг" v-model="title" value="list.title"></v-text-field>
          <v-row>
            <v-text-field label="Studio" v-model="studio"></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field label="duration" v-model="duration"></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field label="Rating" v-model="Rating"></v-text-field>
          </v-row>
          <v-textarea label="Тайлбар" v-model="description"></v-textarea>
          <v-row>
            <v-col cols="6">
    <v-combobox :items="items" v-model="item" :search-input.sync="search" hide-selected hint="Maximum of 5 tags" label="Төрөлөө сонгон уу" multiple persistent-hint small-chips>
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
    </v-col>
    <v-col cols="6"><v-text-field label="Trailer" v-model="trailer"></v-text-field></v-col>
    </v-row>
          <v-row>
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="date" label="Эхэлсэн" prepend-icon="mdi-calendar" readonly v-on="on">
                </v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
            </v-menu>
            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="date2" label="Дууссан" prepend-icon="mdi-calendar" readonly v-on="on">
                </v-text-field>
              </template>
              <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-row>
          <v-row>
            <v-overflow-btn class="my-2" v-model="format" :items="dropdown_font" label="Format"
              target="#dropdown-example-1">
            </v-overflow-btn>
            <v-spacer></v-spacer>
            <v-overflow-btn class="my-2" v-model="status" :items="Status" label="Status" target="#dropdown-example-1">
            </v-overflow-btn>
            <v-spacer></v-spacer>
            <v-overflow-btn class="my-2" v-model="Source" :items="source" label="Source" target="#dropdown-example-1">
            </v-overflow-btn>
            <v-spacer></v-spacer>
            <v-overflow-btn class="my-2" v-model="age" :items="Age" label="Age" target="#dropdown-example-1">
            </v-overflow-btn>
          </v-row>
          <v-btn block text @click="submit" :loading="loading">Засах</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script>
  import db from '@/views/fb'
  export default {
    data: () => ({
      dialog2: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      modal: false,
      loading:false,
      updateSuccess:false,
      failed:false,
      items: ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Game', 'Harem','Historical','Horror','Martial arts','Mecha','Musical','Mystery','Romance','School','Sci-Fi','Seinen','Shounen','Shoujo','Slice-life','Sport','Supernatural','Thriller',],
      item:'',
      search: null,
      list: [],
      img: '',
      dropdown_font: ['Tv Series', 'Movie', 'OVA', 'ONA'],
      Status: ['finished', 'ongoing'],
      source: ['Manga', 'Light Novel', 'Orignal', 'Video Game'],
      Age: ['+3', '+7', '+13', '+17'],
      title: '',
      format: '',
      description: '',
      studio: '',
      duration: '',
      Rating: '',
      type: '',
      status: '',
      Source: '',
      age: '',
      trailer:''
    }),
    props:[
      'detail'
    ],
    computed: {
      computedDateFormatted() {
        return db.ServerValue.TIMESTAMP 
      },
      id() {
        return this.$route.params.detail
      }
    },
    beforeRouteEnter(to, from, next) {
      db.collection('Tv_Series').doc(to.params.detail).get().then((querySnapshot) => {
        next(vm => {
          vm.title = querySnapshot.data().title,
            vm.format = querySnapshot.data().format,
            vm.description = querySnapshot.data().description,
            vm.studio = querySnapshot.data().Studio,
            vm.duration = querySnapshot.data().duration,
            vm.Rating = querySnapshot.data().rating,
            vm.type = querySnapshot.data().type,
            vm.status = querySnapshot.data().Status,
            vm.Source = querySnapshot.data().Source,
            vm.age = querySnapshot.data().Age
            vm.item =querySnapshot.data().genre
            vm.trailer =querySnapshot.data().trailer
        })
      })
    },
    watch: {
      '$route': 'fetchData',
            model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      },
      loading(){
        if(this.loading == true){
                          setTimeout(function(){
                    this.loading = false;
                }, 2000);
        }
      }
    },
    methods: {
      fetchData() {
        db.collection('Tv_Series').where(this.$route.params.detail).get().then((querySnapshot) => {
          this.title = querySnapshot.data().title,
            this.format = querySnapshot.data().format,
            this.description = querySnapshot.data().description,
            this.studio = querySnapshot.data().Studio,
            this.duration = querySnapshot.data().duration,
            this.Rating = querySnapshot.data().rating,
            this.type = querySnapshot.data().type,
            this.status = querySnapshot.data().Status,
            this.Source = querySnapshot.data().Source,
            this.age = querySnapshot.data().Age
            this.item = querySnapshot.data().genre
            this.trailer = querySnapshot.data().trailer
        })
      },
      submit() {
        this.loading = true
        const project = {
          title: this.title,
          description: this.description,
          format: this.format,
          Studio: this.studio,
          duration: this.duration,
          rating: this.Rating,
          Source: this.Source,
          Age: this.age,
          Status: this.status,
          genre:this.item,
          trailer:this.trailer
        }
        db.collection("Tv_Series").doc(this.id).update(project).then(() => {
          console.log('updated to db')
          this.updateSuccess =true
          this.loading = false
        }).catch(function(error) {
          this.failed = true
    console.error("Error adding document: ", error);
});
      },
      handleSendMessage(event, value) {
        console.log('From the child:', value);
      }
    }
  }
</script>
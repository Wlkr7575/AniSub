<template>
  <v-sheet>
    <v-card>
      <v-card-title>Шинээр нэмэх</v-card-title>
      <v-card-subtitle :value="msg">{{msg}}</v-card-subtitle>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Гарчиг" color="white" :rules="[rules.required]" required v-model="title"></v-text-field>
          <v-row>
            <v-text-field label="Студи" color="white" v-model="studio" required :rules="[rules.required]"></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field label="Гарах хугацаа" color="white" type="number" v-model="duration" required :rules="[rules.required]"></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field label="Үнэлгээ" color="white" v-model="Rating" required :rules="[rules.required]"></v-text-field>
          </v-row>
          <v-textarea label="Тайлбар" color="white" v-model="description" required :rules="[rules.required]"></v-textarea>
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
                <v-text-field v-model="date" color="white" label="Эхэлсэн" prepend-icon="mdi-calendar" readonly v-on="on">
                </v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
            </v-menu>
            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
              offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field color="white" v-model="date2" label="Дууссан" prepend-icon="mdi-calendar" readonly v-on="on">
                </v-text-field>
              </template>
              <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-row>
          <v-row>
            <v-overflow-btn class="my-2" v-model="format" :items="dropdown_font" label="Формат"
              target="#dropdown-example-1">
            </v-overflow-btn>
            <v-spacer></v-spacer>
            <v-overflow-btn class="my-2" v-model="status" :items="Status" label="Төлөв" target="#dropdown-example-1">
            </v-overflow-btn>
            <v-spacer></v-spacer>
            <v-overflow-btn class="my-2" v-model="Source" :items="source" label="Эх зохиол" target="#dropdown-example-1">
            </v-overflow-btn>
            <v-spacer></v-spacer>
            <v-overflow-btn class="my-2" v-model="age" :items="Age" label="Насны ангилал" target="#dropdown-example-1">
            </v-overflow-btn>
          </v-row>
          <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field color="white" label="Арын зураг" v-model="picture" v-on="on"></v-text-field>
            </template>
            <v-card>
               <img :src="imageData" height="150" v-if="imageData">
              <v-file-input color="white" v-model="imageData">
                <v-progress-linear v-model="uploadValue" :active="show"></v-progress-linear>
              </v-file-input>
              <v-btn @click="onUpload" :loading="loading" block text>Upload</v-btn>
            </v-card>
          </v-menu>
                    <v-menu v-model="menu4" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field label="Нүүр зураг" v-model="picture1" v-on="on"></v-text-field>
            </template>
            <v-card>
               <img :src="imageData1" height="150" v-if="imageData1">
              <v-file-input v-model="imageData1">
                <v-progress-linear v-model="uploadValue" :active="show"></v-progress-linear>
              </v-file-input>
              <v-btn @click="onUpload1" :loading="loading1" block text>Upload</v-btn>
            </v-card>
          </v-menu>
        </v-form>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script>
  import db from '@/views/fb'
  import {
    storage
  } from '@/views/fb'
  export default {
    data: () => ({
      dialog2: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      modal: false,
      requered:false,
      show: true,
      imageData: null,
      imageData1: null,
      picture: null,
      picture1: null,
      uploadValue: 0,
      loading:false,
      loading1:false,
      rules:{
      required: value => !!value || 'Заавал бичнэ үү.',
      min: v => v.length >= 8 || '8 аас дээш тэмдэгт бичнэ үү',
      },
      valid:true,
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
      item:'',
      items:['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Game', 'Harem','Historical','Horror','Martial arts','Mecha','Musical','Mystery','Romance','School','Sci-Fi','Seinen','Shounen','Shoujo','Slice-life','Sport','Supernatural','Thriller',],
      search:'',
      trailer:''
    }),
    props:['msg'],
    computed: {
      computedDateFormatted() {
        return this.formatDate(this.date)
      },
      start(){
        return new Date(this.date)
      },
            end(){
        return new Date(this.date2)
      },
    },
    methods: {
        childMethod () {
            this.$emit("setParentComponentDetails");  
        },
      submit() {
        const project = {
          title: this.title,
          start: this.start,
          end: this.end,
          imgUrl: this.picture,
          imgPosterUrl:this.picture1,
          description: this.description,
          format: this.format,
          Studio: this.studio,
          duration: this.duration,
          rating: this.Rating,
          type: this.type,
          Source: this.Source,
          Age: this.age,
          Status: this.status,
                    genre:this.item,
          trailer:this.trailer
        }
        db.collection("Tv_Series").add(project).then((url) => {
          console.log('added to db');
          this.$emit("setParentComponentDetails",url); 
          this.$emit("Title",this.title); 
        })
      },
      onUpload() {
        this.picture = null;
        this.loading = true;
        const storageRef = storage.ref(`TvSeries/${this.title}/${this.imageData.name}`, ).put(this.imageData);
        storageRef.on(`state_changed`, snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => {
            console.log(error.message)
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.picture = url;
            });
            this.loading =false;
          }
        );
      },
            onUpload1() {
        this.picture1 = null;
        this.loading1 = false;
        const storageRef = storage.ref(`TvSeries/${this.title}/${this.imageData1.name}`, ).put(this.imageData1);
        storageRef.on(`state_changed`, snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => {
            console.log(error.message)
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.picture1 = url;
            });
            this.loading1 = false
          }
        );
      }
    }
  }
</script>
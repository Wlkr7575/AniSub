<template>
  <v-sheet>
    <v-card>
      <v-card-title>Шинэ анги оруулах</v-card-title>
      <v-form class="px-3">
        <v-text-field v-model="name" label="Ангийн тоо" type="number"></v-text-field>
        <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
          min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model="picture" label="Зургын зам" v-on="on"></v-text-field>
          </template>
          <v-card>
            <v-file-input v-model="imageData" label="Зургаа оруулах">
              <v-progress-linear v-model="uploadValue" :active="show"></v-progress-linear>
            </v-file-input>
            <v-btn class="pa-2" block text depressed @click="onUpload" :loading="loading">Upload</v-btn>
            <p v-if="uploadValue">{{uploadValue}}</p>
          </v-card>
        </v-menu>
                <v-menu v-model="menu4" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
          min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model="picture1" label="Анги оруулах" v-on="on"></v-text-field>
          </template>
          <v-card>
            <v-file-input v-model="imageData1" label="Ангийн бичлэг оруулах">
              <v-progress-linear v-model="uploadValue1" :active="show"></v-progress-linear>
            </v-file-input>
            <v-btn class="pa-2" block text depressed @click="onUpload1" :loading="loading2">Upload</v-btn>
            <p v-if="uploadValue1">{{uploadValue1}}</p>
          </v-card>
        </v-menu>
        <v-btn class="" block text depressed @click="submit" :loading="loading1">Оруулах</v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script>
  import db from '@/views/fb'
  import {
    storage
  } from '@/views/fb'
  export default {
    data() {
      return {
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        picture: null,
        picture1:null,
        imageData: null,
        imageData1: null,
        dialog: false,
        show: true,
        uploadValue: 0,
        uploadValue1: 0,
        loading: false,
        loading1: false,
        loading2: false,
        name: '',
        menu: false,
        menu2: false,
        menu3: false,
        menu4: false,
        time: null,
        modal2: false,
      }
    },
    props:[
      'id',
      'title'
    ],
    computed: {
      tada(){
        return new Date()
      },
    },
    methods: {
      submit() {
        this.loading1 = true;
        const project = {
          title: this.name,
          date: this.tada,
          img: this.picture,
          src:this.picture1
        }
        db.collection("Tv_Series").doc(this.id).collection("Episode").add(project).then(() => {
          console.log('added to db')
          this.$emit("setEpisodeComponentDetails"); 
          this.loading1 = false
        })
      },
      onUpload() {
        this.picture = null;
        this.loading = true;
        const storageRef = storage.ref(`TvSeries/${this.title}/Episode/${this.imageData.name}`, ).put(this.imageData);
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
            this.loading = false;
            this.menu3 = false;
          }
        );
      },
            onUpload1() {
        this.picture1 = null;
        this.loading2 = true;
        const storageRef = storage.ref(`TvSeries/${this.title}/Episode/${this.imageData1.name}`, ).put(this.imageData1);
        storageRef.on(`state_changed`, snapshot => {
            this.uploadValue1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => {
            console.log(error.message)
          },
          () => {
            this.uploadValue1 = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.picture1 = url;
            });
            this.loading2 = false;
            this.menu4 = false;
          }
        );
      },
    }
  }
</script>
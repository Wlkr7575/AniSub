<template>
    <v-card>
        <v-card-title>Шинэ анги оруулах</v-card-title>
        <v-form class="px-3">
            <v-text-field v-model="name" type="number"></v-text-field>
            <v-dialog width="500" v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }" chips>
                    <v-text-field v-model="picture" v-on="on"></v-text-field>
                </template>
                <v-card class="px-3">
                    <v-card-title>Хуудсуудыг оруулах</v-card-title>
                    <v-row no-gutters>
                        <v-col cols="9">
                            <v-file-input chips v-model="imageData" multiple v-on:change="onFileChange"></v-file-input>
                        </v-col>
                        <v-col cols="2">
                            <v-btn text class="mt-3" tile depressed @click="onUpload" :loading="loading2">
                                <v-icon>mdi-cloud-upload-outline</v-icon>Upload
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-container fluid v-if="picture">
                        <v-row class="chosenimg" justify="center">
                            <v-col class="d-flex child-flex" v-for="(img, $index,i) in picture" :key="i">
                                <div class="img pl-2 pr-2">
                                    <v-dialog width="200" :close-on-content-click="false"><template
                                            v-slot:activator="{ on }">
                                            <p v-on="on" class="text-center">{{$index+1}}</p>
                                        </template>
                                        <v-card>
                                            <v-content class="pa-0 ml-2 mr-2">
                                                <v-text-field type="number" v-model="imgindex"></v-text-field>
                                                <v-btn block text @click="move($index,$index = imgindex)">Солих</v-btn>
                                            </v-content>
                                        </v-card>
                                    </v-dialog>
                                    <v-img class="image" width="100" @click="removeImage($index)" :src="img"></v-img>
                                </div>
                            </v-col>
                        </v-row>
                        <v-btn v-if="picture" text block>Болсон</v-btn>
                    </v-container>
                </v-card>
            </v-dialog>
            <v-btn block text @click="submit" :loading="loading1">Оруулах</v-btn>
        </v-form>
    </v-card>
</template>
<script>
    import {
        storage
    } from '@/views/fb'
    import db from '@/views/fb'
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
        return this;
    };
    export default {
        data() {
            return {
                imageData: null,
                picture: [],
                img: [],
                imgindex: '',
                menu3: false,
                loading: false,
                loading1: false,
                loading2: false,
                circularloading: false,
                show: false,
                name: '',
                images: '',
                uploadValue: 0,
                url: null,
                image: [],
            }
        },
        props: [
            'id',
            'title',
            'type'
        ],
        computed: {
            sort() {
                return this.imageData.name
            },
            hga() {
                var filereader = new FileReader();
                return filereader.readAsDataURL(this.imageData)
            }
        },
        methods: {
            move(from, to) {
                this.picture.move(from, to);
            },
            onFileChange(e) {
                var files = e || e.dataTransfer;
                var self = this;
                if (!files.length)
                    return;
                Object.keys(files).map(function (k) {
                    self.createImage(files[k])
                })

            },
            createImage(file) {
                var reader = new FileReader();
                if (this.imageData == 0) {
                    this.images.length = 0
                    reader.onloadend = (e) => {
                        this.image.push(e.target.result);
                    }
                } else {
                    this.image.length = 0;
                    reader.onloadend = (e) => {
                        this.image.push(e.target.result);
                    }
                }
                reader.readAsDataURL(file);
            },
            removeImage: function (i) {
                this.picture.splice(i, 1)
                this.imageData.splice(i, 1)
            },
            submit() {
                this.loading1 = true;
                const project = {
                    title: this.name,
                    img: this.picture,
                }
                db.collection("Manhwa").doc(this.id).collection("Chapters").add(project).then(() => {
                    console.log('added to db')
                    this.$emit("setEpisodeComponentDetails");
                    this.loading1 = false
                })
            },
            onUpload() {
                this.show = true;
                this.loading2 = true;
                for (var i = 0; i < this.imageData.length; i++) {
                    this.images = this.imageData[i];
                    const storageRef = storage.ref(
                            `Зурагт ном/${this.type}/${this.title}/Chapters/Chapter${this.name}/${this.images.name}`)
                        .put(this.images);
                    this.circularloading = true;
                    storageRef.on(`state_changed`, snapshot => {
                            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        }, error => {
                            console.log(error.message)
                        },
                        () => {
                            this.uploadValue = 100;
                            storageRef.snapshot.ref.getDownloadURL().then((url) => {
                                this.picture.push(url);
                            });
                            this.loading2 = false;
                        }
                    );
                }
            },
        }
    }
</script>
<style scoped>
    .chosenimg {
        display: inline-flex;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
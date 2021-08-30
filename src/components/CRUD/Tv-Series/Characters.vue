<template>
    <v-card class="mx-auto" width="350">
        <v-form class="px-3">
            <v-avatar v-if="picture"><img :src="picture"></v-avatar>
            <v-text-field v-model="name"></v-text-field>
            <v-row>
                <v-file-input v-model="imageData"></v-file-input>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mt-3" v-on="on" v-bind="attrs" text @click="onUpload" :loading="loading">
                            <v-icon>mdi-cloud-upload-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>Зургийг оруулах</span>
                </v-tooltip>
            </v-row>
        </v-form>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="pa-2" v-bind="attrs" v-on="on" text bottom centered block @click="addChar"
                    :loading="loading1">
                    <v-icon>mdi-playlist-plus</v-icon>
                </v-btn>
            </template>
            <span>Шинэ дүрийн мэдээлэл оруулах</span>
        </v-tooltip>
    </v-card>
</template>
<script>
    import {
        storage
    } from "@/views/fb"
    import db from '@/views/fb'
    export default {
        data() {
            return {
                name: '',
                imageData: null,
                picture: '',
                loading: false,
                loading1: false,
                uploadValue: ''
            }
        },
        props: [
            'title',
            'id',
            'root',
            'doc'
        ],
        methods: {
            addChar() {
                this.loading1 = true
                const project = {
                    title: this.name,
                    img: this.picture,
                }
                db.collection(this.doc).doc(this.id).collection("Characters").add(project).then(() => {
                    console.log('added to db')
                    this.$emit("setEpisodeComponentDetails");
                    this.loading1 = false
                })
            },
            onUpload() {
                this.picture = null;
                this.loading = true;
                const storageRef = storage.ref(`${this.root}/${this.title}/Charecters/${this.imageData.name}`, ).put(this
                    .imageData);
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
                    }
                );
            },
        }
    }
</script>
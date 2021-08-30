<template>
    <v-sheet>
        <v-card>
            <v-card-title>Шинээр нэмэх</v-card-title>
            <v-card-subtitle :value="msg">{{msg}}</v-card-subtitle>
            <v-card-text>
                <v-form class="px-3">
                    <v-text-field label="Гарчиг" :rules="[rules.required]" required v-model="title"></v-text-field>
                    <v-row class="pa-3">
                        <v-text-field label="Студи" v-model="studio" required :rules="[rules.required]"></v-text-field>
                        <v-spacer></v-spacer>
                        <v-text-field label="Гарах хугацаа" type="number" v-model="duration" required
                            :rules="[rules.required]"></v-text-field>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-text-field label="Гарсан он" type="number" v-model="Year" required :rules="[rules.required]">
                        </v-text-field>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                    <v-combobox :items="items" v-model="item" :search-input.sync="search" hide-selected
                        hint="Maximum of 5 tags" label="Төрөлөө сонгон уу" multiple persistent-hint small-chips>
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd>
                                        to create a new one
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-combobox>
                        </v-col>
    <v-col cols="6"><v-text-field label="Trailer" v-model="trailer"></v-text-field></v-col>
    </v-row>
                    <v-row class="pa-3">
                        <v-text-field label="Үнэлгээ" v-model="Rating" required :rules="[rules.required]">
                        </v-text-field>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-overflow-btn class="my-2" v-model="age" :items="Age" label="Насны ангилал"
                            target="#dropdown-example-1">
                        </v-overflow-btn>
                    </v-row>
                    <v-textarea label="Тайлбар" v-model="description" required :rules="[rules.required]"></v-textarea>
                    <v-row class="pa-3">
                        <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field label="Арын зураг" v-model="picture" v-on="on"></v-text-field>
                            </template>
                            <v-card>
                                <img :src="imageData" height="150" v-if="imageData">
                                <v-file-input v-model="imageData">
                                    <v-progress-linear v-model="uploadValue" :active="show"></v-progress-linear>
                                </v-file-input>
                                <v-btn @click="onUpload" :loading="loading">Upload</v-btn>
                            </v-card>
                        </v-menu>
                        <v-spacer></v-spacer>
                        <v-menu v-model="menu4" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field label="Нүүр зураг" v-model="picture1" v-on="on"></v-text-field>
                            </template>
                            <v-card>
                                <img :src="imageData1" height="150" v-if="imageData1">
                                <v-file-input v-model="imageData1">
                                    <v-progress-linear v-model="uploadValue" :active="show"></v-progress-linear>
                                </v-file-input>
                                <v-btn @click="onUpload1" :loading="loading1">Upload</v-btn>
                            </v-card>
                        </v-menu>
                        <v-dialog v-model="dialog" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field label="Ангийг оруулах" v-model="picture2" v-on="on"></v-text-field>
                            </template>
                            <v-card>
                                <v-file-input v-model="imageData2">
                                </v-file-input>
                                <v-progress-linear v-model="uploadValue"></v-progress-linear>
                                <v-btn @click="onUpload2" :loading="loading2">Upload</v-btn>
                            </v-card>
                        </v-dialog>
                    </v-row>
                    <v-btn text block @click="submit"><v-icon>mdi-file-document-box-plus</v-icon>Нэмэх</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
        <done></done>
    </v-sheet>
</template>
<script>
    import db from '@/views/fb'
    import Done from '@/components/Preloader/DoneDialog'
    import {
        storage
    } from '@/views/fb'
    export default {
        data: () => ({
            dialog2: false,
            dialog:false,
            menu: false,
            menu2: false,
            menu3: false,
            menu4: false,
            modal: false,
            search: null,
            show: null,
            imageData: null,
            imageData1: null,
            imageData2: null,
            picture: null,
            picture1: null,
            picture2: null,
            uploadValue: 0,
            loading: false,
            loading1: false,
            loading2: false,
            rules: {
                required: value => !!value || 'Заавал бичнэ үү.',
                min: v => v.length >= 8 || '8 аас дээш тэмдэгт бичнэ үү',
            },
            valid: true,
            img: '',
            Age: ['+3', '+7', '+13', '+17'],
            items: ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Game', 'Harem','Historical','Horror','Martial arts','Mecha','Musical','Mystery','Romance','School','Sci-Fi','Seinen','Shounen','Shoujo','Slice-life','Sport','Supernatural','Thriller',
            ],
            item: '',
            title: '',
            format: '',
            description: '',
            studio: '',
            duration: '',
            Rating: '',
            Year: '',
            age: '',
            trailer:'',
        }),
        props: ['msg'],
        components: {
            'done': Done
        },
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
            start() {
                return new Date(this.date)
            },
            end() {
                return new Date(this.date2)
            },
        },
        methods: {
            childMethod() {
                this.$emit("setParentComponentDetails");
            },
            submit() {
                const project = {
                    title: this.title,
                    imgUrl: this.picture,
                    imgPosterUrl: this.picture1,
                    video:this.picture2,
                    description: this.description,
                    studio: this.studio,
                    duration: this.duration,
                    rating: this.Rating,
                    Age: this.age,
                    genre: this.item,
                    year: this.Year,
                    trailer:this.trailer
                }
                db.collection("posts").add(project).then(() => {
                    console.log('added to db');
                })
            },
            onUpload() {
                this.picture = null;
                this.loading = true;
                const storageRef = storage.ref(`Movie/${this.title}/${this.imageData.name}`, ).put(this.imageData);
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
            onUpload1() {
                this.picture1 = null;
                this.loading1 = false;
                const storageRef = storage.ref(`Movie/${this.title}/${this.imageData1.name}`, ).put(this.imageData1);
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
            },
            onUpload2() {
                this.picture2 = null;
                this.loading2 = false;
                const storageRef = storage.ref(`Movie/${this.title}/${this.imageData2.name}`, ).put(this.imageData2);
                storageRef.on(`state_changed`, snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, error => {
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue = 100;
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            this.picture2 = url;
                        });
                        this.loading2 = false
                    }
                );
            },
        }
    }
</script>
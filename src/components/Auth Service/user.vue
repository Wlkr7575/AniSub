<template>
    <div v-if="loading">
        <v-card v-if="user">
            <v-sheet v-if="$vuetify.breakpoint.mdAndUp">
                <v-img height="300" :src="user.coverUrl">
                    <v-row align="end" class="lightbox white--text pa-2 fill-height"
                        style="box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.8);background-image: linear-gradient(to top, rgba(0, 0, 0, 5.4) 0%, transparent 122px);">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <v-avatar class="profile ma-3" color="grey" size="165"
                                    v-if="user.photoURL !== undefined">
                                    <v-img :src="user.photoURL"></v-img>
                                    <v-fade-transition>
                                        <v-overlay v-if="hover" absolute>
                                            <v-dialog persistent v-model="dialog2" width="400">
                                                <template v-slot:activator="{on,attrs}">
                                                    <v-btn v-on="on" v-bind="attrs" rounded outlined>
                                                        <v-icon>mdi-image-edit</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-card class="pa-3 ma-0">
                                                    <v-card-title class="headline" align-center>
                                                        Нүүр зурагаа солих
                                                        <v-spacer></v-spacer>
                                                        <v-btn class="ml-10" @click="dialog2 = false" text depressed>
                                                            <v-icon>mdi-close</v-icon>
                                                        </v-btn>
                                                    </v-card-title>
                                                    <v-row justify="center">
                                                        <v-avatar size="60">
                                                            <v-img v-if="picture" :src="picture"></v-img>
                                                            <v-img v-else :src="user.photoURL"></v-img>
                                                        </v-avatar>
                                                    </v-row>
                                                    <v-row>
                                                        <v-file-input class="ml-3" v-model="proimg"></v-file-input>
                                                        <v-btn :disabled="!proimg" class="mt-3" text tile @click="uploadProimg" :loading="proload">
                                                            <v-icon>mdi-cloud-upload-outline</v-icon>
                                                        </v-btn>
                                                    </v-row>
                                                    <v-divider></v-divider>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-dialog v-model="dialog3" width="300">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn :disabled="!proimg" block text v-bind="attrs" v-on="on">
                                                                    Солих
                                                                </v-btn>
                                                            </template>

                                                            <v-card>
                                                                <v-card-title>Нүүр зурагаа солихдоо итгэлтэй байна уу
                                                                </v-card-title>
                                                                <v-divider></v-divider>

                                                                <v-card-actions>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn color="primary" text
                                                                        @click="dialog3 = false">
                                                                        Үгүй
                                                                    </v-btn>
                                                                    <v-btn color="primary" text @click="changeproimg">
                                                                        Тийм
                                                                    </v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-overlay>
                                    </v-fade-transition>
                                </v-avatar>
                                <v-avatar v-else size="100" class="profile mx-3">
                                    <v-img src="@/assets/user.png"></v-img>
                                </v-avatar>
                            </template>
                        </v-hover>
                        <v-col cols="12" sm="8">
                            <v-dialog v-model="dialog" width="400" persistent>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-card-title centered v-on="on" v-bind="attrs">Нэр :{{user.name}}</v-card-title>
                                </template>

                                <v-card>
                                    <v-card-title class="headline">
                                        Нэрээ солих
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-text-field class="ml-3 mr-3" v-model="title"></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-dialog v-model="dialog1" width="300">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn :disabled="!title" color="primary" text v-bind="attrs" v-on="on">
                                                    Солих
                                                </v-btn>
                                                <v-btn @click="dialog = false" text>Гарах</v-btn>
                                            </template>

                                            <v-card>
                                                <v-card-title>Нэрээ солихдоо итгэлтэй байна уу</v-card-title>
                                                <v-divider></v-divider>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="primary" text @click="dialog1 = false">
                                                        Үгүй
                                                    </v-btn>
                                                    <v-btn color="primary" text @click="changePro">
                                                        Тийм
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" sm="1">
                            <v-dialog v-model="dialog4" width="400" persistent>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="pr-2" outlined v-bind="attrs" v-on="on">
                                        <v-icon>mdi-image-edit</v-icon>
                                    </v-btn>
                                </template>
                                <v-card justify="center">
                                    <v-card-title>Арын зураг солих <v-spacer></v-spacer><v-btn text @click="dialog4 = false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
                                    <v-content class="px-3 pt-0">
                                        <v-row justify="center">
                                            <v-img width="40" :src="picture1" v-if="picture1"></v-img>
                                            <v-img v-else :src="user.coverUrl" width="40"></v-img>
                                        </v-row>
                                        <v-row>
                                            <v-file-input class="ml-3 mr-3 px-3" v-model="coverimg"></v-file-input>
                                            <v-btn :disabled="!coverimg" text tile class="mt-3 mr-3" @click="uploadCoverimg">
                                                <v-icon>mdi-cloud-upload-outline</v-icon>
                                            </v-btn>
                                        </v-row>
                                    </v-content>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-dialog width="330">
                                            <template v-slot:activator="{on,attrs}">
                                                <v-btn :disabled="!coverimg" block text v-on="on" v-bind="attrs">
                                                    Солих
                                                </v-btn>
                                            </template>
                                            <v-card justify="center" align="center">
                                                <v-card-title>Солихдоо итгэлтэй байн уу?</v-card-title>
                                                <v-divider></v-divider>
                                                <v-card-actions class="px-3">
                                                    <v-layout row>
                                                        <v-flex justify-center>
                                                            <v-btn text>Үгүй</v-btn>
                                                            <v-btn text @click="changeCoverimg">Тийм</v-btn>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-img>
            </v-sheet>
            <v-sheet v-if="$vuetify.breakpoint.smAndDown" >
                <v-img height="200" :src="user.coverUrl">
                    <v-row justify="center" class="lightbox white--text pa-2 fill-height"
                        style="box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.8);background-image: linear-gradient(to top, rgba(0, 0, 0, 5.4) 0%, transparent 122px);">
                                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <v-avatar centered class="profile ma-3" color="grey" size="100"
                                    v-if="user.photoURL !== undefined">
                                    <v-img :src="user.photoURL"></v-img>
                                    <v-fade-transition>
                                        <v-overlay v-if="hover" absolute>
                                            <v-dialog persistent v-model="dialog2" width="400">
                                                <template v-slot:activator="{on,attrs}">
                                                    <v-btn v-on="on" v-bind="attrs" rounded outlined>
                                                        <v-icon>mdi-image-edit</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-card class="pa-3 ma-0">
                                                    <v-card-title class="headline" align-center>
                                                        Нүүр зурагаа солих
                                                        <v-spacer></v-spacer>
                                                        <v-btn class="ml-10" @click="dialog2 = false" text depressed>
                                                            <v-icon>mdi-close</v-icon>
                                                        </v-btn>
                                                    </v-card-title>
                                                    <v-row justify="center">
                                                        <v-avatar size="60">
                                                            <v-img v-if="picture" :src="picture"></v-img>
                                                            <v-img v-else :src="user.photoURL"></v-img>
                                                        </v-avatar>
                                                    </v-row>
                                                    <v-row>
                                                        <v-file-input class="ml-3" v-model="proimg"></v-file-input>
                                                        <v-btn :disabled="!proimg" class="mt-3" text tile @click="uploadProimg" :loading="proload">
                                                            <v-icon>mdi-cloud-upload-outline</v-icon>
                                                        </v-btn>
                                                    </v-row>
                                                    <v-divider></v-divider>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-dialog v-model="dialog3" width="300">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn :disabled="!proimg" block text v-bind="attrs" v-on="on">
                                                                    Солих
                                                                </v-btn>
                                                            </template>

                                                            <v-card>
                                                                <v-card-title>Нүүр зурагаа солихдоо итгэлтэй байна уу
                                                                </v-card-title>
                                                                <v-divider></v-divider>

                                                                <v-card-actions>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn color="primary" text
                                                                        @click="dialog3 = false">
                                                                        Үгүй
                                                                    </v-btn>
                                                                    <v-btn color="primary" text @click="changeproimg">
                                                                        Тийм
                                                                    </v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-overlay>
                                    </v-fade-transition>
                                </v-avatar>
                                <v-avatar v-else size="100" class="profile mx-3">
                                    <v-img src="@/assets/user.png"></v-img>
                                </v-avatar>
                            </template>
                        </v-hover>
                    <v-col cols="12" >
                        <v-row class="pr-8">
                            <v-col cols="10">
                                <v-dialog v-model="dialog" width="400" persistent>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-card-title v-on="on" v-bind="attrs">
                                            {{user.name}}
                                        </v-card-title>
                                </template>

                                <v-card>
                                    <v-card-title class="headline">
                                        Нэрээ солих
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-text-field class="ml-3 mr-3" v-model="title"></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-dialog v-model="dialog1" width="300">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="primary" text v-bind="attrs" v-on="on">
                                                    Солих
                                                </v-btn>
                                                <v-btn @click="dialog = false" text>Гарах</v-btn>
                                            </template>

                                            <v-card>
                                                <v-card-title>Нэрээ солихдоо итгэлтэй байна уу</v-card-title>
                                                <v-divider></v-divider>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="primary" text @click="dialog1 = false">
                                                        Үгүй
                                                    </v-btn>
                                                    <v-btn color="primary" text @click="changePro">
                                                        Тийм
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            </v-col>
                            <v-col cols="2">
                            <v-dialog v-model="dialog4" width="400" persistent>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="pr-2" outlined v-bind="attrs" v-on="on">
                                        <v-icon>mdi-image-edit</v-icon>
                                    </v-btn>
                                </template>
                                <v-card justify="center">
                                    <v-card-title>Арын зураг солих <v-spacer></v-spacer><v-btn @click="dialog4 = false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
                                    <v-content class="px-3 pt-0">
                                        <v-row justify="center">
                                            <v-img width="40" :src="picture1" v-if="picture1"></v-img>
                                            <v-img v-else :src="user.coverUrl" width="40"></v-img>
                                        </v-row>
                                        <v-row>
                                            <v-file-input class="ml-3 mr-3 px-3" v-model="coverimg"></v-file-input>
                                            <v-btn text tile class="mt-3 mr-3" @click="uploadCoverimg">
                                                <v-icon>mdi-cloud-upload-outline</v-icon>
                                            </v-btn>
                                        </v-row>
                                    </v-content>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-dialog width="330">
                                            <template v-slot:activator="{on,attrs}">
                                                <v-btn block text v-on="on" v-bind="attrs">
                                                    Солих
                                                </v-btn>
                                            </template>
                                            <v-card justify="center" align="center">
                                                <v-card-title>Солихдоо итгэлтэй байн уу?</v-card-title>
                                                <v-divider></v-divider>
                                                <v-card-actions class="px-3">
                                                    <v-layout row>
                                                        <v-flex justify-center>
                                                            <v-btn text>Үгүй</v-btn>
                                                            <v-btn text @click="changeCoverimg">Тийм</v-btn>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                                </v-col>                            
                        </v-row>
                        </v-col>
                    </v-row>
                </v-img>
            </v-sheet>
            <v-sheet class="pa-5">
                <v-row wrap>
                    <v-col>
                        <p class="font-weight-bold">Миний бүртгэсэн цувралын жагсаалт</p>
                        <v-list color="grey darken-3">
                            <v-list-item v-for="(item,i) in myserieslist" :key="i" router :to="{name: 'detail',params:{detail:item.id}}">
                                <v-list-item-title>{{item.title}}</v-list-item-title>
                                <v-list-item-action>
                                    <v-btn depressed tile>
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col>
                        <p class="font-weight-bold">Миний бүртгэсэн бүрэн хэмжээний киноны жагсаалт</p>
                        <v-list color="grey darken-3">
                            <v-list-item v-for="(item,i) in mymovielist" :key="i" router :to="{name: 'movie',params:{detail:item.id}}">
                                <v-list-item-title>{{item.title}}</v-list-item-title>
                                <v-list-item-action>
                                    <v-btn depressed tile>
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-card>
    </div>
    <div v-else>
        <load></load>
    </div>
</template>
<script>
    import db from '@/views/fb'
    import {
        storage
    } from '@/views/fb'
    import load from '@/components/Preloader/Preloader'
    export default {
        data() {
            return {
                name: '',
                loading: false,
                dialog: false,
                dialog1: false,
                dialog2: false,
                dialog3: false,
                dialog4: false,
                proload:false,
                uploadValue: '',
                proimg: null,
                coverimg: null,
                picture: null,
                picture1: null,
                pro: [],
                myserieslist: [],
                mymovielist: [],
                title: ''
            }
        },
        components: {
            'load': load
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
        },
        methods: {
            changePro() {
                db.collection("user").doc(this.user.id).update({
                    name: this.title
                }).then(this.dialog1 = false, this.dialog = false).catch((err)=>{alert(err)})
            },
            changeproimg() {
                db.collection("user").doc(this.user.id).update({
                    imgPro: this.picture
                }).then(console.log("done"),window.location.reload()).catch((err)=>{alert(err)})
            },
            changeCoverimg() {
                db.collection("user").doc(this.user.id).update({
                    img: this.picture1
                }).then(console.log("done"), window.location.reload()).catch((err)=>{alert(err)})
            },
            uploadProimg() {
                this.proload = true;
                const storageRef = storage.ref(`User/${this.user.id}/Pro`, ).put(this.proimg);
                storageRef.on(`state_changed`, snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, error => {
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue = 100;
                        console.log("uploaded")
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            this.picture = url;
                        });
                        this.dialog3 = false
                        this.proload = false;
                    }
                );
            },
            uploadCoverimg() {
                const storageRef = storage.ref(`User/${this.user.id}/Back`, ).put(this.coverimg);
                storageRef.on(`state_changed`, snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, error => {
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue = 100;
                        console.log("uploaded")
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            this.picture1 = url;
                        });
                    }
                );
            }
        },
        created() {
            db.collection('user').doc(this.$store.getters.user.id).onSnapshot(snapshot => {
                this.pro = snapshot.data()
                this.loading = true
            })
            db.collection('Tv_Series').where("Users", "array-contains", this.user.id).onSnapshot(res => {
                const changes = res.docChanges();

                changes.forEach(change => {
                    if (change.type === "added") {
                        this.myserieslist.push({
                            ...change.doc.data(),
                            id: change.doc.id
                        })
                    }
                    if (change.type === "removed") {
                        this.myserieslist.push({
                            ...change.doc.data(),
                            id: change.doc.id
                        })
                    }
                });
            })
            db.collection('posts').where("Users", "array-contains", this.user.id).onSnapshot(res => {
                const changes = res.docChanges();

                changes.forEach(change => {
                    if (change.type === "added") {
                        this.mymovielist.push({
                            ...change.doc.data(),
                            id: change.doc.id
                        })
                    }
                    if (change.type === "removed") {
                        this.mymovielist.push({
                            ...change.doc.data(),
                            id: change.doc.id
                        })
                    }
                });
            })
        }

    }
</script>
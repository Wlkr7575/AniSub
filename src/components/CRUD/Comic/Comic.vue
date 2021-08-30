<template>
    <v-card class="ma-10">
        <v-tooltip>
            <template v-slot:activator="{on,attrs}">
                <v-btn absolute v-bind="attrs" v-on="on" @click="dialog1 = !dialog1" dark fab top right color="red">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>Шинээр нэмэх</span>
        </v-tooltip>
        <v-row>
        <v-col cols="12" sm="5">
           <v-card-title>Цуврал</v-card-title>
           <v-card-subtitle>Нийт цуврал: {{this.this}}</v-card-subtitle>
        </v-col>
        <v-col cols="12" sm="7">
            <v-text-field v-model="select" :items="items" cache-items class="ma-2 pl-0" label="Хайх" color="red"
      :search-input.sync="search"></v-text-field>
      </v-col>
      </v-row>
        <v-list>
            <v-list-item v-for="item in myList" :key='item.title'>
                <v-col>
                    <v-row class="px-2">
                        <v-col cols="12" sm="9">
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                        </v-col>
                        <v-col cols="12" sm="3" class="pa-0" justify='end'>
                            <v-btn-toggle group>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn depressed @click.ctrl="deletedoc(item)" v-bind="attrs" v-on="on">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Устгах</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <updatecomic :id="item.id" v-bind="attrs" v-on="on"></updatecomic>
                                    </template>
                                    <span>Засах</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn depressed v-bind="attrs" v-on="on" @click="uid(item)">
                                            <v-icon>mdi-plus-thick</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Дүрийн мэдээлэл оруулах</span>
                                </v-tooltip>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-col>
            </v-list-item>

        </v-list>
        <v-card>
        </v-card>
        <v-dialog v-model="dialog4">
            <newchap></newchap>
            </v-dialog>
        <v-dialog v-model="dialog3">
            <newchap :id="id" :title="title" :type="type"></newchap>
        </v-dialog>
        <v-dialog v-model="dialog1" class="new" persistent>
            <header>
                <v-btn depressed tile @click="dialog1 = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>
            <new @setParentComponentDetails="setDoneForComponent"></new>
        </v-dialog>
        <v-dialog v-model="dialog2">
            <update></update>
        </v-dialog>
    </v-card>
</template>
<script>
    import db from '@/views/fb'
    import New from '@/components/CRUD/Comic/NewComic'
    import Update from '@/components/CRUD/Tv-Series/update'
    import NewChap from '@/components/CRUD/Comic/NewChap'
    import UpdateComic from '@/components/CRUD/Comic/UpdateComic'
    export default {
        data: () => ({
            dialog1: false,
            dialog2: false,
            dialog3 :false,
            dialog4:false,
            dropdown_font: ['Tv_Series', 'posts'],
            colllections: '',
            status: '',
            model:'',
            list: [],
            Movie: [],
            Episode:[],
            id:'',
            title:'',
            type:'',
             items: '',
        search: '',
        select: '',
        }),
        components: {
            'new': New,
            'update': Update,
            'newchap':NewChap,
            'updatecomic':UpdateComic
        },
        computed: {
            this() {
                return this.Movie.length
            },
                  myList() {
        const search = this.select.toLowerCase();
        return this.Movie.filter(function (item) {
          return item.title.toLowerCase().includes(search);
        });
      },
        },
        methods: {
            deletedoc(item) {
                db.collection("Manhwa").doc(item.id).delete().then(function () {
                    console.log("Document successfully deleted!");
                    window.location.reload()
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            },
            setDoneForComponent(){
                console.log("Suprice")
                this.dialog1 = false
            },
            uid(item){
                this.id = item.id
                this.title = item.title
                this.type = item.type
                this.dialog3 = true
            }
        },
        created() {
                db.collection("Manhwa").onSnapshot(res => {
                    const changes = res.docChanges();

                    changes.forEach(change => {
                        if (change.type === "added") {
                            this.Movie.push({
                                ...change.doc.data(),
                                id: change.doc.id
                            })
                        }
                    });
                })
        }
    }
</script>
<style scoped>
button.v-btn.v-btn--depressed.v-size--default{
    display: inline-block;
}
</style>
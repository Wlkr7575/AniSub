<template>
    <v-sheet>
        <v-card>
            <v-list>
                <v-list-item v-for="item in list" :key='item.title'>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                    <v-list-item-action>
                        <v-btn @click="deletedoc(item)">Delete</v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card>
    </v-sheet>
</template>
<script>
    import db from '@/views/fb'
    export default {
        data: () => ({
            dialog4: false,
            dropdown_font: ['Tv_Series', 'posts'],
            colllections: '',
            list: []
        }),
        computed() {
            return this.list
        },
        methods: {
            deletedoc(item) {
                db.collection("Tv_Series").doc(item.id).delete().then(function () {
                    console.log("Document successfully deleted!");
                     window.location.reload()
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            }
        },
        created() {
            db.collection("Tv_Series").onSnapshot(res => {
                const changes = res.docChanges();

                changes.forEach(change => {
                    if (change.type === "added") {
                        this.list.push({
                            ...change.doc.data(),
                            id: change.doc.id
                        })
                    }
                });
            })
        }
    }
</script>
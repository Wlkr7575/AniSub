<template>
    <v-container v-if="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-list>
            <v-list-item class="pa-0" v-for="(item,i) in Chapters.img" :key="i">
                <v-list-item-content class="px-0 pt-1 pb-0">
                    <v-img :src="item"></v-img>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-container>
        <v-container v-else class="container_pr">
        <v-list>
            <v-list-item v-for="(item,i) in Chapters.img" :key="i" class="pa-0 ">
                <v-list-item-content class="px-0 pt-1 pb-0">
                    <v-img :src="item"></v-img>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script>
import db from '@/views/fb'
export default {
    data(){
        return{
            Chapters:[],
        }
    },
            beforeRouteEnter(to, from, next) {
        db.collection("Manhwa").doc(to.params.chap).collection("Chapters").doc(to.params.page).onSnapshot(res => {
                next(vm => {
                vm.Chapters =res.data();

                })
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                db.collection('Manhwa').where(this.$route.params.chap).collection("Chapters").doc(this.$route.params.page).onSnapshot(res => {
                this.Chapters = res.data()

                })
            },
        },

}
</script>
<style scoped>
.container.container_pr{
    width: 50%;
}
</style>
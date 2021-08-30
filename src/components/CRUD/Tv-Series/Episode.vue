<template>
    <v-card>

    </v-card>
</template>
<script>
import db from '@/views/fb'
export default {
    data(){
        return{
            Episode:[]
        }
    },
    created(){
                    db.collection("Tv_Series").doc(this.$route.params.detail).onSnapshot(res => {
                const changes = res.docChanges();

                changes.forEach(change => {
                    if (change.type === "added") {
                        this.List.push({
                            ...change.doc.data(),
                            id: change.doc.id
                        })
                    }
                });
                this.loading = true;
            })
    }
}
</script>
<template>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" color="red" step="1">Мэдээлэл оруулах</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" color="red" step="2">Анги оруулах</v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card class="mb-12" color="grey lighten-1">
                    <new :msg="required" ref="new" @Title="setTitle" @setParentComponentDetails="setDetailsForComponent"></new>
                </v-card>
                <v-btn text>Cancel</v-btn>
                <v-btn @click="post">
                    Next
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card class="mb-12" color="grey lighten-1">
                    <ep :id="message" :title="title" @setEpisodeComponentDetails="setEpsForComponent"></ep>
                </v-card>

                <v-btn color="primary" @click="e1 = 3">
                    Continue
                </v-btn>

                <v-btn text @click="e1 = 1">Cancel</v-btn>
            </v-stepper-content>

        </v-stepper-items>
        <v-snackbar></v-snackbar>
    </v-stepper>
</template>

<script>
    import New from '@/components/CRUD/Tv-Series/new'
    import NewEp from '@/components/CRUD/Tv-Series/NewEpisode'
    export default {
        data() {
            return {
                e1: 1,
                message: '',
                required: null,
                title:''
            }
        },
        components: {
            'new': New,
            'ep': NewEp
        },
        methods: {
            setDetailsForComponent(url) {
                console.log("Амжилттай бүртгэгдлээ");
                this.e1 = 2
                this.message = url.id
            },
            setEpsForComponent(){
                console.log("the End fucker")
                this.$emit("setParentComponentDetails"); 
            },
            setTitle(title){
                console.log("done")
                this.title = title
            },
            post() {
                this.$refs.new.submit()
            },
            ep(){
                this.$refs.ep.submit()
            }
        }
    }
</script>
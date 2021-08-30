<template>
    <v-card>
        <v-container class="fill-height" fluid style="min-height: 434px">
            <v-row key="0" justify="center">
                <v-col cols="6">
                    <v-card router to="/add">
                        <v-img src="@/assets/kv.jpg" height="200" class="grey darken-4">
                            <v-card-title class="title">Цуврал</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>

                <v-col cols="6">
                    <v-card router to="/addMovie">
                        <v-img src="@/assets/Movies.jpg" height="200"  class="grey darken-4">
                        <v-card-title class="title">Бүрэн хэмжээний</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>

                <v-col cols="6">
                    <v-card router to="/addComic">
                        <v-img src="@/assets/Comics.png" height="200" class="grey darken-4">
                        <v-card-title class="title">Зурагт ном</v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
    export default {
        data() {
            return {
                choose: [{
                        title: 'Цуврал'
                    },
                    {
                        title: 'Бүрэн хэмжээний'
                    },
                    {
                        title: 'Мэдээ'
                    },
                    {
                        title: 'Зурагт ном'
                    }
                ]
            }
        }
    }
</script>
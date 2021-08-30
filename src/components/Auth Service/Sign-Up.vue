<template>
    <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="ma-10 pa-10">
                <v-toolbar flat>
                    <v-btn icon class="hidden-xs-only" v-bind:to="{path: '/user'}">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-form v-model="valid">
                    <v-col>
                        <v-card-title class="text-center">Бүртгүүлэх</v-card-title>
                        <v-text-field required label="Нэвтрэх нэр" outlined color="white" v-model="form.username">
                        </v-text-field>
                        <v-text-field required label="Эмайл хаяг" outlined color="white" :rules="emailRules"
                            v-model="form.email"></v-text-field>
                        <v-text-field required outlined color="white" :rules="[rules.required, rules.min]"
                            v-model="form.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'" label="Нууц үг" counter @click:append="show1 = !show1">
                            <template v-slot:progress>
                                <v-progress-linear v-if="custom" :value="progress" :color="color" absolute height="7">
                                </v-progress-linear>
                            </template>
                        </v-text-field>
                        <v-text-field required outlined color="white" :rules="[rules.required, rules.emailMatch]"
                            v-model="form.confirm" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'" label="Нууц үг" counter @click:append="show1 = !show1">
                        </v-text-field>
                        <v-btn block tile color="red" v-on:click="submit" :disabled="!valid">Бүртгүүлэх</v-btn>
                    </v-col>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data() {
            return {
                show1: false,
                valid: true,
                custom: true,
                step: 1,
                password: '',
                rules: {
                    required: value => !!value || 'Заавал бичнэ үү.',
                    min: v => v.length >= 8 || '8 аас дээш тэмдэгт бичнэ үү',
                    emailMatch: () => (this.form.password == this.form.confirm || 'таний нууц үг таарахгүй байна'),
                },
                emailRules: [
                    v => !!v || 'Майл хаягаа бичнээ',
                    v => /.+@.+\..+/.test(v) || 'Зөвхөн майл хаяг л бичнэ',
                ],
                form: {
                    email: "",
                    password: "",
                    confirm: "",
                    username: ""
                },
            }
        },
        computed: {
            currentTitle() {
                switch (this.step) {
                    case 1:
                        return 'Sign-up'
                    default:
                        return 'Account created'
                }
            },
        },
        methods: {
            submit() {
                const user = {
                    email: this.form.email,
                    password: this.form.password,
                    name: this.form.username
                }
                this.$store.dispatch('signUpAction', user, )
            }
        }

    }
</script>
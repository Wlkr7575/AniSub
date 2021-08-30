<template>
    <v-card class="ma-10 pa-10">
        <v-form v-model="valid">
            <v-col>
                <v-card-title class="text-center">Нэвтрэх</v-card-title>
                <v-text-field id="email" type="email" v-model="form.email" label="Нэвтрэх нэр" outlined color="white"
                    :rules="emailRules" required>
                </v-text-field>
                <v-text-field outlined :rules="[rules.required,rules.min]" color="white" v-model="form.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Нууц үг"
                    counter @click:append="show1 = !show1" required>
                </v-text-field>
                <v-btn block tile color="red" @click="login" :disabled="!valid">Нэвтрэх</v-btn>
            </v-col>
            <p class="text-center font-weight-medium pb-2">
                <router-link to="/user/register">Надад ямар нэг хаяг байхгүй?</router-link>
            </p>
            <v-row >
                <v-btn align-center @click="onSigninGoogle"><v-icon>mdi-google</v-icon></v-btn>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                show1: false,
                valid: true,
                rules: {
                    required: value => !!value || 'Заавал бичнэ үү.',
                    min: v => v.length >= 8 || '8 аас дээш тэмдэгт бичнэ үү',
                },
                emailRules: [
                    v => !!v || 'Майл хаягаа бичнээ',
                    v => /.+@.+\..+/.test(v) || 'Зөвхөн майл хаяг л бичнэ',
                ],
                form: {
                    email: "",
                    password: ""
                },
            }
        },
        computed:{
                  progress () {
        return Math.min(100, this.value.length * 10)
      },
        },
        methods: {
            login() {
                const user = {
                    email: this.form.email,
                    password: this.form.password
                }
                this.$store.dispatch('signInAction', user)
            },
                  onSigninGoogle () {
        this.$store.dispatch('signUserInGoogle')
      },
      onSigninFacebook () {
        this.$store.dispatch('signUserInFacebook')
      },
        },
    }
</script>
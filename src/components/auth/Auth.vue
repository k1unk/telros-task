<template>
    <div class="auth-block">
        <div class="btn" v-if="!isAuth" @click="setModal(true)">Log in</div>
        <div class="btn" v-else @click="logOut_">Log out</div>
        <div :class="className" @click="setModal(false)">
            <div class="modal-content" @click.stop.prevent>
                <div class="login">
                    Login
                    <input v-model="login" type="text" placeholder="login"/>
                </div>
                <div class="password">
                    Password
                    <input v-model="password" type="text" placeholder="password">
                </div>
                <div class="btn-login" @click="logIn_">Log In</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./auth.scss"></style>

<script>

import {mapActions, mapState} from "vuex";

export default {
    name: 'Auth',
    props: {
        isAuth: Boolean
    },
    data() {
        return {
            className: "modal",
            login: "",
            password: ""
        }
    },
    methods: {
        ...mapActions({
            logIn: "auth/logIn",
            logOut: "auth/logOut"
        }),
        setModal(value) {
            value
                ? this.className = 'modal show-modal'
                : this.className = 'modal'
        },
        logOut_() {
            this.logOut()
        },
        logIn_() {
            let login = this.login
            let password = this.password
            this.logIn({login, password}).then(e => {
                if (e === true) {
                    this.setModal(false)
                    this.login = ""
                    this.password = ""
                } else {
                    alert("Error, try again")
                }
            })
        }

    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth
        })
    }
}
</script>

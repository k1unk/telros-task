<template>
    <div class="header">
        <div class="list">
            <router-link :to="'/'" class="item">Main</router-link>
            <router-link v-if="isAuth" :to="'/users/'+id" class="item login">{{ login }}</router-link>
            <router-link v-else :to="'/users/'+id" class="item disabled">My Page</router-link>
        </div>
        <div>
            <Auth :isAuth="isAuth"/>
        </div>
    </div>
</template>

<style lang="scss" src="./header.scss"></style>

<script>

import {mapState} from "vuex";
import Auth from "@/components/auth/Auth";

export default {
    name: 'Header',
    components: {
        Auth
    },
    data() {
        return {
            searchQuery: "",

        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            stat: state => state.auth,
            id: state => state.auth.id,
            login: state => state.auth.login,

        }),

    }
}
</script>

<template>
    <div class="app">
        <Header/>

        <Content/>
    </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Content from "./components/content/Content.vue";
import Auth from "./components/auth/Auth.vue";
import {mapActions} from "vuex";

export default {
    name: "App",
    components: {Content, Header, Auth},
    data() {
        return {
            previewImage: null
        }
    },
    methods: {
        ...mapActions({
            setUser: "auth/setUser"
        }),
    },
    created() {
        this.setUser()
    }
}
</script>

<style lang="scss">
@import "app.scss";
</style>


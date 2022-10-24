<template>
    <div class="user">
        <div class="title">Информация обо мне</div>
        <div v-if="!changing">
            <div class="photo">
                <img v-show="user.photo" :src="photo"/>
            </div>
            <div class="list" v-for="item in list">
                <div class="item" v-show="item.value">{{ item.name }}: <strong>{{ item.value }}</strong></div>
            </div>
            <div class="change-btn" @click="openChangeWindow">Изменить информацию обо мне</div>
        </div>
        <div v-else>
            <div class="list" v-for="(item) in changingUser">
                <div class="item">{{ item.name }}: <input type="text" :value="item.value" @change="change(item.key, $event.target.value)"></div>
            </div>

            <div class="photo">
                Фото:
                <img v-show="changingPhoto" :src="changingPhoto" class="uploading-image"/>
                <input type="file" accept="image/jpeg" @change=uploadImage>
                <div v-show="changingPhoto" class="remove" @click="deleteImage">Удалить</div>
            </div>
            <div class="btns">
                <div class="button" @click="save">Сохранить</div>
                <div class="button" @click="cancel">Отмена</div></div>
        </div>

    </div>
</template>

<style lang="scss" src="./user.scss"></style>

<script>

import {mapMutations, mapState} from "vuex";

export default {
    name: 'Catalog',
    data() {
        return {
            changing: false
        }
    },
    methods: {
        ...mapMutations({
            setChangingInfo: "auth/setChangingInfo",
            saveChanges: "auth/saveChanges",
            setChangingPhoto: "auth/setChangingPhoto"
        }),
        openChangeWindow() {
            this.changing = true
        },
        save() {
            this.saveChanges()
            this.changing = false
        },
        cancel() {
            this.changing = false
        },
        change(key, value) {
            this.setChangingInfo({key, value})
        },
        uploadImage(e){
            this.setChangingPhoto(e)
        },
        deleteImage() {
            this.setChangingPhoto("")
        }

    },
    computed: {
        ...mapState({
            user: state => state.auth,
            photo: state => state.auth.photo,
            changingPhoto: state => state.auth.changingPhoto,
            list: state => [
                {name: "Имя", value: state.auth.name1},
                {name: "Фамилия", value: state.auth.name2},
                {name: "Отчество", value: state.auth.name3},
                {name: "Дата рождения", value: state.auth.birthday},
                {name: "Телефон", value: state.auth.phone},
                {name: "Почта", value: state.auth.mail},
            ],
            changingUser: state => [
                {key: "name1", name: "Имя", value: state.auth.changingUser.name1},
                {key: "name2", name: "Фамилия", value: state.auth.changingUser.name2},
                {key: "name3", name: "Отчество", value: state.auth.changingUser.name3},
                {key: "birthday", name: "Дата рождения", value: state.auth.changingUser.birthday},
                {key: "phone", name: "Телефон", value: state.auth.changingUser.phone},
                {key: "mail", name: "Почта", value: state.auth.changingUser.mail},
            ]
        })
    }
}
</script>

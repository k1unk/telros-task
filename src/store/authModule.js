function checkUser(login, password) {
    if (login === "admin" && password === "admin") {
        return {
            status: true,
            user: {
                id: 1,
                login: login,
                name1: "admin1",
                name2: "admin2",
                name3: "",
                birthday: "1.1",
                mail: "a@b.c",
                phone: "99999999",
                photo: "",
            }
        }
    }
    return {status: false}
}

export const authModule = {
    state: () => ({
        id: 0,
        login: '',
        isAuth: false,
        name1: "",
        name2: "",
        name3: "",
        birthday: "",
        mail: "",
        phone: "",
        photo: "",
        changingUser: {
            name1: "",
            name2: "",
            name3: "",
            birthday: "",
            mail: "",
            phone: "",
        },
        changingPhoto: ''
    }),
    getters: {},
    mutations: {
        setChangingInfo(state, {key, value}) {
            let e = state.changingUser
            e[key] = value
            state.changingUser = e
        },
        setChangingPhoto(state, e) {
            if (!e) {
                state.changingPhoto = ""
                return
            }
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                state.changingPhoto = e.target.result;
            };
        },
        saveChanges(state) {
            state.name1 = state.changingUser.name1
            state.name2 = state.changingUser.name2
            state.name3 = state.changingUser.name3
            state.phone = state.changingUser.phone
            state.photo = state.changingUser.photo
            state.mail = state.changingUser.mail
            state.birthday = state.changingUser.birthday
            state.photo = state.changingPhoto

            localStorage.setItem("user", JSON.stringify({
                id: state.id,
                login: state.login,
                isAuth: state.isAuth,
                name1: state.name1,
                name2: state.name2,
                name3: state.name3,
                birthday: state.birthday,
                mail: state.mail,
                phone: state.phone,
                photo: state.photo
            }))
        },
        setUserInfo(
            state,
            {
                id, login, isAuth, name1, name2, name3, birthday, mail, phone, photo
            }
        ) {
            state.id = id
            state.login = login
            state.isAuth = isAuth
            state.name1 = name1
            state.name2 = name2
            state.name3 = name3
            state.birthday = birthday
            state.mail = mail
            state.phone = phone
            state.photo = photo
            state.changingPhoto = photo
            localStorage.setItem("user", JSON.stringify({
                id, login, isAuth, name1, name2, name3, birthday, mail, phone, photo
            }))

            state.changingUser = {
                name1, name2, name3, birthday, mail, phone
            }
        }
    },
    actions: {
        async logIn(context, {login, password}) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let result = checkUser(login, password)
                    resolve(result);
                }, 1000)
            })
                .then(
                    e => {
                        if (e.status) {
                            context.commit("setUserInfo", {
                                id: e.user.id,
                                login: e.user.login,
                                isAuth: true,
                                name1: e.user.name1,
                                name2: e.user.name2,
                                name3: e.user.name3,
                                birthday: e.user.birthday,
                                mail: e.user.mail,
                                phone: e.user.phone,
                                photo: e.user.photo
                            })
                            return true
                        } else {
                            return false
                        }
                    }
                )
        },
        async logOut(context) {
            context.commit("setUserInfo", {
                id: 0,
                login: "",
                isAuth: false,
                name1: "",
                name2: "",
                name3: "",
                birthday: "",
                mail: "",
                phone: "",
                photo: "",
            })
            localStorage.removeItem("user")
        },
        setUser(context) {
            let userStr = localStorage.getItem('user')
            let user = JSON.parse(userStr)
            if (user) {
                context.commit("setUserInfo", {
                    id: user.id,
                    login: user.login,
                    isAuth: true,
                    name1: user.name1,
                    name2: user.name2,
                    name3: user.name3,
                    birthday: user.birthday,
                    mail: user.mail,
                    phone: user.phone,
                    photo: user.photo
                })
            }
        }
    },
    namespaced: true
}

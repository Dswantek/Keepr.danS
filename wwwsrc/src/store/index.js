import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

let base = window.location.host.indexOf('localhost') > -1 ? '//localhost:5000/' : '/'

let api = axios.create({
    baseURL: base + 'api/',
    timeout: 20000,
    withCredentials: true
})

let auth = axios.create({
    baseURL: base,
    timeout: 5000,
    withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
    state: {
        error: {},
        oauth: {},
        user: {},
        keeps: [],
        vaults: []
    },
    mutations: {
        handleError(state, err) {
            state.error = err
        },
        setUser(state, data) {
            state.user = data
            // state.oauth = data
        },
        setKeeps(state, data){
            debugger
            state.keeps = data
        }
    },
    actions: {
        // USER LOGIN/REGISTER/AUTHENTICATE/LOGOUT
        login({ commit, dispatch }, payload) {
            auth.post('accounts/login', payload)
                .then(res => {
                    if (!res.data.error) {
                        // dispatch('getAll')
                        commit('setUser', res.data)
                        router.push({ name: 'Home' })
                    } else {
                        commit('handleError', res.data)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        register({ commit, dispatch }, payload) {
            auth.post('accounts/register', payload)
                .then(res => {
                    commit('setUser', res.data.data)
                    dispatch('authenticate')
                })
        },
        authenticate({ commit, dispatch }) {
            auth('accounts/authenticate')
                .then(res => {
                    // dispatch('getAll')
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    router.push({ name: 'Login' })
                })
        },
        updateProfile({ commit, dispatch }, payload) {
            if (payload.username === '') {
                delete payload.username
            }
            if (payload.name === '') {
                delete payload.name
            }
            if (payload.email === '') {
                delete payload.email
            }
            // if (payload.password === '') {
            //     delete payload.password
            // }
            auth.put('accounts/update-account', payload)
                .then(res => {
                    debugger
                    dispatch('authenticate')
                })
        },
        googleAuthenticate({ commit, dispatch }, newData) {
            auth('authenticate')
                .then(res => {
                    dispatch('getAll')
                    if (res.data.data.name == undefined) {
                        res.data.data.name = newData.ig
                        res.data.data.image = newData.Paa
                        dispatch('updateProfile', res.data.data)
                        commit('setUser', res.data.data)
                        router.push({ name: 'Home' })
                    } else {

                        commit('setUser', res.data.data)
                        router.push({ name: 'Home' })
                    }
                })
                .catch(err => {
                    router.push({ name: 'Login' })
                })
        },
        getAll({ commit, dispatch }) {
            // dispatch('getWeather')
            // dispatch('getTodos')
            // dispatch('getEvents')
            // dispatch('getQuote')
            // dispatch('getBoards')
        },
        authenticateProfile({ commit, dispatch }) {
            auth('authenticate')
                .then(res => {
                    commit('setUser', res.data.data)
                })
                .catch(err => {
                    router.push({ name: 'Login' })
                })
        },
        logout({ commit, dispatch }) {
            auth.delete('accounts/logout')
                .then(res => {
                    commit('setUser', {})
                    // commit('setBoards', [])
                    // router.push({ name: 'Login' })
                })
        },
        createKeep({ commit, dispatch }, payload) {
            debugger
            api.post('keeps', payload)
                .then(res => {
                    dispatch('getKeeps')
                })
        },
        getKeeps({ commit, dispatch }){
            api('keeps')
                .then(res => {
                    debugger
                    commit('setKeeps', res.data)
                })
        }
    }
})

export default store
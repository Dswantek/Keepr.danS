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
        vaults: [],
        userKeeps: [],
        activeKeep: {},
        activeVault: {},
    },
    mutations: {
        handleError(state, err) {
            state.error = err
        },
        setUser(state, data) {
            state.user = data
            // state.oauth = data
        },
        setKeeps(state, data) {
            state.keeps = data
        },
        setVaults(state, data) {
            state.vaults = data
        },
        setUserKeeps(state, data) {
            state.userKeeps = data
        },
        setActiveKeep(state, data) {
            state.activeKeep = data
        },
        setActiveVault(state, data) {
            state.activeVault = data
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
                    dispatch('getVaultsByUser')
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
                    dispatch('authenticate')
                })
                .catch(err => {
                    commit('handleError', err)
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
        // getAll({ commit, dispatch }) {

        // },
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
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        createKeep({ commit, dispatch }, payload) {
            api.post('keeps', payload)
                .then(res => {
                    dispatch('getKeeps')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getKeeps({ commit, dispatch }) {
            api('keeps')
                .then(res => {
                    commit('setKeeps', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getKeepsByUser({ commit, dispatch }) {
            var userId = this.state.user.id
            api('keeps/' + userId, userId)
                .then(res => {
                    commit('setUserKeeps', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        deleteKeep({ commit, dispatch }, payload) {
            api.delete('keeps/' + payload)
                .then(res => {
                    dispatch('getKeepsByUser')
                    dispatch('getKeeps')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        setActiveKeep({ commit }, payload) {
            commit('setActiveKeep', payload)
        },
        updateKeep({ commit, dispatch }, payload) {
            debugger
            api.put('keeps/' + payload.id, payload)
                .then(res => {
                    dispatch('getKeeps')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        createVault({ commit, dispatch }, payload) {
            api.post('vaults/', payload)
                .then(res => {
                    dispatch('getVaultsByUser')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        setActiveVault({ commit }, payload) {
            commit('setActiveVault', payload)
        },
        getVaultsByUser({ commit, dispatch }) {
            var userId = this.state.user.id
            api('vaults/' + userId, userId)
                .then(res => {
                    commit('setVaults', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        deleteVault({ commit, dispatch }, payload) {
            api.delete('vaults/' + payload)
                .then(res => {
                    dispatch('getVaultsByUser')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        addKeepToVault({ commit, dispatch }, payload) {
            api.post('vaultkeeps/', payload)
                .then(res => {
                    dispatch('getKeeps')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getKeepsByVault({ commit, dispatch }, payload) {
            api('vaultkeeps/' + payload)
                .then(res => {
                    commit('setUserKeeps', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        removeKeepFromVault({ commit, dispatch }, payload) {
            api.delete('vaultkeeps/' + payload.keepId)
                .then(res => {
                    dispatch('getKeepsByVault')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
    }
})

export default store
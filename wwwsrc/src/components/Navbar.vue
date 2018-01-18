<template>
    <div id="navbar" class="container-fluid">
        <nav class="navbar navbar-default navbar-fixed-top myNavbar">
            <!-- WEBSITE NAME -->
            <div class="navbar-text col-xs-12 col-md-1" style="font-family: 'Rock Salt', cursive">
                <router-link class="pull-left brand" :to="'/'">
                    <!-- insert logo here -->
                    <h1>Keepr</h1>
                </router-link>
            </div>
            <div class="navbar-text col-xs-12 col-md-1">
                <router-link to="/">
                    <h4>Home</h4>
                </router-link>
            </div>
            <div class="navbar-text col-xs-12 col-md-1">
                <router-link to="/dashboard">
                    <h4>Dashboard</h4>
                </router-link>
            </div>
            <div class="navbar-text col-xs-12 col-md-1">
                <router-link to="/vaults">
                    <h4>Vaults</h4>
                </router-link>
            </div>
            <div class="navbar-text col-xs-12 col-md-1">
                <router-link to="/keeps">
                    <h4>Keeps</h4>
                </router-link>
            </div>
            <div class="navbar-form navbar-right col-xs-12 col-md-8">
                <div v-if="user.id">
                    <div class="row">
                        <div class="col-xs-12">
                            <h4>Welcome, {{user.name}}</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <button class="btn btn-info btn-md" data-toggle="modal" data-target="#profileModal">
                                <i class="fa fa-cog"></i> Settings</button>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <button class="btn btn-danger logout-button" @click="logoutUser">
                                <i class="fa fa-power-off"></i> Logout</button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-if="loginForm">
                        <div class="loginForm">
                            <form type="submit" @submit.prevent="loginUser">
                                <!-- USERNAME INPUT FORM -->
                                <div class="form-group">
                                    <input name="email" type="text" class="form-control" placeholder="Email" v-model='login.email'>
                                </div>
                                <!-- PASSWORD INPUT FORM -->
                                <div class="form-group">
                                    <input name="password" type="password" class="form-control" placeholder="Password" v-model='login.password'>
                                </div>
                                <!-- LOGIN BUTTON -->
                                <div class="form-group">
                                    <button type="submit" class="btn btn-default navbar-btn" @submit.prevent="submitLogin">Login</button>
                                </div>
                                <div class="signUpLink">
                                    <a class="toggle-link cursor" data-toggle="modal" data-target="signUpModal">Don't Have an Account? Sign-up</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div v-else>
                        <div class="loginButton">
                            <button type="button" class="btn btn-info btn-md" style="margin-top: 1.5rem" @click="toggleLoginForm">Login</button>
                        </div>
                        <div class="signUpButton">
                            <button type="button" class="btn btn-info btn-md" style="margin-top: 1.5rem" data-toggle="modal" data-target="#signUpModal">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <signup></signup>
        <profile></profile>
    </div>
</template>

<script>
    import Login from './Login'
    import Signup from './Signup'
    import Profile from './Profile'
    export default {
        name: 'navbar',
        data() {
            return {
                loginForm: false,
                login: {
                    // username: '',
                    email: '',
                    password: ''
                },
            }
        },
        components: {
            Signup,
            Profile
        },
        mounted() {
            this.$store.dispatch('authenticate')
        },
        methods: {
            toggleLoginForm() {
                this.loginForm = !this.loginForm
            },
            loginUser() {
                this.$store.dispatch('login', this.login)
                this.login = {
                    email: '',
                    password: ''
                }
            },
            logoutUser() {
                this.$store.dispatch('logout')
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #c934c1;
        margin-top: 20px;
    }

    .myNavbar {
        background-color: #40cc4c;
        border-color: black;
    }

    .navbar-text{
        color: #c934c1;
    }

    .brand {
        color: #c934c1;
    }
</style>
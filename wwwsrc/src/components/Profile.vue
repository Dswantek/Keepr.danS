<template>
    <!-- BEGIN MODAL -->

    <div id="profileModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal SIGN UP WINDOW -->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center"> Account Settings </h4>
                </div>
                <!-- EMAIL INPUT FORM -->
                <div class="modal-body">
                    <form type="submit" @submit.prevent="updateUserProfile">
                        <!-- USERNAME INPUT FORM -->
                        <label for="Name">
                            <span class="fa fa-user-circle-o"></span> Name: {{user.name}} </label>
                        <div class="form-group">
                            <input type="text" class="form-control" :placeholder="user.name" v-model="profile.name">
                        </div>
                        <label for="Username">
                            <span class="fa fa-user-secret"></span> Username: {{user.username}} </label>
                        <div class="form-group">
                            <input type="text" class="form-control" :placeholder="user.username" v-model="profile.username">
                        </div>
                        <label for="Email">
                            <span class="glyphicon glyphicon-envelope"></span> Email: {{user.email}} </label>
                        <div class="form-group">
                            <input type="text" class="form-control" :placeholder="user.email" v-model="profile.email">
                        </div>
                        <!-- PASSWORD INPUT FORM -->
                        <label for="Password">
                            <span class="glyphicon glyphicon-eye-open"></span> Password: </label>
                        <!-- <div class="form-group">
                            <input type="password" class="form-control" placeholder="Password" required v-model="profile.password">
                        </div> -->
                        <!-- SIGN UP BUTTON -->
                        <div class="form-group">
                            <button type="submit" class="btn btn-success navbar-btn btn-center">
                                <span class="glyphicon glyphicon-lock"></span> Update Profile </button>
                        </div>
                    </form>
                </div>
                <!-- MODAL CLOSE -->
                <div class="modal-footer">
                    <button type="submit" class="btn btn-danger" data-dismiss="modal">
                        <span class="glyphicon glyphicon-remove"></span> Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                profile: {
                    name: '',
                    username: '',
                    email: ''
                },
            }
        },
        methods: {
            updateUserProfile() {
                this.$store.dispatch('updateProfile', this.profile)
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
    #profileModal {
        background-color: #40cc4c;
    }
</style>
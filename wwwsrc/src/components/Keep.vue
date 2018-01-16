<template>
    <!-- BEGIN MODAL -->

    <div id="keepModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal SIGN UP WINDOW -->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center"> Account Settings </h4>
                </div>
                <!-- EMAIL INPUT FORM -->
                <div class="modal-body">
                    <form type="submit" @submit.prevent="createKeep">
                        <!-- USERNAME INPUT FORM -->
                        <label for="Name">
                            <span class="fa fa-user-circle-o"></span> Name:  </label>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="name your keep" v-model="keep.name">
                        </div>
                        <!-- <label for="Image">
                            <span class="fa fa-user-secret"></span> Post a Video or Picture </label>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="user.username" v-model="keep.url">
                        </div> -->
                        <label for="Description">
                            <span class="glyphicon glyphicon-envelope"></span> Description: </label>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="describe your keep here" v-model="keep.description">
                        </div>
                        <!-- SUBMIT BUTTON -->
                        <div class="form-group">
                            <button type="submit" class="btn btn-success navbar-btn btn-center">
                                <span class="glyphicon glyphicon-lock"></span> Submit Keep </button>
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
        name: 'Keep',
        data() {
            return {
                keep: {
                    name: '',
                    description: '',
                    url: ''
                }
            }
        },
        methods: {
            createKeep(){
                var newKeep = {
                    name: this.keep.name,
                    url: this.keep.url,
                    description: this.keep.description,
                    userId: this.user.id
                }
                this.$store.dispatch('createKeep', newKeep)
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
    /* #KeepModal {
        background-color: #40cc4c;
    } */
</style>
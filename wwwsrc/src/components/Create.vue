<template>
    <!-- BEGIN MODAL -->
    <div id="keepModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal SIGN UP WINDOW -->
            <div class="modal-content">
                <div class="modal-body row">
                    <div role="tabpanel" class="modal-title">
                        <ul class="nav nav-tabs" role="createOptions">
                            <li role="option" class="active col-md-6">
                                <a href="#keepTab" aria-controls="keepTab" rold="tab" data-toggle="tab">
                                    <span class="fa fa-camera"></span> Create Keep</a>
                            </li>
                            <li role="option" class="col-md-6">
                                <a href="#vaultTab" aria-controls="vaultTab" rold="tab" data-toggle="tab">
                                    <span class="fa fa-archive"></span> Create Vault</a>
                            </li>
                        </ul>
                        <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                    </div>
                    <!-- <h4 class="modal-title text-center"> Create Keeps and Vaults </h4> -->
               <!-- TAB CONTENT -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="keepTab">
                            <form type="submit" @submit.prevent="createKeep">
                                <!-- USERNAME INPUT FORM -->
                                <label for="Name">
                                    <span class="fa fa-tag"></span> Name: </label>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="name your keep" required v-model="keep.name">
                                </div>
                                <!-- ADD IMAGE VISABLE TO INPUT -->
                                <label for="Image">
                                    <span class="fa fa-picture-o"></span> Post a Video or Picture </label>
                                <div class="form-group">
                                    <textarea type="image" class="form-control" placeholder="add image or text here" v-model="keep.url"></textarea>
                                </div>
                                <label for="Description">
                                    <span class="fa fa-pencil"></span> Description: </label>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="describe your keep here" v-model="keep.description">
                                </div>
                                <!-- SUBMIT BUTTON -->
                                <div class="form-group">
                                    <button type="submit" class="btn btn-info navbar-btn btn-center">
                                        <span class="fa fa-share-square-o"></span> Create Keep </button>
                                </div>
                            </form>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="vaultTab">
                            <form type="submit" @submit.prevent="createVault">
                                <!-- USERNAME INPUT FORM -->
                                <label for="Name">
                                    <span class="fa fa-tag"></span> Name: </label>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="name your vault" required v-model="vault.name">
                                </div>
                                <label for="Image">
                                    <span class="fa fa-user-secret"></span> Photo: </label>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="add an image to make it easy to find your vault" v-model="vault.image">
                                </div>
                                <label for="Description">
                                    <span class="fa fa-pencil"></span> Description: </label>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="describe your vault here" v-model="vault.description">
                                </div>
                                <!-- SUBMIT BUTTON -->
                                <div class="form-group">
                                    <button type="submit" class="btn btn-info navbar-btn btn-center">
                                        <span class="fa fa-share-square-o"></span> Create Vault </button>
                                </div>
                            </form>
                        </div>
                    </div>
                <!-- MODAL CLOSE -->
                    <!-- <button type="submit" class="btn btn-danger" data-dismiss="modal">
                        <span class="glyphicon glyphicon-remove"></span> Close</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Create',
        data() {
            return {
                keep: {
                    name: '',
                    description: '',
                    url: '',
                    userId: ''
                },
                vault: {
                    name: '',
                    description: '',
                    image: '',
                    userId: ''
                }
            }
        },
        methods: {
            createKeep() {
                var newKeep = {
                    name: this.keep.name,
                    url: this.keep.url,
                    description: this.keep.description,
                    views: 0,
                    saves: 0
                }
                debugger
                this.$store.dispatch('createKeep', newKeep)
                this.keep = {
                    name: '',
                    description: '',
                    url: '',
                }
            },
            createVault() {
                var newVault = {
                    name: this.vault.name,
                    description: this.vault.description,
                    image: this.vault.image,
                    userId: this.user.id
                }
                debugger
                this.$store.dispatch('createVault', newVault)
                this.vault = {
                    name: '',
                    description: '',
                    userId: '',
                    image: ''
                }
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
    .tab-content{
        padding-top: 10vh;
        padding-left: 3vw;
        padding-right: 3vw;
    }
</style>
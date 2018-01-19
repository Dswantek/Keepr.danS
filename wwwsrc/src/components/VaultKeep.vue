<template>
    <!-- BEGIN MODAL -->
    <div id="vaultKeepModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center">Choose a Vault</h4>
                </div>
                <div class="modal-body row">
                    <form action="addKeepToVault" @submit.prevent="addKeepToVault(vaultKeep)">
                        <div class="form-group col-xs-6">
                            <div v-model="vaultKeep.keepId">
                                <h3>{{activeKeep.name}}</h3>
                                <img :src="activeKeep.url" class="keepImage" :alt="activeKeep.description">
                            </div>
                        </div>
                        <div class="form-group col-xs-6">
                            <select class="text-center row" v-model="vaultKeep.vaultId">
                                <option class="col-sm-3" selected>Select Category</option>
                                <option class="col-sm-3" v-for="vault in vaults" :value="vault.id">{{vault.name}}</option>
                            </select>
                        </div>
                        <!-- <div class="form-group col-xs-6">
                            <div v-for="vault in vaults" :value="vault.id">
                                <div class="row">

                                    <div class="col-xs-6">
                                        <h6>{{vault.name}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="form-group">
                            <button type="submit">Add Keep</button>
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
            name: 'VaultKeep'
            return {
                vault: {
                    name: '',
                    description: '',
                    image: '',
                    userId: '',
                    id: ''
                },
                keep: {
                    name: '',
                    description: '',
                    url: '',
                    userId: '',
                    id: '',
                    views: '',
                    saves: ''
                },
                acitveKeep: {
                    name: '',
                    description: '',
                    url: '',
                    userId: '',
                    id: '',
                    views: '',
                    saves: ''
                },
                vaultKeep: {
                    id: '',
                    keepId: '',
                    vaultId: '',
                    userId: ''
                }
            }
        },
        mounted() {
        },
        methods: {
            addKeepToVault(vaultKeep) {
                var newVaultKeep = {
                    keepId: this.activeKeep.id,
                    vaultId: vaultKeep.vaultId
                }
                this.$store.dispatch('addKeepToVault', newVaultKeep)
                this.updateKeep(this.activeKeep)
            },
            updateKeep(activeKeep){
                activeKeep.saves++
                this.$store.dispatch('updateKeep', activeKeep)
            }
        },
        computed: {
            vaults() {
                return this.$store.state.vaults
            },
            activeKeep() {
                return this.$store.state.activeKeep
            }
        }
    }
</script>

<style scoped>
    .keepImage {
        max-height: 25vh;
        max-width: 15vw;
    }

    .modal-dialog {
        margin: 25vh auto 0px auto;
    }
</style>
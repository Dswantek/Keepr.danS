<template>
    <div class="dashboard-content">
        <div class="newKeep">
            <div class="col-xs-12">
                <h1>Vaults</h1>
            </div>
            <div class="col-xs-12">
                <button type="button" class="btn btn-success btn-md" data-toggle="modal" data-target="#keepModal">
                    <h4>
                        <i class="fa fa-plus-square"></i>
                    </h4>
                </button>
            </div>
            <div class="col-xs-6">
                <div>
                    <h3>
                        <span class="fa fa-archive"></span>
                    </h3>
                    <h2>Your Vaults</h2>
                </div>
                <div class="posts">
                    <!-- all of the posts in order from most viewed -->
                    <div v-for="vault in vaults">
                        <div class="col-xs-12 col-md-10 text-center">
                            <div class="panel panel-default">
                                <div class="row">
                                    <span @click="setActiveVault(vault)">
                                        <div class="col-xs-1 pull-left">
                                            <img :src="vault.image" class="vaultImage">
                                        </div>
                                        <div class="col-xs-4 vaultName">
                                            <h3>{{vault.name}}</h3>
                                        </div>
                                        <div class="col-xs-4 vaultDescription">
                                            <p>{{vault.description}}</p>
                                        </div>
                                    </span>
                                    <div class="col-xs-1 pull-right">
                                        <span class="vaultDeleteButton fa fa-lg fa-trash" @click="deleteVault(vault.id)"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
                <div>
                    <h3>
                        <span class="fa fa-archive"></span>
                    </h3>
                    <h2>{{activeVault.name}}</h2>
                </div>
                <div class="posts">
                    <!-- all of the posts in order from most viewed -->
                    <div v-for="keep in vaultKeeps">
                        <div class="col-xs-12 col-md-4 text-center">
                            <div class="keep-content panel panel-info">
                                <div class="row">
                                    <div class="col-xs-offset-10">
                                        <span class="delete-button fa fa-trash" @click="deleteKeep(keep.id)"></span>
                                    </div>
                                </div>
                                <div class="row keepName">
                                    <div class="col-xs-12">
                                        <h3>{{keep.name}}</h3>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <img :src="keep.url" class="keepImage">
                                    </div>
                                </div>
                                <div class="row keepDescription">
                                    <div class="col-xs-12">
                                        <p>{{keep.description}}</p>
                                    </div>
                                    <div class="col-xs-4">
                                        <i class="fa fa-heart"></i>
                                        <p>{{keep.views}}</p>
                                    </div>
                                    <div class="col-xs-4">
                                        <i class="fa fa-plus"></i>
                                        <p>{{keep.saves}}</p>
                                    </div>
                                    <div class="col-xs-4">
                                        <i class="fa fa-share-alt"></i>
                                        <p>{{keep.likes}} </p>
                                    </div>
                                </div>
                                <div class="overlay hover-buttons">

                                    <div class="hoverButton col-xs-4">
                                        <button class="fa fa-lg fa-heart" @click="addLike(keep)"></button>
                                    </div>
                                    <div class="hoverButton col-xs-4">
                                        <button class="fa fa-lg fa-plus" data-toggle="modal" data-target="#vaultKeepModal" @click="setActiveKeep(keep)"></button>
                                    </div>
                                    <div class="hoverButton col-xs-4">
                                        <button class="fa fa-lg fa-share-alt" @click="shareKeep(keep)"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <create></create>
    </div>
</template>

<script>
    import VaultKeep from './VaultKeep'
    import Create from './Create'
    export default {
        name: 'Home',
        data() {
            return {
                keep: {
                    name: '',
                    description: '',
                    url: '',
                    userId: '',
                    id: '',
                    views: '',
                    saves: ''
                },
                vault: {
                    name: '',
                    description: '',
                    image: '',
                    userId: '',
                    id: ''
                },
                activeVault: {
                    name: '',
                    description: '',
                    image: '',
                    userId: '',
                    id: ''
                }
            }
        },
        components: {
            VaultKeep,
            Create
        },
        methods: {
            setActiveVault(vault) {
                this.$store.dispatch('setActiveVault', vault)
                this.$store.dispatch('getKeepsByVault', vault.id)
            },
            deleteKeep(keepId) {
                this.$store.dispatch('deleteKeep', keepId)
            },
            deleteVault(vaultId) {
                this.$store.dispatch('deleteVault', vaultId)
            }
        },
        mounted() {
            // this.$store.dispatch('getKeepsByVault')
        },
        computed: {
            vaultKeeps() {
                return this.$store.state.vaultKeeps
            },
            activeVault() {
                return this.$store.state.activeVault
            },
            vaults() {
                return this.$store.state.vaults
            },
            user() {
                return this.$store.state.user
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* h1,
            h2 {
              font-weight: normal;
            }
          
            ul {
              list-style-type: none;
              padding: 0;
            }
          
            li {
              display: inline-block;
              margin: 0 10px;
            }
          
            a {
              color: #42b983;
            } */

    .keep-content:hover .overlay {
        opacity: .5;
    }

    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: .5s ease;
        background-color: #40cc4c;
    }

    .hover-buttons {
        top: 50%;
        left: 50%;
        position: absolute;
        font-size: 30px;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .keepImage {
        max-width: 13vw;
        max-height: 30vh;
    }

    .vaultImage {
        max-width: 5vw;
        max-height: 15vh;
        border-radius: 10%;
    }

    .vaultName {
        padding-top: 2vh;
    }

    .vaultDescription {
        padding-top: 6vh;
    }

    .vaultDeleteButton {
        padding-top: 6vh;
    }

    /* .home-content{
              display: block;
              flex-wrap: wrap;
            } */
</style>
<template>
    <div class="home-content">
        <div class="row home-top">
            <div class="col-xs-12">
                <h1>Your Keeps</h1>
            </div>
            <div class="newKeep col-xs-4 col-md-1 pull-left">
                <button type="button" class="btn btn-success btn-md" data-toggle="modal" data-target="#keepModal">
                    <h4>
                        <i class="fa fa-plus-square"></i>
                    </h4>
                </button>
            </div>
            <!-- Display a list of keeps or posts from users for everyone to see
              Add a search bar, could have the search bar filter by categories.. not necessary.  -->
            <div class="searchPosts">
                <form action="searchKeeps" type="submit" @submit.prevent="searchKeeps">
                    <label for="Search">
                    </label>
                    <div class="form-group form-group-md col-xs-12 col-md-4 col-md-offset-7">
                        <input type="text" class="form-control-static" placeholder="Search all public keeps" required v-model="search.title">
                        <button type="submit" class="btn btn-md btn-success">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </form>
                <!-- search bar with possible filter -->
            </div>
        </div>
        <div class="posts">
            <!-- all of the posts in order from most viewed -->
            <div v-for="keep in keeps">
                <div class="col-xs-12 col-md-3 text-center">
                    <div class="panel panel-info">
                        <div v-if="user.id" class="row">
                            <div class="col-xs-offset-10">
                                <span class="delete-button fa fa-trash" @click="removeBoard(board)"></span>
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
                                <i class="fa fa-eye"></i>
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
                    </div>
                </div>
            </div>
        </div>
        <create></create>
    </div>
</template>

<script>
    import Create from './Create'
    export default {
        name: 'Home',
        data() {
            return {
                keep: {
                    name: '',
                    description: '',
                    url: ''
                },
                search: {
                    title: ''
                }
            }
        },
        components: {
            Create,
        },
        methods: {

        },
        mounted() {
            this.$store.dispatch('getKeeps')
        },
        computed: {
            keeps() {
                return this.$store.state.keeps
            },
            user() {
                return this.$store.state.user
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .keepImage {
        max-width: 20vw;
        max-height: 50vh;
    }

    .keep-top {
        margin-bottom: 5vh;
    }

    .newKeep{
        margin-bottom: 5vh;
    }

    /* .home-content{
          display: block;
          flex-wrap: wrap;
        } 
      
        h1,
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
</style>
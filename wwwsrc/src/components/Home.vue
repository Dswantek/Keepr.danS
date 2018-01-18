<template>
  <div class="home-content">
    <div class="row home-top">
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
          <div class="form-group form-group-md col-xs-12 col-md-4 col-md-offset-2">
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
        <div class="keep-content col-xs-12 col-md-3 text-center">
          <div class="panel panel-info">
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
                <i class="fa fa-heart" @click="addLike"></i>
                <p>{{keep.views}}</p>
              </div>
              <div class="col-xs-4" data-toggle="modal" data-target="#vaultKeepModal" @click="setActiveKeep(keep)">
                <i class="fa fa-plus"></i>
                <p>{{keep.saves}}</p>
              </div>
              <div class="col-xs-4">
                <i class="fa fa-share-alt"></i>
                <p>{{keep.likes}} </p>
              </div>
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
    <create></create>
    <vaultKeep></vaultKeep>
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
        search: {
          title: ''
        }
      }
    },
    components: {
      Create,
      VaultKeep
    },
    methods: {
      addLike(keep) {
        keep.views++,
        this.$store.dispatch('updateKeep', keep)
      },
      setActiveKeep(keep) {
        keep.views++
        this.$store.dispatch('setActiveKeep', keep)
        this.$store.dispatch('updateKeep', keep)
      }
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

  .home-top {
    margin-bottom: 5vh;
  }

  /* .home-content{
    display: block;
    flex-wrap: wrap;
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

.hover-buttons{
  top: 50%;
  left: 50%;
  position: absolute;
  font-size: 30px;
  transform: translate(-50%, -50%);
  text-align: center;
}
  /* .hoverButton{
    position: center;
  } */
</style>
<template>
  <div class="home-content">
    <div class="newKeep">
      <button type="button" class="btn btn-success btn-md" data-toggle="modal" data-target="#keepModal">
        <h4>K</h4>
      </button>
    </div>
    <!-- Display a list of keeps or posts from users for everyone to see
        Add a search bar, could have the search bar filter by categories.. not necessary.  -->
    <div class="searchPosts">
      <!-- search bar with possible filter -->
    </div>
    <div class="posts">
      <!-- all of the posts in order from most viewed -->
      <div v-for="keep in keeps">
        <div class="col-xs-10 col-md-4 text-center">
          <div class="panel panel-info">
            <div class="panel-heading">
              <span class="delete-button glyphicon glyphicon-remove-circle pull-right" @click="removeBoard(board)"></span>
              <!-- <router-link :to="'/keeps/' + keep.id"> -->
              <h3>{{keep.name}}</h3>
              <!-- </router-link> -->
            </div>
            <div class="panel-body">
              <p>{{keep.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <keep></keep>
  </div>
</template>

<script>
  import Keep from './Keep'
  export default {
    name: 'Home',
    data() {
      return {
        keep: {
          name: '',
          description: '',
          url: ''
        }
      }
    },
    components: {
      Keep
    },
    methods: {

    },
    mounted() {
      this.$store.dispatch('getKeeps')
    },
    computed: {
      keeps() {
        return this.$store.state.keeps
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
</style>
<template>
  <div id="app">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>
    <!-- End of Container -->
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  export default {
    name: 'app',
    data() {
      return {
      }
    },
    components: {
      Navbar
    },
    mounted() {
      this.$store.dispatch('authenticate')
    },
    methods: {
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
    background: black;
  }

  .page-content {
    margin-top: 18vh;
  }
</style>
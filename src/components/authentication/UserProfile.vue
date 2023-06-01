
<template>
<div>{{name}}
</div>
</template>


<script>
export default {
    name: 'UserProfile',
    data() {
        return{    name: '',};

  },
    mounted() {
    if (localStorage.username) {
      this.name = localStorage.username;
    }
  },
}
</script>
<template>
  <div id="setting">
   setting
  </div>
</template>

<script>
    let remote
    if (window.require) {
        remote = window.require('electron').remote
    }
    export default {
        name: 'Setting'

    }
</script>

<style>

</style>

<template>
  <div class="navWrapper">
    <div class="content"> Money</div>
    <Nav/>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Money',
};
</script>

<style lang="scss" scoped>
.navWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
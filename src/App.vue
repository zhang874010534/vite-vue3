<script setup>

import {useUrlHandle} from '@/common/js/useUrlHandle.js'

// url里的参数设置到缓存中
const {setLocalStorage} = useUrlHandle()
setLocalStorage()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss">

</style>

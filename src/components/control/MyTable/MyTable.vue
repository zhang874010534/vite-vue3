<script setup>
defineProps({
  data: Array,
  height: {
    type: String,
    default: '100%'
  }
})

</script>
<template>
  <el-table :data="data" style="width: 100%" :height="height" v-bind="$attrs">
    <slot></slot>
  </el-table>
</template>

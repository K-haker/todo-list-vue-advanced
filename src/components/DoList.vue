<template>
  <div class="do-list">
    <div v-if="toDoList.length > 0">
      <DoItem  @deleteDoItem="$emit('deleteDoItem', toDo)" @itemCompleted = "$emit('onItemCompleted', toDo)"   v-for="toDo in toDoList" :key="toDo.id"  :toDo="toDo" />
    </div>
    <h3 v-else>Список дел пуст</h3>
  </div>
</template>
  
<script>

import DoItem from '@/components/DoItem.vue'

export default {

  components:{
    DoItem
  },

  props:{
    toDoList:{
      type: Array,
      required: true,
    }
  },
}
</script>

<style>
  .do-list{
    width: 100%;
  }
</style>

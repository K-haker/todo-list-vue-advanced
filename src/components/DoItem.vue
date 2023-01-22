<template>
  <div :class="{ checked: toDo.checked === true }" class="list-item">
    <div class="list-item__todo">{{ toDo.dataBody }}</div>
    <button  @click="$emit('deleteDoItem', toDo)" class="list-item__delete">X</button>
  </div>
</template>

<script>
export default {
    props:{
      toDo:{
        type: Object,
        required:true,
      }
    },

    methods:{

    }
}
</script>

<style scoped>
  .list-item{

  }

  .list-item__todo{
    display: inline-block;
    margin-right: 15px;
  }
  .list-item__delete{
    display: inline-block;
    cursor: pointer;
  }

  .checked .list-item__todo{
    text-decoration: line-through;
  }

  .list-item{
    max-width: 245px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .list-item__todo{
    width: calc(100% - 30px)
  }

</style>
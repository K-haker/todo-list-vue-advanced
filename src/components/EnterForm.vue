<template>
    <form class="enter-form" action="">
      <input v-model="toDo.dataBody" type="text">
      <button @click.prevent="addToDo"> Добавить</button>
    </form>
</template>
  
<script>
export default {
    data(){
      return{
        toDo:{
          dataBody:"",
        }
      }
    },

    methods:{
      addToDo(){
        this.toDo.id = Date.now();
        this.$emit('createToDo', this.toDo);

        this.toDo = {
          dataBody:""
        }
      },
    }
}
</script>

<style>
  .enter-form{
    margin-bottom: 20px;
  }
</style>
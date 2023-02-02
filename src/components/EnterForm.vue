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
          completed: false,
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
    width:100%;
    display: flex; 
    justify-content: space-between;
  }

  .enter-form input{
    width:100%;
    margin-right: 20px;
  }
</style>
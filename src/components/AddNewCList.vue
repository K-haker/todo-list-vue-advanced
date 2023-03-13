<template>
  <div class="lists-add">
    <form action="">
      <button @click.prevent="createCList"> + </button>
    </form>
  </div>
</template>
  
<script>

export default {

  data(){
    return{
      listsItem:{
        name: "Новый список дел",
        completed: false,
        toDo:[

        ]
      }
    }
  },

    methods:{
      createCList(){
        this.listsItem.id = Date.now() ;
        this.$emit('createNewCList', this.listsItem);
      },
    }
}
</script>

<style>
</style>
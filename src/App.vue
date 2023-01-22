<template>
  <div class="main-block mar30">
    <h1>Список дел</h1>
    <EnterForm @createToDo="addToDo"/>
    <DoList @deleteDoItem = "deleteToDoItem" @checkedItem="didItem" class="do-item"  v-bind:toDoList="toDoList"/>
  </div>
</template>

<script>
  import EnterForm from '@/components/EnterForm.vue'
  import DoList from '@/components/DoList.vue'

  export default {
    name: 'App',
    components: {
      EnterForm,
      DoList,
    },

    data:() =>({
      toDoList:[
        
      ],
    }),

    methods:{

      addToDo(toDo){   
        this.toDoList.push(toDo)

        localStorage.setItem('toDoList', JSON.stringify(this.toDoList))
      },

      deleteToDoItem(toDo, index){
/*         this.toDoList = this.toDoList.filter(p=> p.id !== toDo.id) */
        this.toDoList.splice(index, 1)
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList))
      },
    },

    async mounted(){
      const data = await localStorage.getItem('toDoList')
      data? this.toDoList = JSON.parse(data) : null
    }
  }
</script>

<style>
#app {
  font-family:  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

li{
  list-style: none;
}

.mar30{
  margin-bottom: 30px;
}

.do-item{
  margin-right: auto;
}




</style>

<template>
  <div class="main-block mar30">  
    <div class="one-todo">
      <h1 class="main-block__title">Интересный список дел</h1>
      <div class="close__one-todo" title="закрыть этот список дел">Х</div>
      <EnterForm @createToDo="addToDo"/>
      <div class="tasks-block">
        <div class="tasks-counter">Кол-во задач: <span class="span-fw-700"> {{toDoList.length}} </span></div>
        <button v-if="toDoList.length > 0" @click="clearList" class="tasks-clear">Очистить</button>
      </div>
      <DoList @deleteDoItem = "deleteToDoItem"  @onItemCompleted="onItemCompleted" class="do-item"  v-bind:toDoList="toDoList"/>
      <button @click="deleteOneToDo" class="delete-one-todo" title="Удалить этот список дел">Удалить</button>   
    </div>
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

      deleteToDoItem(toDo){
        this.toDoList = this.toDoList.filter(p=> p.id !== toDo.id)
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList))

        console.log(toDo)
      },

      onItemCompleted(toDo){
        if(toDo.completed === true){
          toDo.completed = false
        } else {
          toDo.completed= true
        }
      },

      clearList(){
        this.toDoList.splice(0, this.toDoList.length)
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList))
      },

      deleteOneToDo(){
      }

    },

    async mounted(){
      const data =  localStorage.getItem('toDoList')
      if (data){
        this.toDoList = JSON.parse(data)
      }
    }
  }
</script>

<style>

</style>
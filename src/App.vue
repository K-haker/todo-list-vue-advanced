<template>
  <div class="main-block mar30">
    <h1>Список дел</h1>
    <EnterForm @createToDo="addToDo"/>
    <div class="tasks-counter">Кол-во задач: <span class="span-fw-700"> {{  toDoList.length }} </span></div>
    <DoList @deleteDoItem = "deleteToDoItem"  @onItemCompleted="onItemCompleted" class="do-item"  v-bind:toDoList="toDoList"/>

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
      },

      onItemCompleted(toDo){
        if(toDo.completed === true){
          toDo.completed = false
        } else {
          toDo.completed= true
        }
      },

    },

    async mounted(){
      const data =  localStorage.getItem('toDoList')
      /*data? this.toDoList = JSON.parse(data) : null*/ 

      if (data){
        this.toDoList = JSON.parse(data)
      }
    }
  }
</script>

<style>
a{
   text-decoration: none;
   color: black;
}

h1,h2,h3,h4,h5,h6{
   margin: 0;
   padding: 0;
}

*,
*:before,
*:after{
   margin: 0;
   padding: 0;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   font-family: sans-serif;
}

*:active,
*:focus{
   outline: none;
}


#app {
  font-family:  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  background-color: #f5f5dc;
  width:100%;
  height: 100vh;
}

.main-block{
  margin-top: 60px;
  padding: 30px;
  background-color: #ffffff;
  height: auto;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.229);
  max-width: 400px;
  width: 100%;
}

li{
  list-style: none;
}

.do-item{
  margin-right: auto;
}

h1{
  margin-bottom: 30px;
}

.tasks-counter{
  margin-bottom: 15px;
}

.span-fw-700{
  font-weight: 700;
}



</style>

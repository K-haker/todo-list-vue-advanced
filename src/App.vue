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

      deleteToDoItem(toDo){
        this.toDoList = this.toDoList.filter(p=> p.id !== toDo.id)
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



</style>

<template>
  <div class="lists" >
    <h1>Недатированный список дел</h1>
    <input class="lists-search" type="text" placeholder="Поиск">
    <AddNewCList @createNewCList="createCList" ></AddNewCList>
    <button v-show="notCalendarList.length > 0"  class="clear-nclist"  @click="clearNCList">Очистить </button>
    <ListsItem  @deleteCList = "deleteCList"  v-model:notCalendarList="notCalendarList" @onItemsNCListCompleted="onItemsNCListCompleted"></ListsItem>
    <div v-if="notCalendarList.length == 0">Список дел сейчас пуст</div>
    <ModalDeleteNotCalendList @deleteCListYes = "deleteCListYes" @closeModalDeleteNCList="closeModalDeleteNCList" v-model:show="dialogVisible"></ModalDeleteNotCalendList>
  </div>

  <router-link to="/">Переход на главную</router-link>
</template>

<script>
import ListsItem from '@/components/ListsItem.vue'
import AddNewCList from '@/components/AddNewCList.vue'
import ModalDeleteNotCalendList from '@/components/ModalDeleteNotCalendList.vue'

export default {
  components:{
      ListsItem,
      AddNewCList,
      ModalDeleteNotCalendList
  },

  data(){
    return{
      notCalendarList:[

      ],

      dialogVisible: false,

      listId: 0,
    }
  },
  methods:{
    createCList(listsItem){
      this.notCalendarList.push(listsItem)
      localStorage.setItem('notCalendarList', JSON.stringify(this.notCalendarList))
    },

    onItemsNCListCompleted(listsItem){
      if(listsItem.completed === true){
        listsItem.completed = false
      } else {
        listsItem.completed= true
      }
    },

    clearNCList(){
      this.notCalendarList.splice(0, this.notCalendarList.length)
      localStorage.setItem('notCalendarList', JSON.stringify(this.notCalendarList))
    },

    deleteCList(listsItem){
      this.dialogVisible = true
      this.listId = listsItem.id
      console.log(this.listId)
    },

    deleteCListYes(){
      this.notCalendarList = this.notCalendarList.filter(a => a.id != this.listId)
      localStorage.setItem('notCalendarList', JSON.stringify(this.notCalendarList))  
       this.dialogVisible = false
    },

    closeModalDeleteNCList(){
      this.dialogVisible = false
      console.log(this.dialogVisible)
    }
  },

    async mounted(){
      const data =  localStorage.getItem('notCalendarList')
      if (data){
        this.notCalendarList = JSON.parse(data)
      }
    }
}
</script>

<style>
  .lists{
    background-color: #ffffff;
    padding: 50px;
    border-radius: 30px;
  }

  .lists__main{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .lists-search{
    margin-bottom: 30px;
  }

  .lists-add{
    margin-bottom: 30px;
  }

  .lists-add button{
    font-size: 28px;
    background-color: rgba(0, 255, 0, 0.568);
    border: none;
    width: 50px;
    border-radius: 15px;
    cursor: pointer;
  }

  .clear-nclist{
    margin-bottom: 20px;
  }
</style>
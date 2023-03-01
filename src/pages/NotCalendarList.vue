<template>
  <div class="lists" >
    <h1>Недатированный список дел</h1>
    <input class="lists-search" type="text" placeholder="Поиск">
    <add-new-c-list @createNewCList="createCList" ></add-new-c-list>
    <button v-show="notCalendarList.length > 0"  class="clear-nclist"  @click="clearNCList"  @deleteAllCListsYes ="clearNCList">Очистить </button>
    <lists-item @renameList = "renameList"  @deleteCList = "deleteCList"  v-model:notCalendarList="notCalendarList" @onItemsNCListCompleted="onItemsNCListCompleted"></lists-item>
    <div v-if="notCalendarList.length == 0">Список дел сейчас пуст</div>
    <modal-delete-not-calend-list @deleteCListYes = "deleteCListYes" @closeModalDeleteNCList="closeModalDeleteNCList" v-model:show="dialogVisible"></modal-delete-not-calend-list>
    <modal-rename-list   @renameList = "renameList" @newNameList ="newNameList" @closeModalRenameList="closeModalRenameList" v-model:show="renameModalVisible" v-model="newListName"></modal-rename-list>
    <modal-delete-all-lists v-model:show="dialogVisible" @closeDeleteAllLists="closeDeleteAllLists"></modal-delete-all-lists>
  </div>

  <router-link to="/">Переход на главную</router-link>
</template>

<script>
import ListsItem from '@/components/ListsItem.vue'
import AddNewCList from '@/components/AddNewCList.vue'
import ModalDeleteNotCalendList from '@/components/ModalDeleteNotCalendList.vue'
import ModalRenameList from '@/components/ModalRenameList.vue'
import ModalDeleteAllLists from '@/components/ModalDeleteAllLists.vue'

export default {
  components:{
      ListsItem,
      AddNewCList,
      ModalDeleteNotCalendList,
      ModalRenameList,
      ModalDeleteAllLists
  },

  data(){
    return{
      notCalendarList:[

      ],
      dialogVisible: false,
      dialogDeleteAll: false,
      renameModalVisible: false,
      newListName:"123",
      listId: 0,
    }
  },
  methods:{
    /*Открытие модального окна для переименования списка дел */
    renameList(listsItem,){
      this.renameModalVisible = true
      this.listId = listsItem.id 
    },

    /* Переименование списка дел и закрытие модального окна */
    newNameList(newNameOfList, newListName){
      let listId = this.listId
      let newNameList = newListName
      let locStorNCList = this.notCalendarList
      this.notCalendarList.map(function(item){
        if(item.id == listId){
          item.name = newNameList
          localStorage.setItem('notCalendarList', JSON.stringify(locStorNCList))

        }
      })

      this.renameModalVisible = false
    },

    closeModalRenameList(){
      this.renameModalVisible = false
    },

    createCList(listsItem){
      this.notCalendarList.push(listsItem)
      localStorage.setItem('notCalendarList', JSON.stringify(this.notCalendarList))
    },

    onItemsNCListCompleted(listsItem, ){
      if(listsItem.completed === true){
        listsItem.completed = false
        localStorage.setItem('notCalendarList', JSON.stringify(this.notCalendarList))
      } else {
        listsItem.completed = true
        localStorage.setItem('notCalendarList', JSON.stringify(this.notCalendarList))
      }
    },

    clearNCList(){
      this.notCalendarList.splice(0, this.notCalendarList.length)
      localStorage.setItem('notCalendarList', JSON.stringify(this.notCalendarList))
    },

    deleteCList(listsItem){
      this.dialogVisible = true
      this.listId = listsItem.id
    },

    deleteCListYes(){
      this.notCalendarList = this.notCalendarList.filter(a => a.id != this.listId)
      localStorage.setItem('notCalendarList', JSON.stringify(this.notCalendarList))  
      this.dialogVisible = false
    },

    closeModalDeleteNCList(){
      this.dialogVisible = false
    },

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
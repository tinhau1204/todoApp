<template>
  <div class="badass-todo">
    <div class="title has-text-centered">
      Badass Todo
    </div>
    <!-- search -->

    <form
      @submit.prevent="addTodo"
      >
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newTodoContent"
            class="input"
            type="text"
            placeholder="Add a todo ">
        </p>
        <p class="control">
          <button
            :disabled="!newTodoContent"
            class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>
      <!--Card  -->
    <div 
    class="card mb-5"
    v-for="todo in todos"
    :class="{'has-background-success-light' : todo.done }"
    >
      <div class="card-content">
        <!-- Card content -->
          <div class="content">
            <div class="columns is-mobile is-vcentered">
              <div
                :class="{'has-text-success line-through' : todo.done}"
                class="column">
                {{ todo.content }}     
              </div>
              <!-- Card Button -->
            <div class="column is-5 has-text-right">
              <button
                @click="toggleDone(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
                class="button">
                &check;
              </button>
              <button
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2">
                &cross;
              </button>     
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup>
  /* 
    import
  */
  import { ref, onMounted } from 'vue';
  import {
    collection, onSnapshot,
    doc, addDoc, deleteDoc, updateDoc,
    query, orderBy
  } from 'firebase/firestore';
  import { db } from '@/firebase';
  
  /* 
    codes
  */

  // set up collectionref
  const collectionRef = collection(db, 'todos');
  
  const collectionRefQuery = query(collectionRef, orderBy("date", "desc"));

  const todos = ref([
    // {
      //   id: 'id1',
      //   content: 'shave my butt',
    //   done: false
    // },
    // {
    //   id: 'id2',
    //   content: 'wash my butt',
    //   done: true,
    // }
  ])

      /*
        get todos
      */

  onMounted(async () => {
    onSnapshot(collectionRefQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
          const todo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done,
        }
        fbTodos.push(todo);
    });
    todos.value = fbTodos;
    });
  });

  /*
  add Todo
  */

 const newTodoContent = ref('');
 
 const addTodo = async () => {   
    addDoc(collectionRef, {
      content: newTodoContent.value,
      done: false,
      date: Date.now(),
    });
    newTodoContent.value = '';  
  }

  /*
    delete todo
  */

  const deleteTodo = (id) => {
    deleteDoc(doc(collectionRef, id))
  }

  /* 
    Mark Done
  */
  const toggleDone = (id) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    updateDoc(doc(collectionRef,id),{
      done: !todos.value[index].done,
    })
  }
</script>


<style>
  @import 'bulma/css/bulma.min.css';
  .badass-todo{
    max-width: 400px;
    padding: 20px;
    margin: 0 auto;
  }
  .line-through{
    text-decoration: line-through;
    font-weight: 500;
  }
</style>
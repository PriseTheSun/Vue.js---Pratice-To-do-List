alert ('Obrigado por avaliar meu projeto, a inspiração partiu de uma video aula do youtube, pelas as possibilidade e facilidades que o Framework oferecem, e uma vontatade infinita de aprender e enteder o Vue.js mesmo que ainda não seja fluente em Js,  porem as bibliotécas tem me ajudado a superar a falta de conhecimento imediato. Mais uma passo dado');

Vue.component('togglebutton', {
  props: ['label', 'name'],
  template: `<div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
      <label v-bind:for="name">
        <span class="togglebutton-label">{{ label }}</span>
        <span class="tooglebutton-box"></span>
      </label>
      <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle">
  </div>`,
  model: {
    prop: 'checked',
    event: 'change'
  },
  data: function() {
    return {
      isactive:false
    }
  },
  methods: {
    onToogle: function() {
       this.$emit('clicked', this.isactive)
    }
  }
});

var todolist = new Vue({
  el: '#todolist',
  data: {
    newitem:'',
    sortByStatus:false,
    todo: [
      { id:1, label: "Aprender VueJs", done: true },
      { id:2, label: "Configurar Lista de To Do", done: false },
      { id:3, label: "Tomar Café", done: false }
    ]
  },
  methods: {
    addItem: function() {
      this.todo.push({id: Math.floor(Math.random() * 9999) + 10, label: this.newitem, done: false});
      this.newitem = '';
    },
    markAsDoneOrUndone: function(item) {
      item.done = !item.done;
    },
    deleteItemFromList: function(item) {
      let index = this.todo.indexOf(item)
      this.todo.splice(index, 1);
    },
    clickontoogle: function(active) {
      this.sortByStatus = active;
    }
  },
  computed: {
    todoByStatus: function() {

      if(!this.sortByStatus) {
        return this.todo;
      }

      var sortedArray = []
      var doneArray = this.todo.filter(function(item) { return item.done; });
      var notDoneArray = this.todo.filter(function(item) { return !item.done; });
      
      sortedArray = [...notDoneArray, ...doneArray];
      return sortedArray;
    }
  }
});
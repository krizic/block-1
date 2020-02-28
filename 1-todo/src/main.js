// Waiting for jQuery to initialize
$(document).ready(function() {
  // Initialize Class (Component)
  new TodoListService($, uuidv4);
});

// Declaring our component class
class TodoListService {
  // Declaring class level properties
  LIST_ID = 'todolist';
  COUNT_ID = '#testcount';
  SORT_ID = '#sorting';
  sortDesc = false;
  TODO_CONTAINER = 'aside.todo-items';
  TODO_INPUT = 'input.todo-title';
  RADIO_SELECT = "input[type='radio']";
  // array of objets
  existingTodos;
  jQuery;
  uuidv4;
  StatusEnum = {
    DONE: 0,
    TODO: 1
  };

  constructor(jQuery, uuidv4) {
    this.jQuery = jQuery;
    this.uuidv4 = uuidv4;
    this.loadFromStorage();
    this.render(this.existingTodos);
    this.onEnterInit();
    this.onRemoveInit();
    this.onDoneInit();
    this.onSortInit();
    this.onRadioInit();
  }

  loadFromStorage() {
    // localStorage read
    this.existingTodos = this.readStorage(this.LIST_ID);
  }

  // Rendering function for updating view
  render(todosList) {
    // replacing whole html content with result of array iteration
    this.jQuery(this.TODO_CONTAINER).html(
      todosList.map(item => {
        const title = item.title;
        const id = item.id;
        const ageInMin =
          Math.round((Date.now() - item.creationDate) / (1000 * 60)) + ' min';
        return `<div id=${id} class='${'status'.concat(item.status)}' >
                  <p>${title}</p><p>${ageInMin}</p>
                  <p><span class='status'></p>
                  <button id='remove' >Remove</button>
                  <button id='done'>Done</button>
                </div>`;
      })
    );

    this.jQuery(this.COUNT_ID).text(this.existingTodos.length);
  }

  /**
   * Used to add new items to a list
   *
   * @param {string} item new item value
   */
  addItemToList(item) {
    const itemTask = {
      id: this.uuidv4(),
      creationDate: Date.now(),
      title: item,
      status: this.StatusEnum.TODO
    };
    this.existingTodos.push(itemTask);
    this.storeList(this.LIST_ID, this.existingTodos);
    this.render(this.existingTodos);
  }

  /**
   * Used to read items from LocalStorage
   *
   * @param {*} listId
   */
  readStorage(listId) {
    if (localStorage.length && localStorage.getItem(listId)) {
      const arrayOfTask = JSON.parse(localStorage.getItem(listId) ?? []);
      return arrayOfTask;
    } else {
      localStorage.setItem(listId, []);
      return [];
    }
  }

  /**
   *
   * Used to store an array to the LocalStorage
   *
   * @param {*} listId localStorage key
   * @param {*} toDos array of todos
   */
  storeList(listId, toDos) {
    try {
      localStorage.setItem(listId, JSON.stringify(toDos));
    } catch (e) {
      console.error(e);
    }
  }

  findIndexOfTask(id) {
    return this.existingTodos
      .map(function(e) {
        return e.id;
      })
      .indexOf(id);
  }
  /**
   *
   * Used to remove one item from the local storage
   *
   * @param {*} item value of an array item
   */
  removeItemFromList(id) {
    const index = this.findIndexOfTask(id);
    if (index > -1) {
      this.existingTodos.splice(index, 1);
      this.storeList(this.LIST_ID, this.existingTodos);
    }
    this.render(this.existingTodos);
  }

  doneItemFromList(id) {
    const index = this.findIndexOfTask(id);
    if (index > -1) {
      this.existingTodos[index].status = this.StatusEnum.DONE;
      this.storeList(this.LIST_ID, this.existingTodos);
    }
    this.render(this.existingTodos);
  }

  sortTasksByDate(asc) {
    const direction = asc == true ? 1 : -1;
    let sortedTodos = this.existingTodos.slice();
    sortedTodos.sort((a, b) => {
      return (b.creationDate - a.creationDate) * direction;
    });
    this.render(sortedTodos);
    this.sortDesc = !this.sortDesc;
  }

  /**
   * Binds onEnter event to the component input
   */
  onEnterInit() {
    this.jQuery(this.TODO_INPUT).keypress(e => {
      const key = e.which;
      const value = e.target.value;
      if (key == 13 && value) {
        $(this.TODO_INPUT).val('');
        this.addItemToList(value);
        return false;
      }
    });
  }

  /**
   * Binds onDone event to the component input
   */
  onDoneInit() {
    this.jQuery(this.TODO_CONTAINER).on('click', 'button#done', e => {
      this.doneItemFromList(
        this.jQuery(e.target)
          .parent()
          .attr('id')
      );
    });
  }

  /**
   * Binds onRemove event to the component input
   */
  onRemoveInit() {
    this.jQuery(this.TODO_CONTAINER).on('click', 'button#remove', e => {
      this.removeItemFromList(
        this.jQuery(e.target)
          .parent()
          .attr('id')
      );
    });
  }

  /**
   * Binds onSort event to the component input
   */
  onSortInit() {
    this.jQuery(this.SORT_ID).click(e => {
      this.sortTasksByDate(this.sortDesc);
    });
  }

  /**
   * Binds onSort event to the component input
   */
  onRadioInit() {
    this.jQuery(this.RADIO_SELECT).click(e => {
      /*       console.log('radio clicked'); */
      const radioValue = $("input[id='task']:checked").val();
      const done = $("input[value='done']").val();
      const todo = $("input[value='todo']").val();
      const all = $("input[value='all']").val();

      if (radioValue === done) {
        console.log('You selected a - ' + radioValue);
      } else if (radioValue === todo) {
        console.log('You selected a - ' + radioValue);
        $('.filter').css('background-color', 'lightgreen');
      } else {
        console.log('You selected a - ' + all);
        $('.filter').css('background-color', 'white');
      }
      $('.filter').css('background-color', 'lightblue');
      const result = this.existingTodos.filter(
        todo => todo.status == radioValue
      );
      this.render(result);
      console.log(result);
    });
  }
}

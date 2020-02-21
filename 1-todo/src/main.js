// Waiting for jQuery to initialize
$(document).ready(function() {
  // Initialize Class (Component)
  new TodoListService($);
});

// Declaring our component class
class TodoListService {
  // Declaring class level properties
  LIST_ID = "todolist";
  TODO_CONTAINER = "aside.todo-items";
  TODO_INPUT = "input.todo-title";
  existingTodos;
  jQuery;

  constructor(jQuery) {
    this.jQuery = jQuery;
    this.render();
    this.onEnterInit();
    this.onRemoveInit();
  }

  // Rendering function for updating view
  render() {
    // localStorage read
    this.existingTodos = this.readStorage(this.LIST_ID);

    // replacing whole html content with result of array iteration
    this.jQuery(this.TODO_CONTAINER).html(
      this.existingTodos.map(item => {
        return "<div><p>" + item + "</p><button>Remove</button></div>";
      })
    );
  }

  /**
   * Used to add new items to a list
   *
   * @param {string} item new item value
   */
  addItemToList(item) {
    this.existingTodos.push(item);
    this.storeList(this.LIST_ID, this.existingTodos);
    this.render();
  }

  /**
   * Used to read items from LocalStorage
   *
   * @param {*} listId
   */

  readStorage(listId) {
    if (localStorage.length) {
      return localStorage.getItem(listId)?.split(",") ?? [];
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
      localStorage.setItem(listId, toDos);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   *
   * Used to remove one item from the local storage
   *
   * @param {*} item value of an array item
   */
  removeItemFromList(item) {
    const index = this.existingTodos.indexOf(item);
    if (index > -1) {
      this.existingTodos.splice(index, 1);
      this.storeList(this.LIST_ID, this.existingTodos);
    }
    this.render();
  }

  /**
   * Binds onEnter event to the component input
   */
  onEnterInit() {
    this.jQuery(this.TODO_INPUT).keypress(e => {
      const key = e.which;
      const value = e.target.value;
      if (key == 13 && value) {
        $(this.TODO_INPUT).val("");
        this.addItemToList(value);
        return false;
      }
    });
  }

  /**
   * Binds onRemove event to the component input
   */
  onRemoveInit() {
    this.jQuery(this.TODO_CONTAINER).on("click", "button", e => {
      this.removeItemFromList(
        this.jQuery(e.target)
          .prev()
          .text()
      );
    });
  }
}

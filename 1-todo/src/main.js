const init = function(){
    console.log("%cInitialised!", 'background: #ff0000; color: #bada55; font-size: 2rem');
}

init();

$( document ).ready(function() {

    // load todoList
    var todoService = new TodoListService();
    var existingTodos = todoService.listTodos;
    existingTodos.forEach(function (item, index) {
        $("aside.todo-items").append("<div><p>"+item+"</p><button>Remove</button></div>");
      });

    // add item to list
    $("input.todo-title").keypress((e) => {
        var key = e.which;
        var value = e.target.value;
        if(key == 13 && value) { // the enter key code
            $("aside.todo-items").append("<div><p>"+value+"</p><button>Remove</button></div>");
            $("input.todo-title").val('');
            todoService.addItemToList(value);
            return false;  
        }

    });

    // remove items from list
    $("aside.todo-items").on('click', 'button', function(e){
        todoService.removeItemFromList($(this).prev().text());
        $(this).parent().remove();
     });
});


function TodoListService() {

    var listId = "todolist";
    var listTodos = readStorage();

    this.addItemToList = addItemToList;
    this.removeItemFromList = removeItemFromList;
    this.listTodos = listTodos;

    function readStorage() {
        try {
            var list = localStorage.getItem(listId).split(",");
            return list;
        } catch(e) {
            console.error(e);
            return  [];
        }
    }

    function storeList() {
        try {
            localStorage.setItem(listId, listTodos);
        } catch(e) {
            console.error(e);
        }
    }

    function addItemToList(item) {
        this.listTodos.push(item); 
        storeList();
    }

    function removeItemFromList(item) {
        const index = this.listTodos.indexOf(item);
        if (index > -1) {
            listTodos.splice(index, 1);
            storeList();
        }
    }

}


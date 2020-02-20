const init = function(){
    console.log("%cInitialised!", 'background: #ff0000; color: #bada55; font-size: 2rem');
}

init();

$( document ).ready(function() {

    $("input.todo-title").keypress((e) => {
        var key = e.which;
        var value = e.target.value;
        if(key == 13 && value) { // the enter key code
            $("aside.todo-items").append("<div><p>"+value+"</p><button>Remove</button></div>");
            $("input.todo-title").val('');

         
            return false;  
        }

    });

    $("aside.todo-items").on('click', 'button', function(events){
        $(this).parent().remove();
     });
});
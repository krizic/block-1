const init = function(){
    console.log("%cInitialised!", 'background: #ff0000; color: #bada55; font-size: 2rem');



}

init();

$( document ).ready(function() {
    $("input.todo-title").keypress((e) => {
        console.log(e.target.value);
    })
});
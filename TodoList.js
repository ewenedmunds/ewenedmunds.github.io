
var textEntry = document.querySelector("#todo-text-entry");
var todoItemHolder = document.querySelector("#list-holder");

var todoList = [];

var addItem = function () {
    var newItem = textEntry.value;
    
    if (todoList.includes(newItem) == false && newItem.length >= 1){
        
        todoList = todoList.concat([textEntry.value]);

        console.log(todoList);

        drawList();
    }
}

var deleteItem = function (indexOfItem) {
    todoList = todoList.filter(function(x) {return x != todoList[indexOfItem];});
    
    console.log(todoList);
    
    drawList();
}

var drawList = function () {
    while (todoItemHolder.childElementCount > 0){
        todoItemHolder.removeChild(todoItemHolder.children.item(0));
    }
    

    
    for(var i = 0; i<todoList.length; i++){
        
        var newItem = document.createElement("div"+i.toString());
    
        newItem.className = "todo-list-item";

        newItem.innerHTML = todoList[i];

        //Create the button allowing you to remove the item from the list
        var deleteButton = document.createElement("div"+i.toString());

        deleteButton.innerHTML = `
        <form>
            <input type="button" value="Completed?" onclick="deleteItem(${i})">
        </form>
    `;

        newItem.appendChild(deleteButton);

        todoItemHolder.appendChild(newItem);
    }
}
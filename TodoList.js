
var textEntry = document.querySelector("#todo-text-entry");
var todoItemHolder = document.querySelector("#list-holder");

var todoList = [];

// Code snippet for localStorage
var storage = (function () {
	var uid = new Date;
	var storage;
	var result;
	try {
		(storage = window.localStorage).setItem(uid, uid);
		result = storage.getItem(uid) == uid;
		storage.removeItem(uid);
		return result && storage;
	} catch (exception) {}
}());

var drawList = function () {
    //Delete each todo displayed on the page
    while (todoItemHolder.childElementCount > 0) {
        todoItemHolder.removeChild(todoItemHolder.children.item(0));
    }
    
    //Add each todo item in our current list to the page
    for (var i = 0; i<todoList.length; i++){
        
        var newItem = document.createElement("div");
    
        newItem.className = "todo-list-item";

        newItem.innerHTML = "<p>"+(i+1).toString()+". "+todoList[i]+"</p>";

        //Create the button allowing you to remove the item from the list
        var deleteButton = document.createElement("div");

        deleteButton.innerHTML = `
        <form>
            <input type="button" value="Completed?" onclick="deleteItem(${i})">
        </form>
    `;

        newItem.appendChild(deleteButton);

        todoItemHolder.appendChild(newItem);
    }
};

//Adds the text currently in the entry field to the todo list, then updates the display, and saves the list
var addItem = function () {
    var newItem = textEntry.value;
    
    if (todoList.includes(newItem) === false && newItem.length >= 1) {
        
        todoList = todoList.concat([textEntry.value]);

        if (storage){
            storage.setItem("todo", JSON.stringify(todoList));
        }
        
        drawList();
    }
};

//Removes the item at given index from our todoList, then updates the display, and saves the list
var deleteItem = function (indexOfItem) {
    todoList = todoList.filter(function(x) {return x != todoList[indexOfItem];});
    
    if (storage){
        storage.setItem("todo", JSON.stringify(todoList));
    }
    
    drawList();
};

todoList = JSON.parse(storage.getItem("todo"));

if (todoList == null){
    todoList = []
}
else{
    drawList();
}
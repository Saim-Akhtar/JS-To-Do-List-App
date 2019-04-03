$(document).ready(function () {
    $('.parallax').parallax();
});
$(document).ready(function () {
    $('.tooltipped').tooltip();
});
$(document).ready(function () {
    $('.modal').modal();
});


//   Here we go
var to_do_part=document.getElementById("to-do-portion");
var to_do_list = document.getElementById("to-do-list");



var saved = document.getElementById("save");
var add = document.getElementById("adding-to-do");
var added;

// to check if the added value is not null
function save_check() {
    added = add.value;
    added = added.trim()
    if (added !== "") {
        var list_elem = document.createElement("li");
        var labels = document.createElement("label");
        var input_check = document.createElement("input");
        input_check.type = "checkbox";
        var spans = document.createElement("span");
        var del_btn = document.createElement("button");
        var edit_btn = document.createElement("button");
        var icon_d = document.createElement("i");
        var icon_e = document.createElement("i");

        list_elem.classList.add('collection-item', 'to-do');
        labels.className = "black-text";
        input_check.classList.add('filled-in');
        spans.innerText = added;
        del_btn.classList.add('btn-small', 'btn-floating', 'red', 'right', 'delete_button');
        edit_btn.classList.add('btn-small', 'btn-floating', 'blue', 'right', 'edit_button');
        icon_d.className = "material-icons"
        icon_d.innerText = "delete";
        icon_e.className = "material-icons"
        icon_e.innerText = "edit";

        labels.appendChild(input_check);
        labels.appendChild(spans);
        del_btn.appendChild(icon_d);
        edit_btn.appendChild(icon_e);


        list_elem.appendChild(labels);
        list_elem.appendChild(del_btn);
        list_elem.appendChild(edit_btn);
        to_do_list.appendChild(list_elem);
        
        add.value = "";
        regulate_events();
    }
}
saved.addEventListener('click', save_check);
// for deleting an activity
function deleting_activity() {
    var listItem = this.parentNode;
    to_do_list.removeChild(listItem);

}
// to check if the activity is checked
function complete_check() {
    var labelItem = this.parentNode;
    labelItem.classList.toggle("checked_activity");
}
// cancelling he edit box
function closing_edit(listItem,labelItem,edit_part){
    
    listItem.insertBefore(labelItem,edit_part);
    listItem.removeChild(edit_part);
}
// saving teh edited text
function saving_edit(listItem,labelItem,edit_part){
    var get_input=edit_part.querySelector('input[type=text]');
    if(get_input.value === ""){
        closing_edit(listItem,labelItem,edit_part);
        return true;
    }
    var spanLabel=labelItem.querySelector('span');
    spanLabel.innerText=get_input.value;
    listItem.insertBefore(labelItem,edit_part);
    listItem.removeChild(edit_part);
    
}
// for the editing of an acitivity
function editing_activity(){
    var listItem=this.parentNode;
    var labelItem=listItem.querySelector("label");
    var labelSpan=labelItem.querySelector("span");
    listItem.removeChild(labelItem);
    
    
    var save_edit=document.createElement("a");
    save_edit.href="JavaScript:void(0);";
    var save_edit_icon=document.createElement("i");
    save_edit_icon.className="material-icons";
    save_edit_icon.innerText="done";
    save_edit.appendChild(save_edit_icon);


    var close_edit=document.createElement("a");
    close_edit.href="JavaScript:void(0);";
    var close_edit_icon=document.createElement("i");
    close_edit_icon.className="material-icons";
    close_edit_icon.innerText="close";
    close_edit.appendChild(close_edit_icon);
    close_edit.className="right";
    save_edit.className="right";

    var input_edit=document.createElement("input");
    input_edit.type="text";
    input_edit.autofocus="autofocus";
    input_edit.placeholder="Write here";
    input_edit.value=labelSpan.innerText;

    var edit_part=document.createElement("div");
    edit_part.appendChild(input_edit);
    edit_part.insertBefore(close_edit,input_edit);
    edit_part.insertBefore(save_edit,input_edit);
    listItem.insertBefore(edit_part,listItem.childNodes[0]);
    
    
    
    listItem.classList.toggle("edit_mode");

    save_edit.addEventListener('click',function(){
        saving_edit(listItem,labelItem,edit_part);
        
    listItem.classList.toggle("edit_mode");
    });
    close_edit.addEventListener('click',function(){
        closing_edit(listItem,labelItem,edit_part);
        
    listItem.classList.toggle("edit_mode");
    });
}
// to regulate the normal events
function regulate_events(){


var deletion = to_do_list.querySelectorAll('button.delete_button');
var check_activity = to_do_list.querySelectorAll('input[type=checkbox]');
var editing = to_do_list.querySelectorAll('button.edit_button');
var nodes;
for (nodes of deletion) {
    nodes.addEventListener('click', deleting_activity);
}
for (nodes of check_activity) {
    nodes.addEventListener('click', complete_check);
}
for (nodes of editing) {
    nodes.addEventListener('click', editing_activity);
}
}
regulate_events();

function displayAll(){
    var checkboxes=to_do_list.querySelectorAll('input[type=checkbox]');
    for(x of checkboxes){
        
            var hide_todo=(x.parentNode).parentNode;
            hide_todo.classList.remove('hide');
        
    }
}


function incompleteTasks(){
    displayAll();
    var checkboxes=to_do_list.querySelectorAll('input[type=checkbox]');
    for(x of checkboxes){
        if( x.checked === true){
            var hide_todo=(x.parentNode).parentNode;
            hide_todo.classList.toggle('hide');
        }
    }
}

function completedTasks(){
    displayAll();
    var checkboxes=to_do_list.querySelectorAll('input[type=checkbox]');
    for(x of checkboxes){
        if( x.checked === false){
            var hide_todo=(x.parentNode).parentNode;
            hide_todo.classList.toggle('hide');
        }
        
    }
}


var clear=document.getElementById("clear");
var view_all=document.getElementById("all");
var uncheck=document.getElementById("unchecked");
var check=document.getElementById("checked");



clear.addEventListener('click',function(){
    to_do_list.innerHTML="";
})


unchecked.addEventListener('click',incompleteTasks);
checked.addEventListener('click',completedTasks);
view_all.addEventListener('click',displayAll);


var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
var date=new Date();
document.getElementById("day").innerHTML=days[date.getDay()];
var full_date;
full_date=[date.getDate(),months[date.getMonth()],date.getFullYear()];
for(x of full_date){
console.log(x);
}
fullDate=full_date.join('-');
console.log(fullDate);
document.getElementById("dates").innerHTML=fullDate;
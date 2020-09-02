//selectors
let todoinput=document.querySelector('.todo-input');
const todobutton=document.querySelector('.todo-button');
const todolist=document.querySelector('.todo-list');
const filtertodo=document.querySelector('.todo-filter')


//eventlistners
document.addEventListener('DOMContentLoaded',getTodos);
todobutton.addEventListener('click',addTodo);
todolist.addEventListener('click',bubbling);
filtertodo.addEventListener('click',filtertodos);



//function
function addTodo(event){
  event.preventDefault();

  //todo div
  const todo= document.createElement('div');
  todo.classList.add('todo');

  //todo list
  const newtodo =document.createElement('li');
  let see=afteredit();
  console.log('seeing',see);
  let todos=JSON.parse(localStorage.getItem("todos"));
  let index=todos.indexOf(todoinput.value);
  console.log('adding',index);
  if(index>=0){
    console.log('oooooooooo');
    todos.splice(index,1);
    localStorage.setItem('todos',JSON.stringify(todos));
    location.reload();
  }
  newtodo.innerText=todoinput.value;
  
  newtodo.classList.add('todo-item');
  todo.appendChild(newtodo);
//adding to local storge
  savelocalstorage(todoinput.value);
  //checked button
  const completedbutton=document.createElement('button');
  completedbutton.innerHTML='<li class="fas fa-check"> </li>';
  completedbutton.classList.add('completed-btn');
  todo.appendChild(completedbutton);

   //trash button
   const trashbutton=document.createElement('button');
   trashbutton.innerHTML='<li class="fas fa-trash"> </li>';
   trashbutton.classList.add('trash-btn');
   todo.appendChild(trashbutton);

   //edit button
   const editbutton=document.createElement('button');
   editbutton.innerHTML='<li class="fas fa-edit"></li>';
   editbutton.classList.add('edit-btn');
   todo.appendChild(editbutton);
   //adding to todolist
   todolist.appendChild(todo);

   //todoinput clear
   todoinput.value="";
}

function bubbling(e){
  console.log(e.target);
   const item=e.target;
   if(item.classList[0]=='trash-btn'){
     deletecheck(e);
   }
   else if(item.classList[0]=='edit-btn'){
    edittodo(e);
   }
}
function edittodo(e){
  console.log('edit button>>',e.target.parentElement);
  let editto=e.target.parentElement.firstElementChild.innerText;
  afteredit(editto);
  todoinput.value=editto;
  // let todos=JSON.parse(localStorage.getItem("todos"));
  // console.log('editingggg',todos[0]);
  
  // let index=todos.indexOf(todoinput.value);
 

}

function afteredit(value){
  let newvalue;
  if(value=='undefined'){

  }
  else{
   newvalue=value;
   console.log(newvalue);}
   return newvalue;
}


function deletecheck(e){
   //console.log(e.target.classList);
   const item=e.target;

   if(item.classList[0]=='trash-btn'){
     const todo=item.parentElement;
     todo.classList.add('fall');
     //remove from locastorage
     removeTodos(todo);
     todo.addEventListener('transitionend',function(){
      todo.remove();
     })
     
   }


   if(item.classList[0]=='completed-btn'){
    const todo=item.parentElement;
    todo.classList.toggle('completed');
  }
   
}

function filtertodos(e){
    const todos=todolist.childNodes;
    todos.forEach(function(todo){
      switch(e.target.value){
        case "all":
          todo.style.display= "flex";
          break;
        case "completed":
          if(todo.classList.contains("completed")){
            todo.style.display= "flex";
          }
          else{
            todo.style.display= "none";
          }
         break;
          case "uncompleted":
            if(!todo.classList.contains("completed")){
              todo.style.display= "flex";
            }
            else{
              todo.style.display= "none";
            }
          break;
      }
    })
}


function savelocalstorage(todo){
let todos;
if(localStorage.getItem("todos")==null){
  todos=[];
}
else{
  todos=JSON.parse(localStorage.getItem("todos"));
}
todos.push(todo);
localStorage.setItem('todos',JSON.stringify(todos));
}


function getTodos(){
 
let todos;
if(localStorage.getItem("todos")==null){
  todos=[];
}
else{
  todos=JSON.parse(localStorage.getItem("todos"));
}
todos.forEach(function(todoing){
   //todo div
   const todo= document.createElement('div');
   todo.classList.add('todo');
 
   //todo list
   const newtodo =document.createElement('li');
   newtodo.innerText=todoing;
   
   newtodo.classList.add('todo-item');
   todo.appendChild(newtodo);

   //checked button
   const completedbutton=document.createElement('button');
   completedbutton.innerHTML='<li class="fas fa-check"> </li>';
   completedbutton.classList.add('completed-btn');
   todo.appendChild(completedbutton);
 
    //trash button
    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<li class="fas fa-trash"> </li>';
    trashbutton.classList.add('trash-btn');
    todo.appendChild(trashbutton);

     //edit button
   const editbutton=document.createElement('button');
   editbutton.innerHTML='<li class="fas fa-edit"></li>';
   editbutton.classList.add('edit-btn');
   todo.appendChild(editbutton);
 
    //adding to todolist
    todolist.appendChild(todo);
})
}

function removeTodos(todo){
  let todos;
if(localStorage.getItem("todos")==null){
  todos=[];
}
else{
  todos=JSON.parse(localStorage.getItem("todos"));
}
const removetodo=todos.indexOf(todo.children[0].innerText);
todos.splice(removetodo,1);
localStorage.setItem('todos',JSON.stringify(todos));
}
//Define UI vals
const form = document.querySelector('form');
const textInput = document.getElementById('task');
const ul = document.querySelector('ul.list-group');
const clearTask = document.getElementById('remove-all-tasks');
const filter = document.getElementById('filter');

//call Load all Event Listener function
loadAllEventListener();


//Load add Event Listener function
function loadAllEventListener(){
	//DOMContentLoaded Event
	document.addEventListener('DOMContentLoaded',loadTaskFromLocalStorage);
	//Add Task Event
	form.addEventListener('submit',addTask);
	//Remove Task Event
	ul.addEventListener('click',removeTask);
	//Clear All Tasks Event
	clearTask.addEventListener('click',clearAllTask);
	//Filter Task Event
	filter.addEventListener('keyup',filterTask);
}

//add task
function addTask(e){
	if(textInput.value === ''){
		alert('There is no task.');
	}else{
		//create li element
		const li = document.createElement('li');
		li.className = 'list-group-item d-flex justify-content-between text-success';
		//create text node and append to li element
		li.appendChild(document.createTextNode(textInput.value));
		//create link
		const link = document.createElement('a');
		link.className = 'delete-item example-classList';
		//insert icon to link element
		link.innerHTML = '<i class="fas fa-times text-danger"></i>';
		//append link to li element
		li.appendChild(link);
		//append li element to ul element
		ul.appendChild(li);
		//store to localStorage
		storeTaskToLocalStorage(textInput.value);
		//clear textfield
		textInput.value = '';
	}
	e.preventDefault();
}

//remove task
function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are you Sure?')){
			e.target.parentElement.parentElement.remove();

			//remove task form local storate
			removeTaskFromLocalStorate(e.target.parentElement.parentElement);
		}
	}
}

//clear all task
function clearAllTask(){
	while(ul.firstChild){
		ul.removeChild(ul.firstChild);
	}

	//clear all tasks form local storage
	clearAllTaskFromLocalStorage();
}

//filter tasks
function filterTask(e){
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.list-group-item').forEach(function(task){
		const item = task.firstChild.textContent.toLowerCase();
		if(item.indexOf(text) != -1){
			task.style.display = 'block';
			task.className = 'list-group-item d-flex justify-content-between text-success';
		}
		else{
			task.style.display = 'none';
			task.classList.remove('d-flex');
		}
	});
}

//Store Task to Local Storage
function storeTaskToLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks') == null){
		tasks = [];		
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Load Task from Local Storate
function loadTaskFromLocalStorage(){
	let tasks;
	if(localStorage.getItem('tasks') == null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task){
		//create li element
		const li = document.createElement('li');
		//add class from li element
		li.className = 'list-group-item d-flex justify-content-between text-success';
		//create text node and append to li 
		li.appendChild(document.createTextNode(task));
		//create link element
		const link = document.createElement('a');
		//add class from a element
		link.className = 'delete-item example-classList';
		//add inon html to link element
		link.innerHTML = '<i class="fas fa-times text-danger"></i>';
		//append link to li element
		li.appendChild(link);
		//append li to ul element
		ul.appendChild(li);
	});
}

//Remove Task from Local Storate
function removeTaskFromLocalStorate(listItem){
	let tasks;
	if(localStorage.getItem('tasks') == null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task,index){
		if(task === listItem.textContent){
			tasks.splice(index,1);
		}		
	});

	localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear All Tag From Local Storage
function clearAllTaskFromLocalStorage(){
	localStorage.clear();
}

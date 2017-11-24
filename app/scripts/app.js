import svg4everybody from 'svg4everybody';
import $ from 'jquery';
$(() => {
	svg4everybody();
});




// var Todo = function() {
// 	this.input = getItem('#todo')
// 	this.button = getItem('#submit')
// 	this.todo = getItem('#list-todo')
// 	function getItem (element) {
// 		return document.querySelector(element)
// 	}
//
// 	this.init = function () {
// 		this.addTodo()
// 		this.removeTodo()
// 		this.checkTodo()
// 	}
// }
//
// Todo.prototype.addTodo = function () {
// 	var self = this.todo
// 	this.input.addEventListener('change',function (event) {
// 		event.preventDefault()
// 		let task = document.createElement('li')
// 		let icon = document.createElement('span')
// 		icon.innerHTML = 'Удалить'
// 		let text = document.createElement('a')
// 		text.innerHTML = this.value
// 		task.appendChild(text)
// 		task.appendChild(icon)
// 		self.appendChild(task)
// 	})
// }
//
// Todo.prototype.removeTodo = function () {
// 	this.todo.addEventListener('click',function (event) {
// 		if(event.target.tagName == 'SPAN' ) {
// 			this.removeChild(event.target.parentNode)
// 		}
// 	})
//
// }
//
// Todo.prototype.checkTodo = function () {
// 	this.todo.addEventListener('click',function (event) {
// 		event.target.classList.toggle('check')
// 	})
// }
//
//
//
// var todo = new Todo()
// todo.init()

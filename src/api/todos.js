import uuid from 'uuid/v4';
import moment from 'moment';
import {AsyncStorage} from "react-native";

const todoKey = 'todos';
const todoBaseUrl = 'http://172.20.117.173:3000/api';

const devUserID = "f560fb8c-8b33-41ea-b701-fe304f9a5305";

export function listTodos(unaccomplishedOnly = false, searchText = '', start) {
/*	return AsyncStorage.getItem(todoKey).then(todosString => {
		let todos = JSON.parse(todosString);

		if (unaccomplishedOnly) {
			todos = todos.filter(t => {
				return !t.doneTs;
			});
		}
		if (searchText) {
			todos = todos.filter(t => {
				return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
			});
		}
		if (start) {
			todos = todos.slice(start, start + 10);
		}

		return todos;
	});*/
	let url = `${todoBaseUrl}/${todoKey}/${devUserID}`;
	let arg = [];
	if (searchText) arg.push(`searchText=${searchText}`);
	if (unaccomplishedOnly) arg.push("unaccomplishedOnly=1");
	if (start) arg.push(`start=${start}`);
	if (arg.length) url += ("?" + arg.join("&"));

	console.log(`Making GET request to: ${url}`);

	return fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
		if (res.status !== 200)
			throw new Error(`Unexpected response code: ${res.status}`);

		return res.json();
	});
}

export function createTodo(title, deadline) {
/*	return listTodos().then(todos => {
		const newTodo = {
			id: todos.length,
			title: title,
			deadline: deadline.unix(),
			starID: uuid(),
			ts: moment().unix(),
			doneTs: null
		};
		todos.push(newTodo);
		AsyncStorage.setItem(todoKey, JSON.stringify(todos));

		return newTodo;
	});*/
	let url = `${todoBaseUrl}/${todoKey}/${devUserID}`;

    console.log(`Making POST request to: ${url}`);

    return fetch(url, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title,
			content: "1",
			deadline: deadline.unix(),
			importance: 1
		})
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}

export function editTodo(id, title, deadline) {
/*	return listTodos().then(todos => {
		let rtn;

		let newTodos = todos.map(t => {
			if (t.id === id) {
				let tmp = JSON.parse(JSON.stringify(t));
				tmp.title = title;
				tmp.deadline = deadline.unix();
				rtn = tmp;
				return tmp;
			} else return t;
		});

		AsyncStorage.setItem(todoKey, JSON.stringify(newTodos));

		return rtn;
	});*/
	let url = `${todoBaseUrl}/${todoKey}/${devUserID}/${id}`;

    console.log(`Making PUT request to: ${url}`);

	return fetch(url, {
		method: "PUT",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title,
			content: "1",
			deadline: deadline.unix(),
			importance: 1
		})
	}).then(res => {
		if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
	});
}

export function toggleTodoAccomplish(id, accomplish) {
/*	return listTodos().then(todos => {
		let rtn;

		for(let t of todos) {
			if(t.id === id) {
				if (t.doneTs) {
					t.doneTs = null;
				} else {
					t.doneTs = moment().unix();
				}
				rtn = t;
				break;
			}
		}
		AsyncStorage.setItem(todoKey, JSON.stringify(todos));

		return rtn;
	});*/
	let url = `${todoBaseUrl}/${todoKey}/${devUserID}/${id}?accomplish=${accomplish ? "1" : "0"}`;

    console.log(`Making PUT request to: ${url}`);

    return fetch(url, {
		method: "PUT",
		headers: {
			'Accept': 'application/json'
		}
	}).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}

export function deleteTodo(id) {
/*	return listTodos().then(todos => {
		let rtn;

		todos = todos.filter(function(t) {
			if (t.id === id) {
				rtn = t;
				return false;
			} else return true;
		});
		AsyncStorage.setItem(todoKey, JSON.stringify(todos));

		return rtn;
	});*/
	let url = `${todoBaseUrl}/${todoKey}/${devUserID}/${id}`;

	console.log(`Making DELETE request to: ${url}`);

	return fetch(url, {
		method: "DELETE",
		headers: {
			'Accept': 'application/json'
		}
	}).then(res => {
		if (res.status !== 200)
			throw new Error(`Unexpected response code: ${res.status}`);

		return res.json();
	});
}

import uuid from 'uuid/v4';
import moment from 'moment';
import {AsyncStorage} from "react-native";

const todoKey = 'todos';
const todoBaseUrl = 'http://weathermood-10.ap-northeast-1.elasticbeanstalk.com/api';

AsyncStorage.getItem(todoKey).catch(() => {
	AsyncStorage.setItem(todoKey, JSON.stringify([]));
});

export function listTodos(unaccomplishedOnly = false, searchText = '', start) {
	return AsyncStorage.getItem(todoKey).then(todosString => {
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
	});
/*	let url = `${todoBaseUrl}/${todoKey}`;
	if (searchText)
		url += `?searchText=${searchText}`;
	if (unaccomplishedOnly) {
		if (searchText) url += "&";
		else url += "?";
		url += "unaccomplishedOnly=1";
	}

	console.log(`Making GET request to: ${url}`);

	return axios.get(url).then(function(res) {
		if (res.status !== 200)
			throw new Error(`Unexpected response code: ${res.status}`);

		return res.data;
	});*/
}

export function createTodo(title, deadline) {
	return listTodos().then(todos => {
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
	});
/*	let url = `${todoBaseUrl}/${todoKey}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        mood,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });*/
}

export function toggleTodoAccomplish(id) {
	return listTodos().then(todos => {
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
	});
/*	let url = `${todoBaseUrl}/${todoKey}/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });*/
}

export function deleteTodo(id) {
	return listTodos().then(todos => {
		let rtn;

		todos = todos.filter(function(t) {
			if (t.id === id) {
				rtn = t;
				return false;
			} else return true;
		});
		AsyncStorage.setItem(todoKey, JSON.stringify(todos));

		return rtn;
	});
}

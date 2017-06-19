import uuid from 'uuid/v4';
import moment from 'moment';

const todoKey = 'todos';
const todoBaseUrl = 'http://weathermood-10.ap-northeast-1.elasticbeanstalk.com/api';

export function listTodos(unaccomplishedOnly = false, searchText = '') {
	if (AsyncStorage.getItem(todoKey) == null) AsyncStorage.setItem(todoKey, JSON.stringify([]));
	return new Promise((resolve, reject) => {
		let todos = JSON.parse(AsyncStorage.getItem(todoKey));

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
		resolve(todos);
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

export function createTodo(title, content, importance, date, isFullDay, time) {
	return listTodos().then(todos => {
		const deadline = isFullDay ? (moment(date).add(1, 'd')) : (moment(date).add(time.getHours(), 'h').add(time.getMinutes(), 'm'));
		const newTodo = {
			id: uuid(),
			title: title,
			content: content,
			deadline: deadline.unix(),
			importance: importance,
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

export function accomplishTodo(id) {
	return listTodos().then(todos => {
		let rtn;

		for(let t of todos) {
			if(t.id === id) {
				t.doneTs = moment().unix();
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

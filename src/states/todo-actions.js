import {
	listTodos as listTodosFromApi,
	createTodo as createTodoFromApi,
	toggleTodoAccomplish as toggleTodoAccomplishFromApi,
	deleteTodo as deleteTodoFromApi,
	editTodo as editTodoFromApi
} from "../api/todos.js";

/*  Todo item */

export function toggleTooltip(id) {
    return {
        type: '@TODO_ITEM/TOGGLE_TOOLTIP',
        id
    };
};

/* Todo List */

function startListTodos(unaccomplishedOnly) {
	return {
		type: "@TODO_LIST/START_LIST_TODOS"
	};
}

function endListTodos(todos) {
	return {
		type: "@TODO_LIST/END_LIST_TODOS",
		todos
	};
}

function startListMoreTodos(unaccomplishedOnly, start) {
	return {
		type: "@TODO_LIST/START_LIST_MORE_TODOS",
		start
	};
}

function endListMoreTodos(todos) {
	return {
		type: "@TODO_LIST/END_LIST_MORE_TODOS",
		todos
	};
}

export function toggleUnaccomplishedOnly() {
	return {
		type: "@TODO_LIST/TOGGLE_UNACCOMPLISHED_ONLY"
	};
}

function startCreateTodo() {
	return {
		type: "@TODO_LIST/START_CREATE_TODO"
	};
}

function endCreateTodo(todo) {
	return {
		type: "@TODO_LIST/END_CREATE_TODO",
		todo
	};
}

function startToggleTodoAccomplish(id) {
	return {
		type: "@TODO_LIST/START_TOGGLE_TODO_ACCOMPLISH",
		id
	};
}

function endToggleTodoAccomplish(id) {
	return {
		type: "@TODO_LIST/END_TOGGLE_TODO_ACCOMPLISH",
		id
	};
}

function startDeleteTodo(id) {
	return {
		type: "@TODO_LIST/START_DELETE_TODO",
		id
	};
}

function endDeleteTodo(id) {
	return {
		type: "@TODO_LIST/END_DELETE_TODO",
		id
	};
}

function startEditTodo(id) {
	return {
		type: "@TODO_LIST/START_EDIT_TODO",
		id
	};
}

function endEditTodo(todo) {
	return {
		type: "@TODO_LIST/END_EDIT_TODO",
		todo
	};
}

export function listTodos(searchText) {
    return (dispatch, getState) => {
        dispatch(startListTodos());
        return listTodosFromApi(getState().unaccomplishedOnly, searchText).then(todos => {
            dispatch(endListTodos(todos));
        }).catch(err => {
            dispatch(endListTodos());
            console.error('Error listing todos', err);
        });
    };
};

export function listMoreTodos(searchText, start) {
    return (dispatch, getState) => {
        dispatch(startListMoreTodos(start));
        return listTodosFromApi(getState().unaccomplishedOnly, searchText, start).then(todos => {
            dispatch(endListMoreTodos(todos));
        }).catch(err => {
            dispatch(endListMoreTodos());
            console.error('Error listing more todos', err);
        });
    };
};

export function createTodo(title, deadline) {
    return (dispatch, getState) => {
        dispatch(startCreateTodo());

        return createTodoFromApi(title, deadline).then(todo => {
            dispatch(endCreateTodo(todo));
        }).catch(err => {
            dispatch(endCreateTodo());
            console.error('Error creating todo', err);
        });
    };
};

export function toggleTodoAccomplish(id) {
	return (dispatch, getState) => {
		dispatch(startToggleTodoAccomplish(id));

		return toggleTodoAccomplishFromApi(id).then(todo => {
			dispatch(endToggleTodoAccomplish(todo.id));
		}).catch(err => {
			dispatch(endToggleTodoAccomplish());
			console.log("Error toggling todo accomplish", id, err);
		});
	};
}

export function deleteTodo(id) {
	return (dispatch, getState) => {
		dispatch(startDeleteTodo(id));

		return deleteTodoFromApi(id).then(todo => {
			dispatch(endDeleteTodo(todo.id));
		}).catch(err => {
			dispatch(endDeleteTodo());
			console.log("Error deleting todo", id, err);
		});
	}
}

export function editTodo(id, title, deadline) {
	return (dispatch, getState) => {
		dispatch(startEditTodo(id));

		return editTodoFromApi(id, title, deadline).then(todo => {
			dispatch(endEditTodo(todo));
		}).catch(err => {
			dispatch(endEditTodo());
			console.log("Error editing todo", id, err);
		});
	};
}

/*  Todo Form */

export function setTitleValue(titleValue) {
    return {
        type: '@TODO_FORM/SET_TITLE_VALUE',
        titleValue
	};/*Object*/
};

export function setTitleDanger(titleDanger) {
    return {
        type: '@TODO_FORM/SET_TITLE_DANGER',
        titleDanger
    };
};

export function setDeadlineDanger(deadlineDanger) {
	return {
		type: "@TODO_FORM/SET_DEADLINE_DANGER",
		deadlineDanger
	};
}

export function setDeadline(deadline) {
	return {
		type: "@TODO_FORM/SET_DEADLINE",
		deadline
	};
}

export function setFullDay(fullDay) {
	return {
		type: "@TODO_FORM/SET_FULL_DAY",
		fullDay
	};
}

export function clearTodoForm() {
	return {
		type: "@TODO_FORM/CLEAR_TODO_FORM"
	};
}

export function setDeadlinePickerVisible(selectingDeadline) {
	return {
		type: "@TODO_FORM/SET_DEADLINE_PICKER_VISIBLE",
		selectingDeadline
	};
}

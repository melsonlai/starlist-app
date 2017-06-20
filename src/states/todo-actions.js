import {
	listTodos as listTodosFromApi,
	createTodo as createTodoFromApi
} from "../api/todos.js";

/*  Todo item */

export function toggleTooltip(id) {
    return {
        type: '@TODO_ITEM/TOGGLE_TOOLTIP',
        id
    };
};

export function setTooltipToggle(id, toggle) {
    return {
        type: '@TODO_ITEM/SET_TOOLTIP_TOGGLE',
        id,
        toggle
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

export function createTodo(title, data, isFullDay, time) {
    return (dispatch, getState) => {
        dispatch(startCreateTodo());

        return createTodoFromApi(title, data, isFullDay, time).then(todo => {
            dispatch(endCreateTodo(todo));
        }).catch(err => {
            dispatch(endCreateTodo())
            console.error('Error creating todo', err);
        });
    };
};

/*  Todo Form */

export function setTitleValue(titleValue) {
    return {
        type: '@TODO_FORM/SET_TITLE_VALUE',
        titleValue
    };
};

export function setTitleDanger(titleDanger) {
    return {
        type: '@TODO_FORM/SET_TITLE_DANGER',
        titleDanger
    };
};

export function setDueDate(dueDate) {
	return {
		type: "@TODO_FORM/SET_DUE_DATE",
		dueDate
	};
}

export function clearTodoForm() {
	return {
		type: "@TODO_FORM/CLEAR_TODO_FORM"
	};
}

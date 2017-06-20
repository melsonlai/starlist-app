import {listTodos as listTodosFromApi} from "../api/todos.js";

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

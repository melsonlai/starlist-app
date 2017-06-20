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

function startListTodos() {
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

export function listTodos(unaccomplishedOnly, searchText) {
    return (dispatch, getState) => {
        dispatch(startListTodos());
        return listTodosFromApi(unaccomplishedOnly, searchText).then(todos => {
            dispatch(endListTodos(todos));
        }).catch(err => {
            dispatch(endListTodos());
            console.error('Error listing todos', err);
        });
    };
};

export function listMorePosts(searchText, start) {
    return (dispatch, getState) => {
        dispatch(startListMorePosts(start));
        return listPostsFromApi(searchText, start).then(posts => {
            dispatch(endListMorePosts(posts));
        }).catch(err => {
            dispatch(endListMorePosts());
            console.error('Error listing more posts', err);
        });
    };
};

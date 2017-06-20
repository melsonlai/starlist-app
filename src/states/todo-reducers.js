/* Todo item */

const initTodoItemState = {
    tooltipOpen: {}
};

export function todoItem(state = initTodoItemState, action) {
    switch (action.type) {
        case '@TODO_ITEM/TOGGLE_TOOLTIP':
            return {
                tooltipOpen: {
                    // ...state.tooltipOpen,
                    [action.id]: state.tooltipOpen[action.id] ? false : true
                }
            };
        case '@TODO_ITEM/SET_TOOLTIP_TOGGLE':
            return {
                tooltipOpen: {
                    // ...state.tooltipOpen,
                    [action.id]: action.toggle
                }
            };
        default:
            return state;
    }
}

/* Todo List */

const initTodoListState = {
    listingTodos: false,
    listingMoreTodos: undefined, // id of todo from which to start
    todos: [],
    hasMore: true,
	unaccomplishedOnly: false
};
export function todoList(state = initTodoListState, action) {
    switch (action.type) {
        case "@TODO_LIST/START_LIST_TODOS":
            return {
                ...state,
                listingTodos: true,
                listingMoreTodos: undefined
            };
        case "@TODO_LIST/END_LIST_TODOS":
            if (!action.todos)
                return {
                    ...state,
                    listingTodos: false
                };
            return {
                ...state,
                listingTodos: false,
                todos: action.todos,
                hasMore: action.todos.length > 0
            };
        case "@TODO_LIST/START_LIST_MORE_TODOS":
            return {
                ...state,
                listingMoreTodos: action.start
            };
        case "@TODO_LIST/END_LIST_MORE_TODOS":
            if (!action.todos)
                return state;
            return {
                ...state,
                todos: [...state.todos, ...action.todos],
                hasMore: action.todos.length > 0
            };
		case "@TODO_LIST/TOGGLE_UNACCOMPLISHED_ONLY":
			return {
				...state,
				unaccomplishedOnly: !state.unaccomplishedOnly
			}
        default:
            return state;
    }
}

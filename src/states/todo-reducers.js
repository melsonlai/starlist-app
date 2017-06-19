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

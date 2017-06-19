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

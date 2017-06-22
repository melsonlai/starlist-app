import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import TodoItem from './TodoItem';

import {connect} from 'react-redux';
import {listTodos, listMoreTodos, toggleTodoAccomplish, deleteTodo} from '../states/todo-actions';

class TodoList extends React.Component {
    static propTypes = {
        searchText: PropTypes.string.isRequired,
        listingTodos: PropTypes.bool.isRequired,
        listingMoreTodos: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        todos: PropTypes.array.isRequired,
        hasMoreTodos: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        scrollProps: PropTypes.object,
		unaccomplishedOnly: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
		this.handleToggleTodoAccomplish = this.handleToggleTodoAccomplish.bind(this);
		this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listTodos(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {
        const {searchText, dispatch, todos} = this.props;
        if (searchText !== nextProps.searchText) {
            dispatch(listTodos(nextProps.searchText));
        }
        if (todos !== nextProps.todos) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.todos)
            });
        }
    }

    render() {
        const {listingTodos, hasMoreTodos, todos, scrollProps, navigate} = this.props;
        return (
            <ListView
                refreshControl={
                    <RefreshControl refreshing={listingTodos} onRefresh={this.handleRefresh} />
                }
                distanceToLoadMore={300}
                renderScrollComponent={props => <InfiniteScrollView {...props} />}
                dataSource={this.state.dataSource}
                renderRow={(t) => {
                    return <TodoItem {...t}
						toggleTodoAccomplish={this.handleToggleTodoAccomplish}
						deleteTodo={this.handleDeleteTodo}
						navigate={navigate}
					/>;
                }}
                canLoadMore={() => {
                    if (listingTodos || !todos.length)
                        return false;
                    return hasMoreTodos;
                }}
                onLoadMoreAsync={this.handleLoadMore}
                style={{backgroundColor: '#fff'}}
                ref={(el) => this.listEl = el}
                {...scrollProps}
            />
        );
    }

    handleRefresh() {
        const {dispatch, searchText} = this.props;
        dispatch(listTodos(searchText));
    }

    handleLoadMore() {
        const {listingMoreTodos, dispatch, todos, searchText} = this.props;
        const start = todos[todos.length - 1].deadline;
        if (listingMoreTodos !== start)
            dispatch(listMoreTodos(searchText, start));
    }

	handleToggleTodoAccomplish(id) {
		this.props.dispatch(toggleTodoAccomplish(id));
	}

	handleDeleteTodo(id) {
		this.props.dispatch(deleteTodo(id));
	}
}

export default connect((state, ownProps) => ({
    searchText: state.search.searchText,
    listingTodos: state.todoList.listingTodos,
    listingMoreTodos: state.todoList.listingMoreTodos,
    todos: state.todoList.todos,
    hasMoreTodos: state.todoList.hasMore,
	unaccomplishedOnly: state.todoList.unaccomplishedOnly
}))(TodoList);

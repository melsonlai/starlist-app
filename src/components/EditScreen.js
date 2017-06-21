import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';

import {Container, Header, Content, Title, Icon, Button, Switch, Left, Body, Right, Text} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {TextField} from 'react-native-material-textfield';

import {connect} from 'react-redux';
import {createTodo, setTitleValue, setTitleDanger, setDeadline, setDeadlineDanger, setFullDay, clearTodoForm, setDeadlinePickerVisible} from '../states/todo-actions';
import {setToast} from '../states/toast';

import moment from "moment";
import appColors from '../styles/colors';

class EditScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        titleValue: PropTypes.string.isRequired,
        titleDanger: PropTypes.bool.isRequired,
		deadline: PropTypes.instanceOf(Date),
		fullDay: PropTypes.bool.isRequired,
		deadlineDanger: PropTypes.bool.isRequired,
		selectingDeadline: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCreatTodo = this.handleCreatTodo.bind(this);
		this.handleConfirmDeadline = this.handleConfirmDeadline.bind(this);
		this.handleCancelSelectingDeadline = this.handleCancelSelectingDeadline.bind(this);
		this.showDeadlinePicker = this.showDeadlinePicker.bind(this);
		this.handleFullDaySwitch = this.handleFullDaySwitch.bind(this);
    }

	componentWillMount() {
		this.props.dispatch(clearTodoForm());
	}

	componentDidMount() {
		const {params} = this.props.navigation.state;
		const {dispatch, todos} = this.props;
		if (params && params.id !== undefined) {
			let todo;
			for (let t of todos) {
				if (t.id === params.id) {
					todo = t;
					break;
				}
			}

			dispatch(setTitleValue(todo.title));

			if (moment.unix(todo.deadline).unix() === moment.unix(todo.deadline).endOf("day").unix()) {
				const deadline = moment.unix(todo.deadline).startOf("day");
				dispatch(setDeadline(deadline.toDate()));
				dispatch(setFullDay(true));
			} else {
				const deadline = moment.unix(todo.deadline);
				dispatch(setDeadline(deadline.toDate()));
				dispatch(setFullDay(false));
			}
		}
	}

    render() {
        const {titleValue, titleDanger, deadline, deadlineDanger, fullDay, selectingDeadline} = this.props;
        return (
            <Container>
                <Header>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='arrow-left' style={{fontSize: 24}} />
                    </Button></Left>
                    <Body><Title>Edit Todo</Title></Body>
                    <Right><Button transparent onPress={this.handleCreatTodo}>
                        <Icon name='check' style={{fontSize: 24}} />
                    </Button></Right>
                </Header>
                <Content style={styles.content}>
					<View style={styles.item}>
						<TextField
							label="What's Next To Do?"
							value={titleValue}
							onChange={this.handleTitleChange}
							autoFocus
							maxLength={1024}
							
						/>
					</View>
					<Grid style={styles.grid}>
						<Col>
							<View>
								<TouchableOpacity onPress={this.showDeadlinePicker}>
									<Text style={deadlineDanger ? {color: "red"} : {}}>{deadline.getTime() ? deadline.toLocaleString() : "Select Due Time"}</Text>
								</TouchableOpacity>
								<DateTimePicker
									isVisible={selectingDeadline}
									onConfirm={this.handleConfirmDeadline}
									onCancel={this.handleCancelSelectingDeadline}
									mode={fullDay ? "date" : "datetime"}
								/>
							</View>
						</Col>
						<Col style={styles.fullDayButton}>
							<Text style={deadlineDanger ? {color: "red"} : {}}>Full Day</Text>
							<Switch
								value={fullDay}
								onValueChange={this.handleFullDaySwitch}
							/>
						</Col>
					</Grid>
                </Content>
            </Container>
        );
    }

    handleGoBack() {
		this.props.navigation.goBack();
    }

    handleTitleChange(e) {
        const {titleDanger, dispatch} = this.props;
        const titleValue = e.nativeEvent.text;
        if (titleDanger)
            dispatch(setTitleDanger(false));
        dispatch(setTitleValue(titleValue));
    }

	handleConfirmDeadline(deadline) {
		const {dispatch} = this.props;
		dispatch(setDeadline(deadline));
		dispatch(setDeadlinePickerVisible(false));
		dispatch(setDeadlineDanger(false));
	}

	handleCancelSelectingDeadline() {
		this.props.dispatch(setDeadlinePickerVisible(false));
	}

	showDeadlinePicker() {
		this.props.dispatch(setDeadlinePickerVisible(true));
	}

	handleFullDaySwitch(ticked) {
		const {dispatch, deadline} = this.props;
		dispatch(setFullDay(ticked));
		dispatch(setDeadlineDanger(false));
		if (ticked) dispatch(setDeadline(moment(deadline).endOf("day").toDate()));
	}

    handleCreatTodo() {
        const {titleValue, deadline, fullDay, dispatch} = this.props;
		const finalDeadline = fullDay ? (moment(deadline).endOf("day")) : (moment(deadline));
        const {goBack} = this.props.navigation;

		if (!titleValue) {
			dispatch(setTitleDanger(true));
		} else if (finalDeadline.unix() < moment().unix()) {
			dispatch(setDeadlineDanger(true));
		} else {
			dispatch(createTodo(titleValue, finalDeadline));
			goBack();
		}
    }
}

const styles = {
    content: {
        backgroundColor: appColors.primaryLight
    },
    item: {
        marginLeft: 16,
        marginRight: 16
    },
	grid: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 16,
		marginLeft: 16,
		marginRight: 16
	},
	fullDayButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}
};

export default connect(state => ({
    ...state.todoForm,
	todos: state.todoList.todos
}))(EditScreen);

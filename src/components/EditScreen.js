import React from 'react';
import PropTypes from 'prop-types';
import {View, DatePickerAndroid, TimePickerAndroid} from 'react-native';

import {connect} from 'react-redux';
import {createTodo, setTitleValue, setTitleDanger, setDueDate, setDueTime, setFullDay, clearTodoForm} from '../states/todo-actions';
import {setToast} from '../states/toast';

import {Container, Header, Content, Title, Icon, Button, Item, Label, Input, Form, Switch, Left, Body, Right, Text} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import appColors from '../styles/colors';

class EditScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        titleValue: PropTypes.string.isRequired,
        titleDanger: PropTypes.bool.isRequired,
		dueDate: PropTypes.instanceOf(Date),
		fullDay: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCreatTodo = this.handleCreatTodo.bind(this);
		this.handleDatePicking = this.handleDatePicking.bind(this);
		this.handleTimePicking = this.handleTimePicking.bind(this);
		this.handleFullDaySwitch = this.handleFullDaySwitch.bind(this);
    }

    render() {
        const {titleValue, titleDanger, dueDate, dueTime, fullDay} = this.props;
        return (
            <Container>
                <Header>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='arrow-left'  style={{fontSize: 24}} />
                    </Button></Left>
                    <Body><Title>Edit Todo</Title></Body>
                    <Right><Button transparent onPress={this.handleCreatTodo}>
                        <Icon name='check' style={{fontSize: 24}} />
                    </Button></Right>
                </Header>
                <Content style={styles.content}>
                        <Form>
							<Item floatingLabel error={titleDanger} style={styles.item}>
								<Label>What's Next To Do?</Label>
		                        <Input autoFocus maxLength={1024} value={titleValue} onChange={this.handleTitleChange} />
		                    </Item>
						</Form>
						<Grid>
							<Col>
								<Form>
		                            <Item floatingLabel style={styles.item}>
		                                <Label>Due Date</Label>
		                                <Input value={dueDate.toDateString()} onFocus={this.handleDatePicking} />
		                            </Item>
								</Form>
							</Col>
							<Col style={styles.fullDayButton}>
								<Text>Full Day</Text>
								<Switch value={fullDay} onValueChange={this.handleFullDaySwitch} />
							</Col>
						</Grid>
						{fullDay ||
						<Form>
							<Item floatingLabel style={styles.item}>
								<Label>Due Time</Label>
								<Input value={`${dueTime.hour < 10 ? "0" : ""}${dueTime.hour}:${dueTime.minute < 10 ? "0" : ""}${dueTime.minute}`} onFocus={this.handleTimePicking} />
							</Item>
                        </Form>
						}
                </Content>
            </Container>
        );
    }

    handleGoBack() {
		this.props.navigation.goBack();
		this.props.dispatch(clearTodoForm());
    }

    handleTitleChange(e) {
        const {titleDanger, dispatch} = this.props;
        const titleValue = e.nativeEvent.text;
        if (titleDanger)
            dispatch(setTitleDanger(false));
        dispatch(setTitleValue(titleValue));
    }

	async handleDatePicking() {
		try {
			const {action, year, month, day} = await DatePickerAndroid.open({
				// Use `new Date()` for current date.
				// May 25 2020. Month 0 is January.
				date: new Date(),
				minDate: new Date()
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				// Selected year, month (0-11), day
				this.props.dispatch(setDueDate(new Date(year, month, day)));
			}
		} catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		}
	}

	async handleTimePicking() {
		try {
			const {dueTime} = this.props;
			const {action, hour, minute} = await TimePickerAndroid.open({
				hour: dueTime.hour,
				minute: dueTime.minute,
				is24Hour: false // Will display '2 PM'
			});
			if (action !== TimePickerAndroid.dismissedAction) {
				// Selected hour (0-23), minute (0-59)
				this.props.dispatch(setDueTime({hour, minute}));
			}
		} catch ({code, message}) {
			console.warn('Cannot open time picker', message);
		}
	}

	handleFullDaySwitch(ticked) {
		this.props.dispatch(setFullDay(ticked));
	}

    handleCreatTodo() {// FIX
        const {mood, inputValue, dispatch} = this.props;
        const {goBack} = this.props.navigation;
        if (inputValue) {
            dispatch(createPost(mood, inputValue)).then(() => {
                dispatch(setToast('Posted.'));
            });
            goBack();
        } else {
            dispatch(inputDanger(true));
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
    input: {
        height: 100
    },
	fullDayButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}
};

export default connect(state => ({
    ...state.todoForm
}))(EditScreen);

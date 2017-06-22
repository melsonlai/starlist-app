import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, TouchableWithoutFeedback} from 'react-native';

import {connect} from 'react-redux';
import {setToast} from '../states/toast';
import {toggleTooltip} from "../states/todo-actions";

import moment from 'moment';
import {Card, CardItem, CheckBox, ActionSheet, Container, Content} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import Icon from 'react-native-vector-icons/MaterialIcons';

var BUTTONS = [
  'Edit To Do',
  'Delete Anyway',
  'Mark As Accomplishd',
  'Cancel'
];

var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 3;

class TodoItem extends React.Component {
    static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		deadline: PropTypes.string.isRequired,
		starID: PropTypes.number.isRequired,
		ts: PropTypes.string.isRequired,
		doneTs: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object
		]),
        tooltipOpen: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
		toggleTodoAccomplish: PropTypes.func.isRequired,
		deleteTodo: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
		this.handleAccomplish = this.handleAccomplish.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        const {title, deadline, starID, ts, doneTs, tooltipOpen} = this.props;

        return (
            <Container>
                <Content>
			        <Card>

                        <CardItem button onPress={this.handleAccomplish}>
                            <CheckBox checked={!!doneTs} />
                        </CardItem>
                        <CardItem button onPress={()=> ActionSheet.show(
                            {
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                title: 'What do you want to do with this To Do??'
                            },
                            (buttonIndex) => {
                                if (buttonIndex == 0)
                                    this.handleEdit();
                                else if (buttonIndex == 1)
                                    this.handleDelete();
                                else if (buttonIndex == 2)
                                    this.handleAccomplish();
                            },
                            )} style={StyleSheet.flatten(styles.cardItem)}>
                            <View style={styles.todo}>
                                <View style={styles.wrap}>
                                    <Text style={styles.ts}>{moment(deadline * 1000).calendar()}</Text>
                                    <Text style={styles.text}>{title}</Text>
                                </View>
                            </View>
                        </CardItem>

				{/*<CardItem button onPress={this.handleAccomplish}>
					<CheckBox checked={!!doneTs} />
				</CardItem>
	            <CardItem button onPress={this.handleTooltipToggle} style={StyleSheet.flatten(styles.cardItem)}>
	                <View style={styles.todo}>
	                    <View style={styles.wrap}>
	                        <Text style={styles.ts}>{moment(deadline * 1000).calendar()}</Text>
	                        <Text style={styles.text}>{title}</Text>
	                    </View>
	                </View>
	            </CardItem>
				{tooltipOpen &&
					<TouchableWithoutFeedback onPress={this.handleTooltipToggle}>
						<View style={styles.tooltip}>
							<Icon name="edit" onPress={this.handleEdit} style={styles.tooltipIcon} />
							<Icon name="delete" onPress={this.handleDelete} style={styles.tooltipIcon} />
						</View>
					</TouchableWithoutFeedback>
                }*/}
			        </Card>
                </Content>
         </Container>
        );
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

	handleAccomplish() {
		this.props.toggleTodoAccomplish(this.props.id);
	}

	handleEdit() {
		this.props.navigate("Edit", {id: this.props.id});
		this.props.dispatch(toggleTooltip(this.props.id));
	}

	handleDelete() {
		this.props.deleteTodo(this.props.id);
		this.props.dispatch(toggleTooltip(this.props.id));
	}
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    cardItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 0
    },
    todo: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    wrap: {
        flex: 1
    },
    ts: {
        color: appColors.textLight
    },
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4
    },
    tooltip: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.mask
    },
    tooltipIcon: {
        fontSize: 24,
        color: appColors.primaryText,
        marginHorizontal: 12
    }
});

export default connect((state, ownProps) => ({
    tooltipOpen: state.todoItem.tooltipOpen[ownProps.id] ? true : false
}))(TodoItem);

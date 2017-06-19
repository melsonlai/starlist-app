import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';

import {connect} from 'react-redux';
import {setToast} from '../states/toast';
import {toggleTooltip} from "../states/todo-actions";

import moment from 'moment';
import {CardItem, CheckBox} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {toggleAccomplishTodo, deleteTodo} from "../api/todos";

class TodoItem extends React.Component {
    static propTypes = {
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		deadline: PropTypes.number.isRequired,
		importance: PropTypes.number.isRequired,
		starID: PropTypes.number.isRequired,
		ts: PropTypes.number.isRequired,
        tooltipOpen: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
    }

    render() {
        const {title, content, deadline, importance, starID, ts, doneTs, tooltipOpen} = this.props;

        return (
			<View>
				<CardItem onPress={this.handleAccomplish}>
					<CheckBox checked={!!doneTs} />
				</CardItem>
				<CardItem header onPress={this.handleTooltipToggle}>
					<Text>{title}</Text>
				</CardItem>
	            <CardItem onPress={this.handleTooltipToggle} style={StyleSheet.flatten(styles.cardItem)}>
	                <View style={styles.todo}>
	                    <View style={styles.wrap}>
	                        <Text style={styles.ts}>{moment(deadline * 1000).calendar()}</Text>
	                        <Text style={styles.text}>{content}</Text>
	                    </View>
	                </View>
	                {tooltipOpen &&
	                    <View style={styles.tooltip} onPress={this.handleTooltipToggle}>
							<Icon name="edit" onPress={this.handleEdit} />
							<Icon name="delete" onPress={this.handleDelete} />
	                    </View>
	                }
	            </CardItem>
			</View>
        );
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

	handleAccomplish() {
		toggleAccomplishTodo(this.props.id);
	}

	handleEdit() {
		this.props.navigate("EditScreen", {id: this.props.id});
	}

	handleDelete() {
		deleteTodo(this.props.id);
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
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false
}))(PostItem);

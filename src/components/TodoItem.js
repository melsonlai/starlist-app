import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';

import {connect} from 'react-redux';
import {setToast} from '../states/toast';
import {toggleTooltip} from "../states/todo-actions.js";

import moment from 'moment';
import {ListItem, Icon} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

class TodoItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
		ts: PropTypes.number.isRequired,
        tooltipOpen: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
    }

    render() {
        const {id, text, ts, tooltipOpen} = this.props;

        return (
            <ListItem onPress={this.handleTooltipToggle} style={StyleSheet.flatten(styles.listItem)}>
                <View style={styles.todo}>
                    <View style={styles.wrap}>
                        <Text style={styles.ts}>{moment(ts * 1000).calendar()}</Text>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
                {tooltipOpen &&
                    <View style={styles.tooltip} onPress={this.handleTooltipToggle}>
                    </View>
                }
            </ListItem>
        );
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

	handleDone() {
		const {id} = this.props;
	}
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    listItem: {
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

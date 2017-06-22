import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback} from 'react-native';

import {Container, Icon, Button, Toast} from 'native-base';
import ActionButton from "react-native-action-button";

import appMetrics from '../styles/metrics';
import ParallaxNavigationContainer from './ParallaxNavigationContainer';
import TodoList from "./TodoList";
import WeatherDisplay from './WeatherDisplay';

import {connect} from 'react-redux';
import {setToast} from '../states/toast';

class TodayScreen extends React.Component {
    static propTypes = {
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

		this.handleCreateTodo = this.handleCreateTodo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration
            })
            this.props.dispatch(setToast(''));
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ParallaxNavigationContainer
                navigate={navigate}
                title='Astrology'
                titleLeft={80}
                titleTop={40}
                renderHeaderContent={props => <WeatherDisplay {...props} />}
                renderScroller={props => <TodoList scrollProps={props} navigate={navigate}/>}>
				<ActionButton buttonColor='#03A9F4'>
					<ActionButton.Item buttonColor='#03A9F4' title="New Todo" onPress={this.handleCreateTodo}>
						<Icon name='pencil' style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>
            </ParallaxNavigationContainer>
        );
    }

	handleCreateTodo() {
		this.props.navigation.navigate("Edit");
	}
}

const styles = {
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	}
};

export default connect((state, ownProps) => ({
    toast: state.toast
}))(TodayScreen);

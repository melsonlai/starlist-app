import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image} from 'react-native';

import {Container, Icon, Fab, Button, Toast} from 'native-base';
import ActionButton from "react-native-action-button";

import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import ParallaxNavigationContainer from './ParallaxNavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';
import TodoList from "./TodoList";
import WeatherDisplay from './WeatherDisplay';

import {connect} from 'react-redux';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';

class TodayScreen extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool.isRequired,
        creatingVote: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            fabActive: false
        };

        this.handleFabClose = this.handleFabClose.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
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

    handleFabClose() {
        this.setState({fabActive: !this.state.fabActive});
    }

	handleCreateTodo() {
		this.props.navigation.navigate("Edit");
	}

    handleCreatePost(mood) {
        this.handleFabClose();
        this.props.dispatch(selectMood(mood));
        this.props.navigation.navigate('PostForm');
    }
}

const styles = {
    fabMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: appColors.mask
    },
    fabContainer: {
        marginLeft: 10
    },
    fab: {
        backgroundColor: appColors.primary
    },
    mood: {
        backgroundColor: appColors.primaryLightBorder
    },
    moodIcon: {
        color: appColors.primaryLightText
    },
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	}
};

export default connect((state, ownProps) => ({
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast
}))(TodayScreen);

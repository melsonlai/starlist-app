import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Content, Icon} from 'native-base';
import NavigationContainer from './NavigationContainer';
import ActionButton from 'react-native-action-button';

import {connect} from 'react-redux';

class ForecastScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        searchText: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Horoscope'>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center'}}>Searchtext: {searchText}</Text>
                    <ActionButton buttonColor='#03A9F4'>
                        <ActionButton.Item buttonColor='#03A9F4' title="New" onPress={() => console.log("notes tapped!")}>
                            <Icon name='pencil'/>
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            </NavigationContainer>
        );
    }
}

export default connect(state => ({
    searchText: state.search.searchText,
}))(ForecastScreen);

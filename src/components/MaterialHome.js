import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Content, Icon} from 'native-base';
import NavigationContainer from './NavigationContainer';

import {connect} from 'react-redux';

import ActionButton from 'react-native-action-button';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

class MaterialHome extends React.Component {
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
            <NavigationContainer navigate={navigate} title='Home'>
                {/*<View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center'}}>Searchtext: {searchText}</Text>
                </View>*/}
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center'}}>Searchtext: {searchText}</Text>
                {/* Rest of the app comes ABOVE the action button component !*/}
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
}))(MaterialHome);
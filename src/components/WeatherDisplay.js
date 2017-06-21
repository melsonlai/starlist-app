import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image} from 'react-native';

import moment from 'moment';
import {connect} from 'react-redux';

class WeatherDisplay extends React.Component {
    // TODO
    render() {
        return (
            <View style={styles.display}>
                {/*<Image source={require('../images/w-na.png')}  style={styles.image} />*/}
                <Text style={styles.text_Week}> {moment().format('dddd')} </Text>
                <Text style={styles.text_Date}> {moment().format('YYYY MMMM D')} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    display: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    image: {
        width: 262.5,
        height: 180,
        left: 92
    },
    text_Week: {
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent',
        top: 50,
        left: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 24
    },
    text_Date: {
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent',
        top: 100,
        right: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 24
    }
});

export default connect((state, ownProps) => ({
    // TODO
}))(WeatherDisplay);

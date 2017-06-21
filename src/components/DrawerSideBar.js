import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform} from 'react-native'

import {Container, Content, Thumbnail, Icon, Badge, Button, Text as NbText} from 'native-base';
import appColors from '../styles/colors';

export default class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    render() {
      const {navigate} = this.props;
      return (
        <Container style={styles.drawer}>
            <Image source={require('../images/moon_bg.jpg')} style={styles.header}>
                <Text style={styles.text_Account}>Starlist</Text>
            </Image>
            <Button block transparent style={styles.item} onPress={() => navigate('Astrology')}>
                <Icon name='image-filter-tilt-shift' style={styles.icon} />
                <Text style={styles.text}>Astrology</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Horoscope')}>
                <Icon name='google-circles-extended' style={styles.icon} />
                <Text style={styles.text}>Horoscope</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Settings')}>
                <Icon name='settings' style={styles.icon}
                    onPress={() => {}} // TODO
                />
                <Text style={styles.text}>Settings</Text>
            </Button>
        </Container>
    );
    }
}

const styles = {
    drawer: {
        flex: 1,
        backgroundColor: appColors.primaryLight
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom: 16
    },
    item: {
        alignItems: 'center'
    },
    icon: {
        color: appColors.primaryLightText
    },
    text: {
        color: appColors.primaryLightText,
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12
    },
    text_Account: {
        color: '#FFFFFF',
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'KaushanScript'
    }
};

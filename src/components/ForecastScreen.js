import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ListView, ScrollView, PanResponder, Animated, Dimensions} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Content, Icon} from 'native-base';
import NavigationContainer from './NavigationContainer';
import ActionButton from 'react-native-action-button';

import {connect} from 'react-redux';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
class ForecastScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        searchText: PropTypes.string.isRequired
    };
    
    state = {
        x: '',
        y: '',
        width: '',
        height: '',
        tempx: 50,
        tempy: 50,
        viewHeight: 100,
        pan     : new Animated.ValueXY()
    };
    constructor(props) {
        super(props);
        
        this.panResponder = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder : () => true,
            onPanResponderMove           : Animated.event([null,{ //Step 3
                dx : this.state.pan.x,
                dy : this.state.pan.y
            }]),
            onPanResponderRelease        : (e, gesture) => {} //Step 4
        });
    }
    measureView(event) {
        this.setState({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
        })
    }
    /*render() {
        const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Horoscope'>
                <ScrollView>
                <View style={{flex: 1, backgroundColor: 'black'}} onLayout={(event) => this.measureView(event)}>
                    <Svg height='100' width='100'>
                        <Defs>
                            <RadialGradient id="grad" cx={this.state.tempx} cy={this.state.tempy} fx={this.state.tempx} fy={this.state.tempy} gradientUnits="userSpaceOnUse">
                                <Stop
                                    offset="0"
                                    stopColor="pink"
                                    stopOpacity="1"
                                />
                                <Stop
                                    offset="1"
                                    stopColor="black"
                                    stopOpacity="1"
                                />
                            </RadialGradient>
                        </Defs>
                        <Circle r="5" fill="url(#grad)"/>
                    </Svg>
                </View>
                </ScrollView>
            </NavigationContainer>
        );
    }*/
    render(){
        return (
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <View style={{height: 100, backgroundColor:'#2c3e50'}}>
                    <Text>Drop me here!</Text>
                </View>

                {this.renderDraggable()}
            </View>
        );
    }
    renderDraggable(){
        return (
            <View>
                <Animated.View {...this.panResponder.panHandlers} style={this.state.pan.getLayout()}>
                    <Svg height='100' width='100'>
                        <Defs>
                            <RadialGradient id="grad" cx={this.state.tempx} cy={this.state.tempy} fx={this.state.tempx} fy={this.state.tempy} gradientUnits="userSpaceOnUse">
                                <Stop
                                    offset="0"
                                    stopColor="pink"
                                    stopOpacity="1"
                                />
                                <Stop
                                    offset="1"
                                    stopColor="black"
                                    stopOpacity="1"
                                />
                            </RadialGradient>
                        </Defs>
                        <Circle cx={this.state.tempx} cy={this.state.tempy} r="50" fill="url(#grad)"/>
                    </Svg>
                </Animated.View>
            </View>
        );
    }
}

export default connect(state => ({
    searchText: state.search.searchText,
}))(ForecastScreen);

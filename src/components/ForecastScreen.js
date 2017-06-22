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
    };
    
    state = {
        x: '',
        y: '',
        width: '',
        height: '',
        tempx: 0,
        tempy: 0,
        stopx: 50,
        stopy: 50,
        scale: 1,
        initDis: 1,
        nowDis: 1,
        viewHeight: 100,
        pan     : new Animated.ValueXY(),
        introText: '天狼'
    };
    constructor(props) {
        super(props);
        
        this.panResponder = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder : () => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.d{x,y} will be set to zero now
                if(gestureState.numberActiveTouches===2){
                    this.setState({
                        initDis: Math.sqrt(Math.pow(evt.nativeEvent.touches[0].pageX - evt.nativeEvent.touches[1].pageX, 2)+Math.pow(evt.nativeEvent.touches[0].pageY - evt.nativeEvent.touches[1].pageY, 2)),
                        nowDis: Math.sqrt(Math.pow(evt.nativeEvent.touches[0].pageX - evt.nativeEvent.touches[1].pageX, 2)+Math.pow(evt.nativeEvent.touches[0].pageY - evt.nativeEvent.touches[1].pageY, 2))
                    });
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                if(gestureState.numberActiveTouches===2){
                    this.setState({
                        nowDis: Math.sqrt(Math.pow(evt.nativeEvent.touches[0].pageX - evt.nativeEvent.touches[1].pageX, 2)+Math.pow(evt.nativeEvent.touches[0].pageY - evt.nativeEvent.touches[1].pageY, 2))
                    });
                }
                this.setState({
                    tempx: gestureState.dx/(this.state.scale*this.state.nowDis/this.state.initDis),
                    tempy: gestureState.dy/(this.state.scale*this.state.nowDis/this.state.initDis)
                });
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                this.setState(prevState=>({
                    stopx: prevState.stopx+prevState.tempx,
                    stopy: prevState.stopy+prevState.tempy,
                    tempx: 0,
                    tempy: 0,
                    scale: prevState.scale*prevState.nowDis/prevState.initDis,
                    nowDis: 1,
                    initDis: 1
                }));
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }
    
    clickStarHandler(){
        this.setState({
            introText: "Hello"
        });
    }
    
    render(){
        return (
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <View style={{height: 100, backgroundColor:'#2c3e50'}}>
                    <Text>{"X: "+this.state.stopx+this.state.tempx}</Text>
                    <Text>{"Y: "+this.state.stopy+this.state.tempy}</Text>
                    <Text>{this.state.initDis}</Text>
                    <Text>{this.state.nowDis}</Text>
                    <Text>{this.state.scale*this.state.nowDis/this.state.initDis}</Text>
                </View>

                {this.renderDraggable()}
            </View>
        );
    }
    renderDraggable(){
        return (
            <View {...this.panResponder.panHandlers}>
                <Svg height='500' width='500'>
                    <Defs>
                        <RadialGradient id="grad" cx={this.state.stopx+this.state.tempx} cy={this.state.stopy+this.state.tempy} r="50" fx={this.state.stopx+this.state.tempx} fy={this.state.stopy+this.state.tempy} gradientUnits="userSpaceOnUse">
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
                    <Circle
                        cx={this.state.stopx+this.state.tempx}
                        cy={this.state.stopy+this.state.tempy} r="50"
                        fill="url(#grad)"
                        onPress={() => alert('Press on Circle')}
                        scale={Math.sqrt(this.state.scale*this.state.nowDis/this.state.initDis)}/>
                </Svg>
            </View>
        );
    }
}

export default connect(state => ({
    searchText: state.search.searchText,
}))(ForecastScreen);

import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';

import {connect} from 'react-redux';
import {createPost, input, inputDanger} from '../states/post-actions';
import {setToast} from '../states/toast';

import {Container, Header, Content, Title, Icon, Button, Item, Label, Card, CardItem, Input, Form, Switch, List, ListItem, Left, Body, Right, Picker} from 'native-base';
import appColors from '../styles/colors';
import {getMoodIcon} from '../utilities/weather';

class EditScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        mood: PropTypes.string.isRequired,
        inputValue: PropTypes.string.isRequired,
        inputDanger: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreatPost = this.handleCreatPost.bind(this);
    }

    render() {
        const {mood, inputValue, inputDanger} = this.props;
        return (
            <Container>
                <Header>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='arrow-left'  style={{fontSize: 24}} />
                    </Button></Left>
                    <Body><Title>Edit TO-DO</Title></Body>
                    <Right><Button transparent onPress={this.handleCreatPost}>
                        <Icon name='check'  style={{fontSize: 24}} />
                    </Button></Right>
                </Header>
                <Content /*style={styles.content}*/>
                        <Form>
                            <Item floatingLabel>
                                <Label>What's Next To Do??</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Description</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Due Time</Label>
                                <Input />
                            </Item>
                        </Form>

                        <Switch value={false} />
                </Content>
            </Container>
        );
    }

    handleGoBack() {
         this.props.navigation.goBack();
    }

    handleInputChange(e) {
        const {inputDanger: danger, dispatch} = this.props;
        const inputValue = e.nativeEvent.text;
        if (danger)
            dispatch(inputDanger(false));
        dispatch(input(inputValue));
    }

    handleCreatPost() {
        const {mood, inputValue, dispatch} = this.props;
        const {goBack} = this.props.navigation;
        if (inputValue) {
            dispatch(createPost(mood, inputValue)).then(() => {
                dispatch(setToast('Posted.'));
            });
            goBack();
        } else {
            dispatch(inputDanger(true));
        }
    }
}

const styles = {
    content: {
        backgroundColor: appColors.primaryLight
    },
    mood: {
        color: appColors.primaryLightText,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32,
    },
    item: {
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        backgroundColor: '#fff'
    },
    input: {
        height: 100
    }
};

export default connect(state => ({
    ...state.postForm
}))(EditScreen);
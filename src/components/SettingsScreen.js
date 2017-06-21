import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';

import {Container, Header, Content, Title, Icon, Button, Switch, Left, Body, Right, Text, List, ListItem} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {TextField} from 'react-native-material-textfield';

import {connect} from 'react-redux';
import {createTodo, setTitleValue, setTitleDanger, setDeadline, setDeadlineDanger, setFullDay, clearTodoForm, setDeadlinePickerVisible} from '../states/todo-actions';
import {setToast} from '../states/toast';
import appColors from '../styles/colors';

class SettingsScreen extends React.Component {


    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

	componentDidMount() {
		const {params} = this.props.navigation.state;
	}

    render() {
        return (
            <Container>
                <Header>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='arrow-left' style={{fontSize: 24}} />
                    </Button></Left>
                    <Body><Title>Settings</Title></Body>
                    <Right></Right>
                </Header>
                <Content style={styles.content}>
                    <List>
                        <ListItem itemDivider>
                            <Text>General</Text>
                        </ListItem>                    
                        <ListItem >
                            <Button transparent>
                                <Text>Active Lists</Text>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button transparent>
                                <Text>App Badge</Text>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button transparent>
                                <Text>Sort Order</Text>
                            </Button>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>About</Text>
                        </ListItem>  
                        <ListItem>
                            <Button transparent>
                                <Text>Startlist</Text>
                            </Button>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }

    handleGoBack() {
		this.props.navigation.goBack();
    }
}

const styles = {
    content: {
        backgroundColor: appColors.primaryLight
    },
    item: {
        marginLeft: 16,
        marginRight: 16
    }
};

export default connect(state => ({
    ...state.todoForm,
	todos: state.todoList.todos
}))(SettingsScreen);

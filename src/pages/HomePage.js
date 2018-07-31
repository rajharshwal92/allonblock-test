import React, { Component } from 'react';
import { Platform, StyleSheet, View, Modal } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import AddNewProcedure from './AddNewProcedure';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Procedures',
  };
  constructor(props) {
    super(props);
    this.state = {
      newProcedureModal: false,
      procedureList: []
    };
  }
  openModal() {
    this.setState({ newProcedureModal: true });
  }
  addNewProcedureSubmit(data) {
    const { newProcedureModal, procedureList } = this.state;
    if(data) {
    let list = procedureList;
    list.push(data);
    this.setState({ newProcedureModal: false, procedureList: list });
    } else {
      this.setState({ newProcedureModal: false });
    }
  }
  goTo(item) {
    const { navigate } = this.props.navigation;
    navigate('Details',item);
  }
  render() {
    const { navigate } = this.props.navigation;
    const { procedureList, newProcedureModal } = this.state;
    return (
      <Container>
        <Content >
          <List>
            {procedureList.map((item, key) => (<ListItem key={key} onPress={()=>this.goTo(item)}>
              <Text>{item.procedureName}</Text>
            </ListItem>))}
          </List>
          {!procedureList.length && <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to All on block</Text>
            <Text style={styles.instructions}>No Procedures have been added yet</Text>
          </View>}
        </Content>
        <Button style={styles.floatButton} onPress={() => this.openModal()
        }>
          <Text style={styles.floatButtonIcon}>+</Text>
        </Button>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.newProcedureModal}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <AddNewProcedure onSubmit={(data) => this.addNewProcedureSubmit(data)} />
        </Modal>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 500
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  floatButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    bottom: 30,
    right: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20
  },
  floatButtonIcon: {
    fontSize: 35,
    color: '#fff'
  }
});

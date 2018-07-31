import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import Moment from 'moment';

export default class Details extends Component {
  static navigationOptions = {
    title: 'Procedure details',
  };
  render() {
    const { navigation } = this.props;
    const procedureName = navigation.getParam('procedureName', '');
    const selectedDoc = navigation.getParam('selectedDoc', '');
    const chosenDate = navigation.getParam('chosenDate', '');
    const scannedArray = navigation.getParam('scannedArray', []);
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <View style={styles.contentView}>
              <Text style={styles.label}>Name:</Text>
              <Text>{procedureName}</Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.label}>Date: </Text>
              <Text>{Moment(chosenDate).format('YYYY-MM-DD HH:mm')}</Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.label}>Doctor: </Text>
              <Text>{selectedDoc}</Text>
            </View>
            <View >
              <Text style={styles.label}>QR Code: </Text>
              <List>
                {scannedArray.map((code, key) => (<ListItem key={key} >
                  <Text>{code}</Text>
                </ListItem>))}
              </List>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 15
  },
  contentView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
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
});

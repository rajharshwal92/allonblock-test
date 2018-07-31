import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, Picker, DatePicker, Right, Body, Icon, Title, List, ListItem } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from "react-native-modal";

export default class NewProcedure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoc: "doc2",
      chosenDate: null,
      procedureName: '',
      errorText: '',
      showScanner: false,
      scanText: '',
      scannedArray: []
    };
    this.setDate = this.setDate.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(value) {
    this.setState({
      selectedDoc: value
    });
  }
  onTextUpdate(text) {
    this.setState({
      procedureName: text
    });
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  submit() {
    const { selectedDoc, chosenDate, procedureName, scannedArray } = this.state;
    const {onSubmit} = this.props;
    if (!procedureName) {
      this.setState({ errorText: 'Please fill procedure name' });
    }
    if (!chosenDate) {
      this.setState({ errorText: 'Please choose a date' });
    }
    if (!selectedDoc) {
      this.setState({ errorText: 'Please select a doctor' });
    }
    if(!scannedArray.length) {
      this.setState({ errorText: 'Please scan atleast one QR code' });
    }
    if (procedureName && chosenDate && selectedDoc && scannedArray.length) {
      this.setState({ errorText: '' });
      let procedureItem = {
        procedureName: procedureName,
        selectedDoc: selectedDoc,
        chosenDate: chosenDate,
        scannedArray: scannedArray
      }
      onSubmit(procedureItem);
      //this.props.navigation.navigate('Home', procedureItem);
    }
  }
  closeModal() {
    const {onSubmit} = this.props;
    onSubmit();
  }
  onSuccess(e) {
    console.log(e);
    const {scannedArray} = this.state;
    let itemList = scannedArray;
    itemList.push(e.data);
    this.setState({ showScanner: false, scanText: e.data, scannedArray: itemList })
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
  }
  scanQRCode() {
    this.setState({
      showScanner: true
    })
  }
  closeModalScaner() {
    this.setState({
      showScanner: false
    })
  }
  render() {
    const { selectedDoc, procedureName, errorText, showScanner, scanText, scannedArray } = this.state;
    return (
      <Container>
        <Header style={styles.headerStyle}>
          <Body>
            <Title style={styles.colorBlack}>Add new procedure</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={()=>this.closeModal()}>
              <Text style={styles.colorBlack}>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item keyboardShouldPersistTaps="always">
              <Input placeholder="Procedure Name" onChangeText={text => this.onTextUpdate(text)}
                value={procedureName} />
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={selectedDoc}
                onValueChange={this.onValueChange}
              >
                <Picker.Item label="Doctor 1" value="doc1" />
                <Picker.Item label="Doctor 2" value="doc2" />
                <Picker.Item label="Doctor 3" value="doc3" />
                <Picker.Item label="Doctor 4" value="doc4" />
                <Picker.Item label="Doctor 5" value="doc5" />
              </Picker>
            </Item>
            <Item keyboardShouldPersistTaps="always">
              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
              />
            </Item>
          </Form>
          <Button full info style={{ marginTop: 50 }} onPress={() => { this.scanQRCode() }}>
              <Text>Scan QR code</Text>
            </Button>
            <List>
            {scannedArray.map((code, key) => (<ListItem key={key} >
              <Text>{code}</Text>
            </ListItem>))}
          </List>
          <Text style={styles.errorStyle}>{errorText}</Text>
          <Button block success style={styles.submitBtn} onPress={() => this.submit()}>
            <Text>Submit</Text>
          </Button>
          <View>
            <Modal isVisible={showScanner}>
              <View style={styles.closeButton}>
                <Button onPress={() => { this.closeModalScaner() }} transparent large>
                  <Icon style={{ fontSize: 40, color: '#fff' }} name='close' />
                </Button>
              </View>
              <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
              />
            </Modal>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  submitBtn: {
    marginTop: 50
  },
  errorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    textAlign: 'center'
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 100
  },
  headerStyle: {
    backgroundColor: '#fff',
    shadowOffset:{  width: 50,  height: 50,  },
    shadowColor: 'black',
    shadowOpacity: 1.0
  },
  colorBlack: {
    color: 'black',
  }
});

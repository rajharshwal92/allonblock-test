/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomePage from './src/pages/HomePage';
import DetailsPage from './src/pages/DetailsPage';
import AddNewProcedure from './src/pages/AddNewProcedure';

import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: HomePage },
  Details: { screen: DetailsPage },
  NewProcedure: { screen: AddNewProcedure }
});

export default App;

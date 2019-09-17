import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Styles from './styles';
import { Ionicons } from '@expo/vector-icons';

export default class ActionButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.button}>
        <TouchableOpacity onPress={ this.props.onPress }>
          <Ionicons name={ this.props.iconName } size={ 24 } color="#444" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = Styles.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'white',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginTop: 5,
  }
});


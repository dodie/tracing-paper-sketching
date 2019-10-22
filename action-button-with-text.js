import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from './styles';
import { Ionicons } from '@expo/vector-icons';

export default class ActionButtonwithText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={ this.props.onPress }>
        <View style={ styles.button }>
          <View style={ styles.contents }>
            <Ionicons name={ this.props.iconName } size={ 24 } color="#444" />
            <Text style={ styles.text }>{ this.props.text }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = Styles.create({
  button: {
    height: 40,
    borderRadius: 2,
    backgroundColor: 'white',
    borderColor: 'black',
    elevation: 3,
    margin: 10,
  },
  contents: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  text: {
    fontWeight: 'bold',
    paddingLeft: 7,
  }
});


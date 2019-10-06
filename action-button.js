import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Styles from './styles';
import { Ionicons } from '@expo/vector-icons';

export default class ActionButton extends Component {
  constructor(props) {
    super(props);
  }

  renderButtonText() {
    const { text } = this.props;
    return <Text style={styles.buttonText}>{text}</Text>;
  }

  render() {
    const { onPress, iconName, textPosition, text } = this.props;
    return (
      <View style={styles.buttonContainer}>
        {text && textPosition === 'left' && this.renderButtonText()}
        <View style={styles.button}>
          <TouchableOpacity onPress={onPress}>
            <Ionicons name={iconName} size={24} color="#444" />
          </TouchableOpacity>
        </View>
        {text && textPosition === 'right' && this.renderButtonText()}
      </View>
    );
  }
}

ActionButton.defaultProps = {
  textPosition: 'left'
}

const styles = Styles.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: 'gray',
    fontSize: 22,
    marginHorizontal: 10,
    includeFontPadding: false,
  },
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


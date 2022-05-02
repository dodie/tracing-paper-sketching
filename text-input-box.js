import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
import ActionButtonWithText from './action-button-with-text';
import Styles from './styles';
import i18n from './i18n/i18n';

export default class TextInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  render() {
    return (
      <View>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.input}
          onChangeText={(text) => this.setState({ text })}
        />
        <Text style={styles.text}>
          Debug: 
          {this.state.text}
        </Text>
        <ActionButtonWithText onPress={() =>  this.props.onSubmitPress({text: this.state.text})} value={this.state.text} text={i18n.t("submit")}/>

      </View>
    );
  }
}

const styles = Styles.create({

  input: {
    height: 200,
    width: 300,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#FFF',
    color: 'white',
    padding: 10,
    fontSize: 20
  },
  text: {
    fontWeight: 'bold',
    paddingLeft: 7,
    color: 'white'
  }
});


import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import ActionButtonWithText from './action-button-with-text';
import Styles from './styles';
import i18n from './i18n/i18n';

export default class TextInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Hello!' };
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>{i18n.t("enter_text")}</Text>
          <TextInput
            value={this.state.text}
            multiline={true}
            numberOfLines={10}
            style={styles.input}
            onChangeText={(text) => this.setState({ text })}
          />
        </View>

        <ActionButtonWithText onPress={() => this.props.onSubmitPress({ text: this.state.text })} value={this.state.text} text={i18n.t("submit")} />
      </View>
    );
  }
}

const styles = Styles.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#FFF',
  },
  input: {
    height: 200,
    width: 300,
    textAlignVertical: 'top',
    color: 'white',
    padding: 10,
    fontSize: 20
  },
  text: {
    fontWeight: 'bold',
    paddingLeft: 7,
    color: 'white',
    fontSize: 20
  }
});


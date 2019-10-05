import React from 'react';
import { Button, Image, Text, View, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TrasformableImage from './transformable-image';
import FloatingToolbar from './floating-toolbar';
import ActionButton from './action-button';
import ActionButtonWithText from './action-button-with-text';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import i18n from './i18n/i18n';


export default class App extends React.Component {
  state = {
    image: null,
    width: null,
    height: null,
    locked: false,
    help: false,
  };

  render() {
    let { image, width, height, locked, help } = this.state;

    if (help) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 5 }}>{i18n.t('tracing_paper')}</Text>
            <Text style={{ color: 'white' }}>{i18n.t('tracing_paper_help')}</Text>

            <View style={{ margin: 5 }}></View>
            <ActionButtonWithText onPress={this._openLegal} iconName="md-book" text={i18n.t('privacy_policy')} />

            <View style={{ margin: 5 }}></View>
            <ActionButtonWithText onPress={this._openLicenses} iconName="md-heart" text={i18n.t('licenses_credits')} />
          </View>

          <FloatingToolbar top={true} left={true}>
            <ActionButton onPress={this._toMain} iconName="md-arrow-back" />
          </FloatingToolbar>
        </View>
      );
    }

    if (!image) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <ActionButtonWithText onPress={this._pickImage} iconName="md-photos" text={i18n.t('pick_a_image')} />
          <FloatingToolbar top={true}>
            <ActionButton onPress={this._toHelp} iconName="md-help" />
          </FloatingToolbar>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TrasformableImage image={image} width={width} height={height} locked={locked} />
          {!locked &&
            <FloatingToolbar top={true} left={true}>
              <ActionButton onPress={this._resetImage} iconName="md-arrow-back" />
            </FloatingToolbar>
          }
          <FloatingToolbar>
            {!locked && <ActionButton onPress={this._pickImage} iconName="md-photos" />}
            {!locked && <ActionButton onPress={this._lock} iconName="md-unlock" />}
            {locked && <ActionButton onPress={this._unlock} iconName="md-lock" />}
          </FloatingToolbar>
        </View>
      );
    }
  }

  _lock = () => {
    this.setState({ locked: true });
    activateKeepAwake();
  }

  _unlock = () => {
    this.setState({ locked: false });
    deactivateKeepAwake();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.setState({ image: result.uri, width: result.width, height: result.height });
    }
  }

  _resetImage = () => {
    this.setState({ image: null });
  }

  _toHelp = () => {
    this.setState({ help: true });
  }

  _toMain = () => {
    this.setState({ help: false });
  }

  _openLegal = () => {
    Linking.openURL("https://raw.githubusercontent.com/dodie/tracing-paper-sketching/master/legal.md");
  }

  _openLicenses = () => {
    Linking.openURL("https://raw.githubusercontent.com/dodie/tracing-paper-sketching/master/licenses.md");
  }
}


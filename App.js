import React from 'react';
import { Button, Image, Text, View, Linking, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TrasformableImage from './transformable-image';
import FloatingToolbar from './floating-toolbar';
import ActionButton from './action-button';
import ActionButtonWithText from './action-button-with-text';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';


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
            <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 5 }}>Tracing Paper</Text>
            <Text style={{ color: 'white' }}>Copy an image from the screen to a physical paper. Find an image as a template. Rotate, shrink or zoom to find the perfect alignment. Lock the screen, put a paper over the display and start tracing.</Text>

            <View style={{ margin: 5 }}></View>
            <ActionButtonWithText onPress={ this._openLegal } iconName="md-book" text="Privacy Policy" />

            <View style={{ margin: 5 }}></View>
            <ActionButtonWithText onPress={ this._openLicenses } iconName="md-heart" text="Licenses, Credits" />
          </View>

          <FloatingToolbar top={ true } left={ true }>
            <ActionButton onPress={ this._toMain } iconName="md-arrow-back" />
          </FloatingToolbar>
        </View>
      );
    }

    if (!image) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <ActionButtonWithText onPress={ this._pickImage } iconName="md-photos" text="PICK AN IMAGE" />
          <FloatingToolbar top={ true }>
            <ActionButton onPress={ this._toHelp } iconName="md-help" />
          </FloatingToolbar>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TrasformableImage image={ image } width={ width } height={ height } locked={ locked } />
          { !locked &&
          <FloatingToolbar top={ true } left={ true }>
            <ActionButton onPress={ this._resetImage } iconName="md-arrow-back" />
          </FloatingToolbar>
          }
          <FloatingToolbar>
            { !locked && <ActionButton onPress={ this._pickImage } iconName="md-photos" /> }
            { !locked && <ActionButton onPress={ this._lock } iconName="md-unlock" /> }
            { locked && <ActionButton onPress={ this._unlock } iconName="md-lock" /> }
          </FloatingToolbar>
        </View>
      );
    }
  }

  _lock = () => {
    this.setState({ locked: true }, () => {
      ToastAndroid.show('Screen locked', ToastAndroid.SHORT);
    });
    activateKeepAwake();
  }

  _unlock = () => {
    this.setState({ locked: false }, () => {
      ToastAndroid.show('Screen unlocked', ToastAndroid.SHORT);
    });
    deactivateKeepAwake();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.setState({ image: result.uri, width: result.width, height: result.height }, () => {
        ToastAndroid.show('Image loaded', ToastAndroid.SHORT);
      });
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


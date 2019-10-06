import React, { Fragment } from 'react';
import { Text, View, Linking, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TrasformableImage from './transformable-image';
import FloatingToolbar from './floating-toolbar';
import ActionButton from './action-button';
import ActionButtonWithText from './action-button-with-text';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { ToastAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';
import Camera from './Camera';


export default class App extends React.Component {
  state = {
    image: null,
    width: null,
    height: null,
    locked: false,
    help: false,
    camera: null,
    photoLoader: false,
  };

  constructor(props) {
    super(props);
    this.cameraRef = React.createRef();
  }

  render() {
    let { image, width, height, locked, help, camera, photoLoader } = this.state;

    if (help) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 5 }}>Tracing Paper</Text>
            <Text style={{ color: 'white' }}>Copy an image from the screen to a physical paper. Find an image as a template. Rotate, shrink or zoom to find the perfect alignment. Lock the screen, put a paper over the display and start tracing.</Text>

            <View style={{ margin: 5 }}></View>
            <ActionButtonWithText onPress={this._openLegal} iconName="md-book" text="Privacy Policy" />

            <View style={{ margin: 5 }}></View>
            <ActionButtonWithText onPress={this._openLicenses} iconName="md-heart" text="Licenses, Credits" />
          </View>

          <FloatingToolbar top={true} left={true}>
            <ActionButton onPress={this._toMain} text="back" textPosition="right" iconName="md-arrow-back" />
          </FloatingToolbar>
        </View>
      );
    }

    if (!image && !camera) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <ActionButtonWithText onPress={this._pickImage} iconName="md-photos" text="PICK AN IMAGE" />
          <ActionButtonWithText onPress={this._openCamera} iconName="md-camera" text="CAMERA" />
          <FloatingToolbar top={true}>
            <ActionButton onPress={this._toHelp} text="help" iconName="md-help" />
          </FloatingToolbar>
        </View>
      );
    } else if (!image && camera) {
      return (
        <Camera ref={this.cameraRef}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photoLoader && <ActivityIndicator size="large" color="#ffffff" />}

            <FloatingToolbar top={true} left={true}>
              <ActionButton onPress={this._closeCamera} text="back" textPosition="right" iconName="md-arrow-back" />
            </FloatingToolbar>

            <FloatingToolbar>
              <ActionButton onPress={this._snap} text="take photo" iconName="md-camera" />
            </FloatingToolbar>

          </View>
        </Camera>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TrasformableImage image={image} width={width} height={height} locked={locked} />
          {!locked &&
            <FloatingToolbar top={true} left={true}>
              <ActionButton onPress={this._resetImage} text="back" textPosition="right" iconName="md-arrow-back" />
            </FloatingToolbar>
          }
          <FloatingToolbar>
            {!locked && <ActionButton onPress={this._pickImage} text="open" iconName="md-photos" />}
            {!locked && <ActionButton onPress={this._lock} text="lock" iconName="md-unlock" />}
            {locked && <ActionButton onPress={this._unlock} text="unlock" iconName="md-lock" />}
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

  _openCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const camera = status === 'granted';
    this.setState({ camera }, () => {
      if (!this.state.camera) {
        ToastAndroid.show('No access to camera', ToastAndroid.SHORT);
      }
    });
  }

  _snap = async () => {
    if (this.cameraRef) {
      this.setState({ photoLoader: true }, async () => {
        const photo = await this.cameraRef.current.takePictureAsync();
        this.setState({ image: photo.uri, width: photo.width, height: photo.height, camera: false, photoLoader: false });
      });
    }
  };

  _closeCamera = () => {
    this.setState({ camera: false });
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
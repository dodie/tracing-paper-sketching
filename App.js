import React, { Fragment } from 'react';
import { Button, Image, Text, View, Linking, ActivityIndicator, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TrasformableImage from './transformable-image';
import FloatingToolbar from './floating-toolbar';
import ActionButton from './action-button';
import ActionButtonWithText from './action-button-with-text';
import TextInputBox from './text-input-box';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import i18n from './i18n/i18n';
import { PermissionsAndroid } from 'react-native';
import Camera from './Camera';
import * as Brightness from 'expo-brightness';
import { StatusBar } from 'expo-status-bar';
import Help from './help'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class App extends React.Component {
  state = {
    image: null,
    width: null,
    height: null,
    locked: false,
    help: false,
    camera: null,
    photoLoader: false,
    mirror: false,
    brightness: false,
    isNewUser: true,
    textAsImage: null
  };

  constructor(props) {
    super(props);
    this.cameraRef = React.createRef();
    this.init();
  }

  async init() {
    try {
      const isNewUser = await AsyncStorage.getItem('isNewUser');
      if (isNewUser !== null) {
        this.setState({ isNewUser: false });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let { image, width, height, locked, help, camera, photoLoader, mirror, brightness, isNewUser, textAsImage } = this.state;

    if (isNewUser) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            {i18n.t('onboarding_text')}
          </Text>
          <ActionButtonWithText onPress={this._readyToUse} text={i18n.t("start")}/>
        </View>
      );
    }

    if (help) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <Help />
          <FloatingToolbar top={true} left={true}>
            <ActionButton onPress={this._toMain} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" />
          </FloatingToolbar>
          <StatusBar style="hidden" />
        </View>
      );
    }

    if (!image && !camera && !textAsImage) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <ActionButtonWithText onPress={this._pickImage} iconName="md-briefcase" text={i18n.t('pick_a_image')} />
          <ActionButtonWithText onPress={this._openCamera} iconName="md-camera" text={i18n.t('camera')} />
          <FloatingToolbar top={true}>
            <ActionButton onPress={this._toHelp} text={i18n.t("button_help")} iconName="md-help" />
          </FloatingToolbar>
          <StatusBar style="hidden" />
        </View>
      );
    } else if (!image && camera && !textAsImage) {
      return (
        <Camera ref={this.cameraRef}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photoLoader && <ActivityIndicator size="large" color="#ffffff" />}

            <FloatingToolbar top={true} left={true}>
              <ActionButton onPress={this._closeCamera} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" />
            </FloatingToolbar>

            <FloatingToolbar>
              <ActionButton onPress={this._snap} text={i18n.t("button_takephoto")} iconName="md-camera" />
            </FloatingToolbar>
            <StatusBar style="hidden" />
          </View>
        </Camera>
      );
    } else if (image && !camera && !textAsImage) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TrasformableImage mirror={mirror} image={image} width={width} height={height} locked={locked} brightness={brightness}/>
          {!locked &&
            <FloatingToolbar top={true} left={true}>
              <ActionButton onPress={this._resetImage} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" />
            </FloatingToolbar>
          }
          <FloatingToolbar left={true}>
            {!locked && <ActionButton onPress={this._brightness} text={i18n.t("button_brightness")} textPosition="right" iconName="md-sunny" />}
            {!locked && <ActionButton onPress={this._mirror} text={i18n.t("button_mirror")} textPosition="right" iconName="md-repeat" />}
          </FloatingToolbar>
          <FloatingToolbar>
            {!locked && <ActionButton onPress={this._lock} text={i18n.t("button_lock")} iconName="md-lock-open" />}
            {locked && <ActionButton onPress={this._unlock} text={i18n.t("button_unlock")} iconName="md-lock-closed" />}
          </FloatingToolbar>
          <StatusBar style="hidden" />
        </View>
      );
    } else if (!image && !camera && textAsImage) {
      
    }
  }

  _brightness = async () => {
    if (!this.state.brightness) {
      await Brightness.setBrightnessAsync(1);
    } else {
      await Brightness.useSystemBrightnessAsync();
    }
    this.state.brightness ? this.setState({ brightness: false }) : this.setState({ brightness: true });
  }

  _mirror = () => {
    this.state.mirror ? this.setState({ mirror: false }) : this.setState({ mirror: true });
  }

  _lock = () => {
    this.setState({ locked: true }, () => {
      ToastAndroid.show(i18n.t('toast_screen_locked'), ToastAndroid.SHORT);
    });
    activateKeepAwake();
  }

  _unlock = () => {
    this.setState({ locked: false }, () => {
      ToastAndroid.show(i18n.t('toast_screen_unlocked'), ToastAndroid.SHORT);
    });
    deactivateKeepAwake();
  }

  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.setState({ image: result.uri, width: result.width, height: result.height }, () => {
        ToastAndroid.show(i18n.t('toast_image_loaded'), ToastAndroid.SHORT);
      });
    }
  }

  _openCamera = async () => {
    const camera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    this.setState({ camera }, () => {
      if (!this.state.camera) {
        ToastAndroid.show(i18n.t('toast_no_access_to_camera'), ToastAndroid.SHORT);
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
    this.setState({ image: null, brightness: false, mirror: false });
  }

  _toHelp = () => {
    this.setState({ help: true });
  }

  _toMain = () => {
    this.setState({ help: false });
  }

  _readyToUse = () => {
      this.setState({ isNewUser: false });
      AsyncStorage.setItem('isNewUser');
      this._toMain();
  }
}

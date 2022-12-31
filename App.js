import React from 'react';
import { Text, View, ActivityIndicator, ToastAndroid, Linking, BackHandler, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TrasformableImage from './transformable-image';
import FloatingToolbar from './floating-toolbar';
import ActionButton from './action-button';
import ActionButtonWithText from './action-button-with-text';
import TextInputBox from './text-input-box';
import FontDropDown from './font-drop-down'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import i18n from './i18n/i18n';
import Camera from './Camera';
import * as Brightness from 'expo-brightness';
import { StatusBar } from 'expo-status-bar';
import Help from './help'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera as CameraComp } from 'expo-camera';
import MainMenu from './src/menu/main-menu';

const NEW_USER_STORAGE_KEY = "isNewUser";

export default class App extends React.Component {
  state = {
    image: null,
    text: null,
    textFont: 'Roboto',
    width: null,
    height: null,
    locked: false,
    help: false,
    camera: null,
    photoLoader: false,
    mirror: false,
    invertBackground: false,
    brightness: false,
    isNewUser: true,
    textAsImage: null,
    rotationOffset: 0
  };

  constructor(props) {
    super(props);
    this.cameraRef = React.createRef();
    this.init();
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  async init() {
    try {
      const isNewUser = await AsyncStorage.getItem(NEW_USER_STORAGE_KEY);
      if (isNewUser !== null) {
        this.setState({ isNewUser: false });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let { image, text, textFont, width, height, locked, help, camera, photoLoader, mirror, invertBackground, brightness, isNewUser, textAsImage } = this.state;

    if (help) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <Help />
          <View style={{ margin: 5 }}></View>
          <ActionButtonWithText onPress={this._openLegal} iconName="md-book" text={i18n.t('privacy_policy')} />

          <View style={{ margin: 5 }}></View>
          <ActionButtonWithText onPress={this._openLicenses} iconName="md-heart" text={i18n.t('licenses_credits')} />
          
          <FloatingToolbar top={true} left={true}>
            <ActionButton onPress={this._toMain} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" />
          </FloatingToolbar>
          <StatusBar hidden={true} />
        </View>
      );
    }

    if (!image && !camera && !textAsImage) {
      return (<MainMenu
        displayOnboarding={isNewUser}
        dismissOnboarding={this._readyToUse}
        items={[
          { onPress: this._pickImage, iconName: "md-briefcase", text: i18n.t('pick_a_image') },
          { onPress: this._openCamera, iconName: "md-camera", text: i18n.t('camera') },
          { onPress: this._openTextAsImage, iconName: "md-language", text: i18n.t('use_text_as_image') },
          { onPress: this._toHelp, iconName: "md-help-buoy", text: i18n.t('button_help') },
        ]} />);
    } else if (!image && camera && !textAsImage) {
      return (
        <Camera ref={this.cameraRef}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photoLoader && <ActivityIndicator size="large" color="#ffffff" />}

            <FloatingToolbar top={true} left={true}>
              <ActionButton onPress={this._toMain} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" />
            </FloatingToolbar>

            <FloatingToolbar>
              <ActionButton onPress={this._snap} text={i18n.t("button_takephoto")} iconName="md-camera" />
            </FloatingToolbar>
            <StatusBar hidden={true} />
          </View>
        </Camera>
      );
    } else if ( (image || textAsImage) && !camera ) {
      if (text === null && textAsImage) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            <TextInputBox text={''} onSubmitPress={this._setText} />
            <FontDropDown textFont={textFont} onSelect={this._setFont} />
            <FloatingToolbar top={true} left={true}>
              <ActionButton onPress={this._toMain} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" />
            </FloatingToolbar>
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, backgroundColor: invertBackground ? 'white' : 'black' }}>
            <TrasformableImage ref={component => {this.transformableImage = component}}
              mirror={mirror}
              text={text}
              image={image}
              width={width}
              height={height}
              locked={locked}
              brightness={brightness}
              lightMode={invertBackground}
              textFont={textFont}
              />
            {!locked &&
              <FloatingToolbar top={true} left={true}>
                <ActionButton onPress={this._toMain} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" lightMode={invertBackground} />
              </FloatingToolbar>
            }
            {!locked &&
              <FloatingToolbar left={true}>
                <ActionButton onPress={this._brightness} text={i18n.t("button_brightness")} textPosition="right" iconName="md-sunny" lightMode={invertBackground} />
                <ActionButton onPress={this._invertBackground} text={i18n.t("button_invertBackground")} textPosition="right" iconName="md-bulb-outline" lightMode={invertBackground} />
                <ActionButton onPress={this._mirror} text={i18n.t("button_mirror")} textPosition="right" iconName="swap-horizontal-outline" lightMode={invertBackground} />
                <ActionButton onPress={this._rotateQuarter} text={i18n.t("button_rotate")} textPosition="right" iconName="sync-outline" lightMode={invertBackground} />
              </FloatingToolbar>
            }
            <FloatingToolbar>
              {!locked && <ActionButton onPress={this._lock} text={i18n.t("button_lock")} iconName="md-lock-open" lightMode={invertBackground} />}
              {locked && <ActionButton onPress={this._unlock} text={i18n.t("button_unlock")} iconName="md-lock-closed" lightMode={invertBackground} />}
            </FloatingToolbar>
            <StatusBar hidden={true} />
          </View>
        );
      }
    }
  }

  _brightness = async () => {
    if (!this.state.brightness) {
      const currentBrightness = await Brightness.getBrightnessAsync();
      await Brightness.setBrightnessAsync(1);
      if (currentBrightness < 0.95) {
        ToastAndroid.show(i18n.t('toast_brightness_to_max'), ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(i18n.t('toast_brightness_already_at_max'), ToastAndroid.SHORT);
      }
    } else {
      await Brightness.useSystemBrightnessAsync();
      ToastAndroid.show(i18n.t('toast_brightness_to_default'), ToastAndroid.SHORT);
    }
    this.state.brightness ? this.setState({ brightness: false }) : this.setState({ brightness: true });
  }

  _mirror = () => {
    this.state.mirror ? this.setState({ mirror: false }) : this.setState({ mirror: true });
  }

  _rotateQuarter = () => {
    this.setState({ rotationOffset: (this.state.rotationOffset + 1) % 4 });
    this.transformableImage.setRotate(this.state.rotationOffset * 0.785398165);
  }

  _invertBackground = () => {
    this.state.invertBackground ? this.setState({ invertBackground: false }) : this.setState({ invertBackground: true });
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
    const { status } = await CameraComp.requestCameraPermissionsAsync();
    this.setState({ camera: status === 'granted' }, () => {
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

  _openTextAsImage = () => {
    this.setState({ textAsImage: true });
  }

  _setText = (textValue) => {
    if (textValue.text === "") {
      this.setState({
        text: null
      });
      return;
    };

    this.setState({
      text: textValue.text
    });
  }

  _setFont = (fontValue) => {
    this.setState({
      textFont: fontValue
    });
  }

  _toHelp = () => {
    this.setState({ help: true });
  }

  _toMain = () => {
    this.setState({ help: false, camera: false, image: null, brightness: false, mirror: false, text: null, textAsImage: false, invertBackground: false });
  }

  _readyToUse = () => {
    this.setState({ isNewUser: false });
    AsyncStorage.setItem(NEW_USER_STORAGE_KEY, 'true');
    this._toMain();
  }

  _openLegal = () => {
    Linking.openURL("https://raw.githubusercontent.com/dodie/tracing-paper-sketching/master/legal.md");
  }

  _openLicenses = () => {
    Linking.openURL("https://raw.githubusercontent.com/dodie/tracing-paper-sketching/master/licenses.md");
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    let { image, text, locked, camera, textAsImage, help } = this.state;

    const isMainMenu = !image && !camera && !textAsImage && !help;
    const isDrawing = (image || (text !== null && textAsImage)) && !camera
    const isLocked = locked;

    if (isDrawing && isLocked) {
      ToastAndroid.show(i18n.t('toast_screen_locked'), ToastAndroid.SHORT);
      return true;
    }

    if (isMainMenu) {
      BackHandler.exitApp();
      return true;
    }

    this._toMain();
    return true;
  }
}

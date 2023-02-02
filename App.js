import React from 'react';
import { ScrollView, Text, View, ActivityIndicator, ToastAndroid, Linking, BackHandler, Alert, Dimensions, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TrasformableImage from './src/transformable-image';
import FloatingToolbar from './src/floating-toolbar';
import ActionButton from './src/action-button';
import ActionButtonWithText from './src/action-button-with-text';
import TextInputBox from './src/text-input-box';
import FontDropDown from './src/font-drop-down'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import i18n from './i18n/i18n';
import Camera from './src/camera';
import * as Brightness from 'expo-brightness';
import { StatusBar } from 'expo-status-bar';
import Help from './src/help'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera as CameraComp } from 'expo-camera';
import MainMenu from './src/main-menu';
import Svgs from './src/svg';
import Grid from './src/grid'
import Svg, { Path, Circle } from "react-native-svg"

const NEW_USER_STORAGE_KEY = "isNewUser";

const SCREEN = {
  MAIN: "main",
  HELP: "help",
  CAMERA_SELECTOR: "camera_selector",
  TEXT_SELECTOR: "text_selector",
  SVG_SELECTOR: "svg_selector",
  DRAWING: "drawing"
};

export default class App extends React.Component {
  state = {
    screen: SCREEN.MAIN,
    isNewUser: true,

    image: null,
    text: null,
    textFont: 'Roboto',
    svg: null,

    photoLoader: false,

    width: null,
    height: null,
    locked: false,
    mirror: false,
    invertBackground: false,
    brightness: false,
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
    let { screen, image, text, textFont, svg, width, height, locked, photoLoader, mirror, invertBackground, brightness, isNewUser } = this.state;

    if (screen === SCREEN.MAIN) {
      return (<MainMenu
        displayOnboarding={isNewUser}
        dismissOnboarding={this._readyToUse}
        items={[
          { onPress: this._pickImage, iconName: "md-briefcase", text: i18n.t('photos') },
          { onPress: this._openCamera, iconName: "md-camera", text: i18n.t('camera') },
      //    { onPress: this._open(SCREEN.SVG_SELECTOR), iconName: "md-bug", text: i18n.t('contours') },
          { onPress: this._open(SCREEN.TEXT_SELECTOR), iconName: "md-language", text: i18n.t('use_text_as_image') },
          { onPress: this._open(SCREEN.HELP), iconName: "md-help-buoy", text: i18n.t('button_help') },
        ]} />);
    }

    if (screen === SCREEN.DRAWING) {
      return (
        <View style={{ flex: 1, backgroundColor: invertBackground ? 'white' : 'black' }}>
          <TrasformableImage ref={component => {this.transformableImage = component}}
            mirror={mirror}
            text={text}
            image={image}
            svg={svg}
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

    if (screen === SCREEN.SVG_SELECTOR) {
      const deviceWidth = Dimensions.get("window").width;
      const { size, margin } = Grid.calcTileDimensions(deviceWidth, 1);

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(59, 87, 59)' }}>
          
          <ScrollView style={{ flex:1 }} keyboardShouldPersistTaps="always">
          <View style={[Grid.styles.container, {marginTop: 100}]}>

          {Object.keys(Svgs).map(item => {
              return (<TouchableOpacity onPress={this._setSvg(item)} activeOpacity={0.7} key={item}>
                <View style={[Grid.styles.item, { width: size, height: size, margin: margin }]}>
                  <View style={[Grid.styles.itemInner, {aspectRatio: 1}]}>
                    <Svg height="100%" width="100%" viewBox={Svgs[item].viewBox} >
                      {
                        Svgs[item].path.map(path => {
                          return <Path key={path} id={path}
                            fill="none"
                            stroke={this.props.lightMode ? "#000" : "#FFF"}
                            strokeWidth={4}
                            strokeLinecap="square"
                            strokeLinejoin="bevel"
                            d={path}
                          />
                        })
                      }
                    </Svg>
                  </View>
                </View>
              </TouchableOpacity>);
          })}

        </View>
        </ScrollView>
          
          <FloatingToolbar top={true} left={true}>
            <ActionButton onPress={this._toMain} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" />
          </FloatingToolbar>
          <StatusBar hidden={true} />
        </View>
      );
    }
    
    if (screen === SCREEN.CAMERA_SELECTOR) {
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
    }

    if (screen === SCREEN.TEXT_SELECTOR) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(59, 87, 59)' }}>
          <FontDropDown textFont={textFont} onSelect={this._setFont} />
          <TextInputBox text={''} onSubmitPress={this._setText} />
          <FloatingToolbar top={true} left={true}>
            <ActionButton onPress={this._toMain} text={i18n.t("button_back")} textPosition="right" iconName="md-arrow-back" />
          </FloatingToolbar>
          <StatusBar hidden={true} />
        </View>
      );
    }
    
    if (screen === SCREEN.HELP) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(59, 87, 59)' }}>
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
      this.setState({ screen: SCREEN.DRAWING, image: result.uri, width: result.width, height: result.height }, () => {
        ToastAndroid.show(i18n.t('toast_image_loaded'), ToastAndroid.SHORT);
      });
    }
  }

  _openCamera = async () => {
    const { status } = await CameraComp.requestCameraPermissionsAsync();
    this.setState({ screen: status === 'granted' ? SCREEN.CAMERA_SELECTOR : SCREEN.MAIN}, () => {
      if (this.state.screen !== SCREEN.CAMERA_SELECTOR) {
        ToastAndroid.show(i18n.t('toast_no_access_to_camera'), ToastAndroid.SHORT);
      }
    });
  }

  _snap = async () => {
    if (this.cameraRef) {
      this.setState({ photoLoader: true }, async () => {
        const photo = await this.cameraRef.current.takePictureAsync();
        this.setState({ image: photo.uri, width: photo.width, height: photo.height, screen: SCREEN.DRAWING, photoLoader: false });
      });
    }
  };

  _openTextAsImage = () => {
    this.setState({ screen: SCREEN.TEXT_SELECTOR });
  }

  _open = (screenName) => () => {
    this.setState({ screen: screenName });
  }

  _openSvgAsImage = () => {
    this.setState({ screen: SCREEN.SVG_SELECTOR });
  }

  _setText = (textValue) => {
    if (textValue.text === "") {
      this.setState({
        text: null
      });
      return;
    };

    this.setState({
      text: textValue.text,
      screen: SCREEN.DRAWING
    });
  }

  _setFont = (fontValue) => {
    this.setState({
      textFont: fontValue
    });
  }

  _setSvg = (value) => () => {
    this.setState({
      svg:  Svgs[value],
      screen: SCREEN.DRAWING
    });
  }
  
  _toMain = () => {
    this.setState({ screen: SCREEN.MAIN, image: null, svg: null, brightness: false, mirror: false, text: null, invertBackground: false });
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
    let { screen, locked } = this.state;

    if (screen === SCREEN.DRAWING && locked) {
      ToastAndroid.show(i18n.t('toast_screen_locked'), ToastAndroid.SHORT);
      return true;
    }

    if (screen === SCREEN.MAIN) {
      BackHandler.exitApp();
      return true;
    }

    this._toMain();
    return true;
  }
}

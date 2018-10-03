import React, { Component } from "react";
import { BLUE_DARK } from '../../constants/colorPalette';
import {
  View,
  ScrollView,
  AsyncStorage,
  // SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from "react-native";
import { Container, Item, Input, Button, Text, Form, Label, Toast, Spinner } from 'native-base';
import styles from './LoginStyle';
import { REGISTER_ROUTE, FORGOT_ROUTE, APP_ROUTE } from "../../constants/routes";
import * as accountActions from './actions';
import accountStore from './AccountStore';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { LOG, WARN, ERROR } from "../../utils";
import { FormView } from "../../utils/platform";

class LoginScreen extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.loginSubscription = accountStore.subscribe('Login', (user) => this.loginHandler(user));
    this.registerSubscription = accountStore.subscribe('Register', (user) => this.registerHandler(user));
    this.accountStoreError = accountStore.subscribe('AccountStoreError', (err) => this.errorHandler(err));
  }

  componentWillUnmount() {
    this.loginSubscription.unsubscribe();
    this.registerSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  registerHandler = (user) => {
    this.isLoading(false);
    this.setState({
      email: user.email,
      password: '',
     });
  }

  loginHandler = (user) => {
    this.isLoading(false);

    try {
      token = user.token;
      status = user.user.profile.status;
    } catch (e) {
      WARN(this, e);
    }

    if (!status || status === 'PENDING_EMAIL_VALIDATION') {
      return Toast.show({
        position: 'top',
        type: "danger",
        text: i18next.t('LOGIN.youMustValidateEmail'),
        duration: 4000,
      });
    }

    if (token) {
      this.props.navigation.navigate(APP_ROUTE);
    }
  }

  errorHandler = (err) => {
    this.isLoading(false);
    Toast.show({
      position: 'top',
      type: "danger",
      text: JSON.stringify(err),
      duration: 4000,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (<View style={styles.container}>
                <Spinner color={BLUE_DARK}/>
            </View>);
    }

    return (<I18n>{(t, { i18n }) => (
            <View style={styles.container}>
                <Image
                    style={styles.viewBackground}
                    source={require('../../assets/image/bg.jpg')}
                />
                <Image
                    style={styles.viewLogo}
                    source={require('../../assets/image/logo1.png')}
                />
                <FormView>
                  <Form>
                      <Item style={styles.viewInput} inlineLabel rounded>
                          <Input value={this.state.email}
                            placeholder={t('LOGIN.email')}
                                 onChangeText={(text) => this.setState({email: text})}/>
                      </Item>
                      <Item style={styles.viewInput} inlineLabel rounded>
                          <Input value={this.state.password}
                            placeholder={t('LOGIN.password')}
                                 onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                      </Item>
                  </Form>
                  <TouchableOpacity
                      full
                      onPress={this.userForgot.bind(this)}
                      style={styles.viewButtomSignUp}>
                      <Text
                          style={styles.textButtomForgot}>
                          {t('LOGIN.forgotPassword')}
                      </Text>
                  </TouchableOpacity>
                  <Button
                      full
                      onPress={this.login}
                      style={styles.viewButtomLogin}>
                      <Text
                          style={styles.textButtom}>
                          {t('LOGIN.signIn')}
                      </Text>
                  </Button>
                  <TouchableOpacity
                      full
                      onPress={this.userRegister.bind(this)}
                      style={styles.viewButtomSignUp}>
                      <Text
                          style={styles.textButtomSignUp}>
                          {`${t('LOGIN.dontHaveAnAccount')} `}
                          <Text
                              style={styles.textButtomClick}>
                              {t('LOGIN.clickToSignUp')}
                          </Text>
                      </Text>
                  </TouchableOpacity>
                </FormView>
            </View>)
        }</I18n>);
  }

  userRegister() {
    this.props.navigation.navigate(REGISTER_ROUTE);
  }

  userForgot() {
    this.props.navigation.navigate(FORGOT_ROUTE);
  }

  login = () => {
    this.isLoading(true);
    accountActions.login(this.state.email.toLowerCase().trim(), this.state.password);
  };

  isLoading = (isLoading) => {
    this.setState({ isLoading });
  }
}

export default LoginScreen;

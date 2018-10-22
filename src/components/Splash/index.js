import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  StyleSheet,
} from "react-native";
import { Spinner } from 'native-base';
import { BLUE_DARK } from '../../constants/colorPalette'
import { APP_ROUTE, AUTH_ROUTE } from "../../constants/routes";
import store from "../Account/AccountStore";
import { LOG } from "../../utils";
import accountStore from '../Account/AccountStore';
import * as accountActions from '../Account/actions';

class Splash extends Component {

  componentDidMount() {
    setTimeout(() => {
      this._bootstrapAsync();
    }, 3000);

    this.loginSubscription = accountStore.subscribe('Login', (user) => this.loginHandler(user));
  }

  componentWillUnmount() {
    this.loginSubscription.unsubscribe();
  }

  loginHandler = (user) => {
    let status;
    let token;

    try {
      token = user.token;
      status = user.user.profile.status;
    } catch (e) {
      LOG(this, e);
    }

    if (token && status && status !== 'PENDING_EMAIL_VALIDATION') {
      return this.props.navigation.navigate(APP_ROUTE);
    }

    this.props.navigation.navigate(AUTH_ROUTE);
  }

  // Fetch the token from AsycnStorage/FluxState then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let userData = await store.getState('Login');

    if (!userData || !userData.token) {
      const userString = await AsyncStorage.getItem('user');

      try {
        userData = JSON.parse(userString);
      } catch (e) {
        LOG(this, e);
      }
    }

    accountActions.setStoredUser(userData || {});
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
                <Spinner color={BLUE_DARK}/>
            </View>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

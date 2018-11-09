import { StyleSheet } from 'react-native';
import {
  BLUE_MAIN,
  WHITE_MAIN,
  VIOLET_MAIN,
  GRAY_MAIN,
  RED_MAIN,
  BLACK_MAIN,
  BLUE_DARK,
} from '../../constants/colorPalette';

export default StyleSheet.create({
  map: {
    marginTop: 30,
    marginBottom: 30,
    height: 300,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  viewLocation: {
    marginTop: 40,
    marginBottom: 30,
  },
  textLocation: {
    textAlign: 'center',
    color: BLUE_DARK,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCustom: {
    backgroundColor: BLUE_MAIN,
  },
  titleHeader: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
    width: '80%'
  },
  buttomApply: {
    backgroundColor: BLUE_MAIN
  },
  buttomReject: {
    backgroundColor: VIOLET_MAIN
  },
  viewListItem: {
    paddingLeft: 50,
    paddingRight: 50
  },
  viewDataOffers: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 15
  },
  textOne: {
    color: VIOLET_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  textTwo: {
    color: GRAY_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  textThree: {
    color: BLUE_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  textRed: {
    color: RED_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  textBlack: {
    color: BLACK_MAIN,
    fontSize: 12,
    textAlign: 'left'
  },
  viewTitleInfo: {
    alignSelf: 'flex-start',
    marginBottom: 5
  },
  viewCrud: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 100,
  },
  viewButtomLeft: {
    width: '50%',
    marginRight: 5,
  },
  buttomLeft: {
    borderColor: VIOLET_MAIN,
    color: WHITE_MAIN,
  },
  viewButtomRight: {
    width: '50%',
    marginLeft: 5,
  },
  buttomRight: {
    borderColor: BLUE_MAIN,
    color: WHITE_MAIN,
  },
  textViolet: {
    color: VIOLET_MAIN,
  },
  textBlue: {
    color: BLUE_MAIN,
  }
});
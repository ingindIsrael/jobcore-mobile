import {
  StyleSheet,
  // Platform,
  Dimensions,
} from 'react-native';
import {
  BLUE_DARK,
  WHITE_MAIN,
  GREEN_MAIN,
  BG_GRAY_LIGHT,
  LOW_RED,
  BLACK_MAIN,
  RED_MAIN,
  GRAY_MAIN,
  SUGAR_LOW_RED,
  GREEN_PURE,
  GREEN_LOW,
  YELLOW_PURE,
  YELLOW_LOW,
} from '../../shared/colorPalette';
var height = Dimensions.get('window').height;

// const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    height: '80%',
    paddingHorizontal: 35,
  },
  buttonContainer: {
    paddingHorizontal: 35,
    marginBottom: 20,
    marginTop: 20,
  },
  viewButtomLogin: {
    backgroundColor: BLUE_DARK,
    borderRadius: 5,
    height: 45,
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInput: {
    backgroundColor: 'transparent',
    color: BLUE_DARK,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    width: '100%',
    flexDirection: 'column',
    padding: 10,
  },
  textButtom: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: WHITE_MAIN,
  },
  placeholderTextButtomPicker: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: WHITE_MAIN,
  },
  userStatusLabel: {
    // height: 50,
    backgroundColor: BG_GRAY_LIGHT,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  userStatusLabelText: {
    color: GRAY_MAIN,
    // marginLeft: 20,
    marginRight: 20,
    fontWeight: '700',
  },
  documentRejectedText: {
    color: LOW_RED,
  },

  closeIconApproved: {
    color: GREEN_MAIN,
    marginRight: 20,
  },
  closeIconRejected: {
    color: WHITE_MAIN,
    marginRight: 20,
  },
  noDocsText: {
    fontSize: 16,
    height: 50,
    fontWeight: '800',
    textAlign: 'center',
    color: BLUE_DARK,
    marginTop: height / 3,
  },
  garbageIcon: {
    width: 20,
    height: 24,
    marginLeft: 10,
  },
  statusImage: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  documentStatusImage: {
    width: 30,
    height: 40,
    // marginLeft: 10,
    marginRight: 10,
  },
  statusInfoContainer: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    // flexDirection: 'row',
  },
  statusTextApproved: {
    fontWeight: '600',
    color: WHITE_MAIN,
  },
  statusTextRejected: {
    color: BLACK_MAIN,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextButtonApproved: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: BLUE_DARK,
    borderRadius: 5,
  },
  statusTextButtonRejected: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: SUGAR_LOW_RED,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: RED_MAIN,
  },
  documentStatusTextApproved: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREEN_LOW,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GREEN_PURE,
    width: 90,
  },
  documentStatusTextRejected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LOW_RED,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: RED_MAIN,
    width: 90,
  },
  documentStatusTextUnderReview: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: YELLOW_PURE,
    width: 90,
    backgroundColor: YELLOW_LOW,
  },
  documentsStatusText: {
    fontSize: 12,
  },
  userStatusInfoText: {
    color: GRAY_MAIN,
    marginTop: 10,
  },
  step1Container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  stepCirle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BLUE_DARK,
    marginRight: 10,
  },
  stepCirleText: {
    color: WHITE_MAIN,
    fontWeight: '900',
  },
  formStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentNameContainer: {
    flexDirection: 'row',
  },
});

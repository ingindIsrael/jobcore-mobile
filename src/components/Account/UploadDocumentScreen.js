import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import { Text, Form, Label, Content, Container, Button } from 'native-base';
import UploadDocumentStyle from './UploadDocumentStyle';
import { I18n } from 'react-i18next';
import { Loading, CustomToast } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { ADD_DOCUMENT_ROUTE } from '../../constants/routes';
import accountStore from './AccountStore';
import {
  uploadDocument,
  getDocuments,
  getUser,
  getDocumentsTypes,
} from './actions';
import { i18next } from '../../i18n';
import { LOG } from '../../shared';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import CustomPicker from '../../shared/components/CustomPicker';
const IMAGE_PICKER_OPTIONS = {
  mediaType: 'photo',
  noData: true,
  skipBackup: true,
  documentsTypesList: [],
};

const Document = ({
  doc,
  t,
  // deleteDocumentAlert
}) => (
  <Form>
    <View style={UploadDocumentStyle.formStyle}>
      <View style={UploadDocumentStyle.viewInput}>
        <View style={UploadDocumentStyle.documentNameContainer}>
          <Image
            style={UploadDocumentStyle.documentStatusImage}
            source={
              doc.status && doc.status === 'APPROVED'
                ? require('../../assets/image/documents/document-check.png')
                : require('../../assets/image/documents/document-interrogation.png')
            }
          />
          <View>
            <Label numberOfLines={2} style={{ width: 250 }}>
              {doc.name || `document #${doc.id}`}
            </Label>
            <View
              style={
                doc.status && doc.status === 'APPROVED'
                  ? UploadDocumentStyle.documentStatusTextApproved
                  : doc.status &&
                    (doc.status === 'REJECTED' ||
                      doc.status === 'DELETED' ||
                      doc.status === 'ARCHIVED')
                    ? UploadDocumentStyle.documentStatusTextRejected
                    : UploadDocumentStyle.documentStatusTextUnderReview //status === 'PENDING'
              }>
              <Text style={UploadDocumentStyle.documentsStatusText}>
                {t(`USER_DOCUMENTS.${doc.status.toLowerCase()}`).toLowerCase()}
              </Text>
            </View>
          </View>
        </View>
        {doc.rejected_reason && doc.status === 'REJECTED' ? (
          <View>
            <Label
              numberOfLines={1}
              style={UploadDocumentStyle.documentRejectedText}>
              {doc.rejected_reason}
            </Label>
          </View>
        ) : null}
      </View>
      {/* {doc.state !== 'APPROVED' ? (
        <TouchableOpacity
          onPress={() => deleteDocumentAlert(doc)}>
          <Image
            style={UploadDocumentStyle.garbageIcon}
            source={require('../../assets/image/delete.png')}
          />
        </TouchableOpacity>
      ) : null} */}
    </View>
  </Form>
);

class UploadDocumentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true,
      isLoading: true,
      documents: [],
      user: accountStore.getState('Login').user,
      docType: '',
      documentsTypes: [],
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.uploadDocumentSubscription = accountStore.subscribe(
      'UploadDocument',
      (data) => {
        console.log('UploadDocument: ', data);
        this.setState({ isLoading: false });
        getDocuments();
        getUser();
      },
    );
    this.getDocumentsSubscription = accountStore.subscribe(
      'GetDocuments',
      (documents) => {
        this.setState({ documents, isLoading: false });
        console.log('GetDocuments: ', documents);
      },
    );
    this.getDocumentsSubscription = accountStore.subscribe(
      'GetDocumentsTypes',
      (documentsTypes) => {
        this.setState({ documentsTypes, isLoading: false });
      },
    );
    this.deleteDocumentsSubscription = accountStore.subscribe(
      'DeleteDocument',
      (res) => {
        getDocuments();
        this.setState({ isLoading: false });
        console.log('delete document: ', res);
      },
    );
    this.getUserSubscription = accountStore.subscribe('getUser', (user) => {
      this.setState({ user });
    });
    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      this.errorHandler,
    );
    getDocuments();
    getDocumentsTypes();
    getUser();
  }

  componentWillUnmount() {
    this.getDocumentsSubscription.unsubscribe();
    this.deleteDocumentsSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
    this.getUserSubscription.unsubscribe();
  }

  errorHandler = (err) => {
    this.setState({ isLoading: false });
    CustomToast(err, 'danger');
  };

  goToAddDocument = () => {
    this.props.navigation.navigate(ADD_DOCUMENT_ROUTE);
  };

  // pickDocument = async () => {
  //   // Pick a single file
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.pdf],
  //     });
  //     console.log(res);
  //     console.log(
  //       res.uri,
  //       res.type, // mime type
  //       res.name,
  //       res.size,
  //     );
  //     this.saveDocumentAlert(res.name, res);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  saveDocumentAlert = (docName, res) => {
    Alert.alert(
      i18next.t('USER_DOCUMENTS.wantToAddDocument'),
      ` ${docName}?`,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel add document');
          },
        },
        {
          text: i18next.t('USER_DOCUMENTS.saveDoc'),
          onPress: () => {
            this.setState({ isLoading: true }, () => {
              uploadDocument(res);
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  // deleteDocumentAlert = (doc) => {
  //   Alert.alert(
  //     i18next.t('USER_DOCUMENTS.wantToDeleteDocument'),
  //     ` ${doc.name || `document #${doc.id}`}?`,
  //     [
  //       {
  //         text: i18next.t('APP.cancel'),
  //         onPress: () => {
  //           LOG(this, 'Cancel delete document');
  //         },
  //       },
  //       {
  //         text: i18next.t('USER_DOCUMENTS.deleteDoc'),
  //         onPress: () => {
  //           this.setState({ isLoading: true }, () => {
  //             deleteDocument(doc);
  //           });
  //         },
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  openImagePicker = () => {
    ImagePicker.showImagePicker(
      IMAGE_PICKER_OPTIONS,
      this.handleImagePickerResponse,
    );
  };

  /**
   * Handle react-native-image-picker response and set the selected image
   * @param  {object} response A react-native-image-picker response
   * with the uri, type & name
   */
  handleImagePickerResponse = (response) => {
    const { docType } = this.state;
    if (response.didCancel) {
      // for react-native-image-picker response
      LOG(this, 'User cancelled image picker');
    } else if (response.error) {
      // for react-native-image-picker response
      LOG(this, `ImagePicker Error: ${response.error}`);
    } else if (response.customButton) {
      // for react-native-image-picker response
      LOG(this, `User tapped custom button: ${response.customButton}`);
    } else {
      if (!response.uri) return;

      let type = response.type;

      if (type === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('.');
        type = response.uri.substring(pos + 1);
        if (type) type = `image/${type}`;
      }
      if (type === undefined) {
        const splitted = response.fileName.split('.');
        type = splitted[splitted.length - 1];
        if (type) type = `image/${type}`;
      }

      let name = response.fileName;
      if (name === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('/');
        name = response.uri.substring(pos + 1);
      }

      const selectedImage = {
        uri: response.uri,
        type: type.toLowerCase(),
        name,
        docType,
      };
      this.saveDocumentAlert(selectedImage.name, selectedImage);
      this.setState({ selectedImage });
    }
  };

  render() {
    const { user, showWarning, docType, documentsTypes } = this.state;
    const { documents } = this.state;
    console.log('user: ', user);
    console.log('docType: ', docType);
    console.log('modalVisible: ', this.state.modalVisible);
    const isAllowDocuments = user.employee
      ? !user.employee.document_active
      : true;
    const identityDocuments = documents.filter(
      (doc) => doc.document_type && doc.document_type.validates_identity,
    );
    const employmentDocuments = documents.filter(
      (doc) => doc.document_type && doc.document_type.validates_employment,
    );
    const formDocuments = documents.filter(
      (doc) => doc.document_type && doc.document_type.is_form,
    );
    const isMissingDocuments = user.employee
      ? user.employee.employment_verification_status === 'MISSING_DOCUMENTS'
      : false;
    const employmentVerificationStatus = user.employee
      ? user.employee.employment_verification_status
      : '';
    const filingStatus = user.employee ? user.employee.filing_status : '';
    const allowances = user.employee ? user.employee.allowances : '';
    const extraWithholding = user.employee
      ? user.employee.extra_withholding
      : '';
    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              screenName="employment_verification"
              title={t('USER_DOCUMENTS.uploadDocuments')}
              withoutHelpIcon={false}
            />
            {showWarning ? (
              <View style={UploadDocumentStyle.userStatusLabel}>
                <View>
                  <Image
                    style={UploadDocumentStyle.statusImage}
                    source={
                      employmentVerificationStatus === 'APPROVED'
                        ? require('../../assets/image/documents/circle-check.png')
                        : require('../../assets/image/documents/circle-X.png')
                    }
                  />
                </View>
                <View style={UploadDocumentStyle.statusInfoContainer}>
                  <View style={UploadDocumentStyle.statusContainer}>
                    <Text style={UploadDocumentStyle.userStatusLabelText}>
                      {t('USER_DOCUMENTS.status')}
                    </Text>
                    <View
                      style={
                        employmentVerificationStatus === 'APPROVED'
                          ? UploadDocumentStyle.statusTextButtonApproved
                          : UploadDocumentStyle.statusTextButtonRejected
                      }>
                      <Text
                        style={
                          employmentVerificationStatus === 'APPROVED'
                            ? UploadDocumentStyle.statusTextApproved
                            : UploadDocumentStyle.statusTextRejected
                        }>
                        {employmentVerificationStatus === 'APPROVED'
                          ? t('USER_DOCUMENTS.verified').toLowerCase()
                          : isAllowDocuments && isMissingDocuments
                            ? t('USER_DOCUMENTS.missingDocuments').toLowerCase()
                            : t('USER_DOCUMENTS.notVerified').toLowerCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={UploadDocumentStyle.userStatusInfoText}>
                    {employmentVerificationStatus === 'APPROVED'
                      ? t('USER_DOCUMENTS.verifiedInfo')
                      : isAllowDocuments && isMissingDocuments
                        ? t('USER_DOCUMENTS.missingDocumentsInfo')
                        : t('USER_DOCUMENTS.notVerifyInfo')}
                  </Text>
                  {employmentVerificationStatus === 'APPROVED' ? (
                    <>
                      {/* <Text style={UploadDocumentStyle.employmentVerificationStatusTitle}>
                        {t('USER_DOCUMENTS.employmentVerificationStatus')}
                      </Text>
                      <Text style={UploadDocumentStyle.employmentVerificationText}>
                        {t(
                          `USER_DOCUMENTS.${employmentVerificationStatus.toLowerCase()}`,
                        )}
                      </Text> */}
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={UploadDocumentStyle.statusTitleGeneral}>
                          {t('USER_DOCUMENTS.filingStatus')}
                        </Text>
                        <Text
                          style={UploadDocumentStyle.userStatusInfoTextGeneral}>
                          {t(`USER_DOCUMENTS.${filingStatus.toLowerCase()}`)}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={UploadDocumentStyle.statusTitleGeneral}>
                          {t('USER_DOCUMENTS.allowances')}
                        </Text>
                        <Text
                          style={UploadDocumentStyle.userStatusInfoTextGeneral}>
                          {allowances}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={UploadDocumentStyle.statusTitleGeneral}>
                          {t('USER_DOCUMENTS.extraWithholding')}
                        </Text>
                        <Text
                          style={UploadDocumentStyle.userStatusInfoTextGeneral}>
                          {extraWithholding}
                        </Text>
                      </View>
                    </>
                  ) : null}
                </View>
                {/* <Icon
                  onPress={() => this.setState({ showWarning: false })}
                  style={
                    isAllowDocuments
                      ? UploadDocumentStyle.closeIconApproved
                      : UploadDocumentStyle.closeIconRejected
                  }
                  name="close"
                  size={5}
                /> */}
              </View>
            ) : null}
            {this.state.isLoading ? <Loading /> : null}
            <Content>
              <View style={UploadDocumentStyle.container}>
                <View style={{ height: '100%' }}>
                  {/* Step 1 */}
                  <View style={UploadDocumentStyle.step1Container}>
                    <View style={UploadDocumentStyle.stepCirle}>
                      <Text style={UploadDocumentStyle.stepCirleText}>1</Text>
                    </View>
                    <Text>{t('USER_DOCUMENTS.step1')}</Text>
                  </View>
                  {identityDocuments.length > 0
                    ? identityDocuments.map((doc, i) => (
                      <Document
                        doc={doc}
                        t={t}
                        key={i}
                        // deleteDocumentAlert={this.deleteDocumentAlert}
                      />
                    ))
                    : null}
                  {/* Step 2 */}
                  <View style={UploadDocumentStyle.step1Container}>
                    <View style={UploadDocumentStyle.stepCirle}>
                      <Text style={UploadDocumentStyle.stepCirleText}>2</Text>
                    </View>
                    <Text>{t('USER_DOCUMENTS.step2')}</Text>
                  </View>
                  {employmentDocuments.length > 0
                    ? employmentDocuments.map((doc, i) => (
                      <Document
                        doc={doc}
                        t={t}
                        key={i}
                        // deleteDocumentAlert={this.deleteDocumentAlert}
                      />
                    ))
                    : null}
                  {/* Step 3 */}
                  <View style={UploadDocumentStyle.step1Container}>
                    <View style={UploadDocumentStyle.stepCirle}>
                      <Text style={UploadDocumentStyle.stepCirleText}>3</Text>
                    </View>
                    <Text>{t('USER_DOCUMENTS.step3')}</Text>
                  </View>
                  {formDocuments.length > 0
                    ? formDocuments.map((doc, i) => (
                      <Document
                        doc={doc}
                        t={t}
                        key={i}
                        // deleteDocumentAlert={this.deleteDocumentAlert}
                      />
                    ))
                    : null}
                </View>
              </View>
            </Content>
            <View style={UploadDocumentStyle.buttonContainer}>
              <Button
                onPress={() => this.setState({ modalVisible: true })}
                disabled={!isAllowDocuments}
                style={UploadDocumentStyle.viewButtomLogin}>
                <Text style={UploadDocumentStyle.placeholderTextButtomPicker}>
                  {t('USER_DOCUMENTS.addDocument')}
                </Text>
              </Button>
            </View>
            <CustomPicker
              t={t}
              modalVisible={this.state.modalVisible}
              header={
                <ModalHeader
                  screenName="employment_verification"
                  title={t('USER_DOCUMENTS.uploadDocuments')}
                  withoutHelpIcon={false}
                  onPressClose={() => this.setState({ modalVisible: false })}
                />
              }
              data={documentsTypes}
              onItemPress={(item) =>
                this.setState({ docType: item.id, modalVisible: false }, () => {
                  setTimeout(() => {
                    this.openImagePicker();
                  }, 1000);
                })
              }
            />
          </Container>
        )}
      </I18n>
    );
  }
}

Document.propTypes = {
  doc: PropTypes.any,
  t: PropTypes.any,
};

UploadDocumentScreen.routeName = 'UPLOAD_DOCUMENT_ROUTE';

export default UploadDocumentScreen;

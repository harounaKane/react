import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';
import {styles} from './style';

const MenuModal = ({
  isVisible,
  onDeleteCallBack,
  onUpdateCallBack,
  onCloseModal,
}) => (
  <Modal
    isVisible={isVisible}
    animationIn={'zoomInDown'}
    animationOut={'zoomOutUp'}
    animationInTiming={1000}
    animationOutTiming={1000}
    onRequestClose={() => console.log ('close modal')}
    onBackdropPress={() => onCloseModal ()}
  >

    <TouchableWithoutFeedback onPress={() => onCloseModal ()}>
      <View style={styles.modal}>
        <View style={styles.textViewModal}>
          <Text>Que souhaitez vous faire ?</Text>
        </View>
        <View style={styles.buttonView}>
          <Button title="Supprimer" onPress={() => onDeleteCallBack ()} />
          <Button title="Modifier statut" onPress={() => onUpdateCallBack ()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

export default MenuModal;

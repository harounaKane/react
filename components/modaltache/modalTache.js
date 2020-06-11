import React from 'react';
import Modal from 'react-native-modal';
import {styles} from '../modal/style';
import {View, TextInput, Button, Text} from 'react-native';

class ModalTaches extends React.Component {
  constructor (props) {
    super (props);
    this.text = '';
  }
  textSaisi = text => {
    this.text = text;
    console.log (text);
  };
  render () {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        onRequestClose={() => console.log ('close modal')}
        onBackdropPress={() => this.props.onCloseModal ()}
      >
        <View style={styles.modal}>
          <Text style={styles.titreModal}>{this.props.titreModal}</Text>
          <TextInput
            placeholder={this.props.placeHolder}
            style={styles.input}
            onChangeText={text => this.textSaisi (text)}
            autoFocus
            defaultValue={this.props.defaultValue}
          />
          <View style={styles.buttonView}>
            <Button
              title="Annuler"
              onPress={() => this.props.onCloseModal ()}
            />
            <Button
              title="Valider"
              onPress={() => this.props.onSubmit (this.text)}
            />
          </View>
        </View>

      </Modal>
    );
  }
}

export default ModalTaches;

import React from 'react';
import lodash from 'lodash';
import {View, ScrollView, Text, AsyncStorage} from 'react-native';
import Header from './components/Header';
import ButtonAddTache from './components/button-add-tache';
import MenuModal from './components/modal';
import ModalTaches from './components/modaltache/modalTache';
import {styles} from './components/modal/style';
import ListeTache from './components/liste-tache';
import ListeTacheEnCours from './components/liste-tache-en-cours';
import ListeTacheEnTermine from './components/liste-tache-en-termine';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const storageKey = 'listeDeTache';
const Tab = createBottomTabNavigator ();

export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      taches: [],
      tacheCourante: {},
      isVisibleModal: false,
      isVisibleModalAdd: false,
      isVisibleModalModif: false,
      idGenerator: 0,
    };
  }

  componentDidMount () {
    AsyncStorage.getItem (storageKey).then (tabListSaved => {
      if (tabListSaved) {
        this.setState (
          {
            taches: JSON.parse (tabListSaved),
          },
          () => {
            if (this.state.taches.length) {
              this.setState ({
                idGenerator: this.state.taches[this.state.taches.length - 1]
                  .id + 1,
              });
            }
          }
        );
      }
    });
  }

  toggleModalVisibility = tache => {
    let tacheCourante = tache;
    if (this.state.isVisibleModal == true) {
      tacheCourante = {};
    }
    this.setState ({
      isVisibleModal: !this.state.isVisibleModal,
      tacheCourante: tacheCourante,
    });
  };

  deleteTache = () => {
    const index = this.findIndexTache ();

    const list = this.state.taches;
    list.splice (index, 1);

    this.setState (
      {
        taches: list,
        tacheCourante: {},
      },
      () => {
        this.saveListeTache ();
      }
    );

    this.toggleModalVisibility ();
  };

  updateTache = () => {
    //modif statut tache courante
    this.state.tacheCourante.statut = this.state.tacheCourante.statut ==
      'Terminé'
      ? 'En cours'
      : 'Terminé';

    //récupère la position de la tache dans ma liste de tâches
    const index = this.findIndexTache ();

    const list = this.state.taches;
    list[index] = this.state.tacheCourante;

    this.setState (
      {
        taches: list,
        tacheCourante: {},
      },
      () => {
        this.saveListeTache ();
      }
    );

    this.toggleModalVisibility ();
  };

  toggleModalAdd = () => {
    this.setState ({isVisibleModalAdd: !this.state.isVisibleModalAdd});
  };

  createTache = text => {
    console.log ('Create');

    if (text.length > 2) {
      this.setState (
        {
          taches: [
            ...this.state.taches,
            {id: this.state.idGenerator, tache: text, statut: 'En cours'},
          ],
          idGenerator: this.state.idGenerator + 1,
        },
        () => {
          this.saveListeTache ();
        }
      );
      this.toggleModalAdd ();
    }
  };

  toggleModalModif = tache => {
    let tacheEnCour = tache;
    if (this.state.isVisibleModalModif) {
      tacheEnCour = {};
    }
    this.setState ({
      isVisibleModalModif: !this.state.isVisibleModalModif,
      tacheCourante: tacheEnCour,
    });
  };

  modifTask = value => {
    const index = this.findIndexTache ();
    const modif = this.state.taches;
    const updateTask = this.state.tacheCourante;
    updateTask.tache = value;
    modif[index] = updateTask;
    this.toggleModalModif ();
    this.setState ({taches: modif}, () => {
      this.saveListeTache ();
    });
  };

  findIndexTache = () => {
    const index = lodash.findIndex (
      this.state.taches,
      this.state.tacheCourante
    );
    return index;
  };

  showList = () => {
    console.log ('showList');

    if (this.state.taches.length > 0) {
      return (
        <ListeTache
          taches={this.state.taches}
          onPressCallBack={this.toggleModalVisibility}
          onLongPressCallBack={this.toggleModalModif}
        />
      );
    }
    return <Text style={styles.text}>Liste vide</Text>;
  };

  saveListeTache = () => {
    AsyncStorage.setItem (storageKey, JSON.stringify (this.state.taches));
  };

  render () {
    console.log ('RENDER');

    return (
      <View style={{flex: 1}}>
        <Header titre="Liste de tâches" />
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeBackgroundColor: 'grey',
              labelStyle: {
                fontSize: 20,
                textTransform: 'uppercase',
              },
            }}
          >
            {/* Liste taches */}
            <Tab.Screen name="Accueil">
              {() => (
                <ScrollView>
                  {this.showList ()}
                </ScrollView>
              )}
            </Tab.Screen>

            {/* LISTE DES TACHES EN COURS */}

            <Tab.Screen name="En cours">
              {() => (
                <ScrollView>
                  {
                    <ListeTacheEnCours
                      taches={this.state.taches}
                      onPressCallBack={this.toggleModalVisibility}
                      onLongPressCallBack={this.toggleModalModif}
                    />
                  }

                </ScrollView>
              )}
            </Tab.Screen>

            {/* LISTE DES TACHES TERMINES */}
            <Tab.Screen name="Terminé">
              {() => (
                <ScrollView>
                  {
                    <ListeTacheEnTermine
                      taches={this.state.taches}
                      onPressCallBack={this.toggleModalVisibility}
                      onLongPressCallBack={this.toggleModalModif}
                    />
                  }
                </ScrollView>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>

        <MenuModal
          isVisible={this.state.isVisibleModal}
          onDeleteCallBack={this.deleteTache}
          onUpdateCallBack={this.updateTache}
          onCloseModal={this.toggleModalVisibility}
        />

        <ModalTaches
          titreModal="Nouvelle tâche"
          visible={this.state.isVisibleModalAdd}
          onCloseModal={this.toggleModalAdd}
          onSubmit={this.createTache}
          placeHolder="ex: coder en React"
        />

        <ModalTaches
          titreModal="Modifier la tâche"
          visible={this.state.isVisibleModalModif}
          onCloseModal={this.toggleModalModif}
          onSubmit={this.modifTask}
          defaultValue={this.state.tacheCourante.tache}
        />

        <ButtonAddTache onAddCallBack={this.toggleModalAdd} />
      </View>
    );
  }
}

import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View, Text, ScrollView} from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import globalStore from "./redux/globalStore";
import { Provider } from "react-redux"
import Routes from "./navigation/Routes";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from "./constants/Colors";
import {useEffect} from "react";
// import * as SplashScreen from 'expo-splash-screen';
import * as SplashScreen from 'react-native-splash-screen';
import { setContacts, setIsReady} from "./redux/actions/phoneContactsActions";
import { Snackbar } from 'react-native-paper';
import dbObject from './components/database/db';
// import {NativeModules} from "react-native";
import * as Contacts from "expo-contacts";

export default function App(props) {

    const [ setLoadingComplete] = useState(false);
    const isLoadingComplete = useCachedResources();

    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    // const init = async () => {
    //     try {
    //       // Keep on showing the SlashScreen
    //       await SplashScreen.preventAutoHideAsync();
       
    //     } catch (e) {
    //       console.warn(e);
    //     } finally {
    //     setLoadingComplete(true);
    //       // Hiding the SplashScreen
    //       await SplashScreen.hideAsync();
    //     }
    // }
    //  //const ContactModule = NativeModules.getAllContacts

    //  useEffect(() => {

    //      (async () => {
    //         init();
    //          // const {status} = await Contacts.requestPermissionsAsync();
    //          // if (status === 'granted') {
    //          //     ContactModule.get(successCallback, failureCallback);
    //          // }
    //      })()

    //  }, [])


     useEffect(() => {
        
        async function asyncTasks() {
          try {
            await SplashScreen.preventAutoHideAsync();
          } catch (e) {
            console.warn(e);
          }
        //   await loadResourcesAsync()
          setLoadingComplete(true);
        }
    
        asyncTasks()
      }, []);


    function successCallback(dataMap) {
        console.log("contacts module", dataMap)
        globalStore.dispatch(setContacts(dataMap))
        globalStore.dispatch(setIsReady(true))
    }

    function failureCallback(e) {
        console.log("contacts module", e)
        globalStore.dispatch(setContacts(e))
        globalStore.dispatch(setIsReady(true))
    }

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: Colors.primary,
        },
    };

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <View style={stylesI.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="dark-content"/>}

                <Provider store={globalStore}>
                    <NavigationContainer linking={LinkingConfiguration}>
                        <PaperProvider theme={theme}>
                            {
                                globalStore.getState().phoneContacts.isReady?

                                <View style={{
                                    backgroundColor: "#303030",
                                    color: "#fff",
                                    padding: 10,
                                    height: 100
                                }}>
                                    <ScrollView>
                                        <Text  style={{color: "#fff"}}>{JSON.stringify(globalStore.getState().phoneContacts.contacts)}</Text>
                                    </ScrollView>
                                </View>
                                  :
                                  null
                            }
                            <View style={{flex: 1}}>
                                <Routes />
                            </View>
                        </PaperProvider>
                    </NavigationContainer>
                </Provider>

                <Snackbar
                  visible={visible}
                  onDismiss={onDismissSnackBar}
                  action={{
                      label: 'Undo',
                      onPress: () => {
                          // Do something
                      },
                  }}>
                    contacts ready...
                </Snackbar>

            </View>
        );
    }
}

const stylesI = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cardGroup: {
        padding: 20,
        justifyContent: 'center',
    }
});


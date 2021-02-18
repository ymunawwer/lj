import React from 'react';
import {View, Text, TextInput, StyleSheet, Picker, TouchableOpacity, ScrollView} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {styles} from '../styles/globalStyle';

export default function BusinessCardEdit({navigation}) {
    return (
        <View style={{backgroundColor: 'white'}}>
            <ScrollView style={{paddingHorizontal: 10}}>

                <Text style={styles.boldText}><Entypo name="user" size={24} color="black"/> Personal Details</Text>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="Name"/>

                <View style={stylesI.TextInput}>
                    <Picker
                        style={[{height: 30}]}
                        placeholder={'Hello'}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Owner" value="owner"/>
                        <Picker.Item label="Partner" value="partner"/>
                        <Picker.Item label="Proprietor" value="proprietor"/>

                    </Picker>
                </View>

                <TextInput style={[stylesI.TextInput]} placeholder="Mobile Number"/>
                <Text style={styles.boldText}><MaterialIcons name="business-center" size={24} color="black"/> Business
                    Card Details</Text>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="Business Name"/>

                <View style={stylesI.TextInput}>
                    <Picker
                        placeholder="Designation"
                        style={[{height: 30}]}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Office" value="owner"/>
                        <Picker.Item label="Office2" value="partner"/>
                        <Picker.Item label="Office3" value="proprietor"/>

                    </Picker>
                </View>

                <TextInput style={[stylesI.TextInput]} placeholder="Business Email"/>

                <View style={stylesI.TextInput}>
                    <Picker
                        placeholder="Designation"
                        style={[{height: 30}]}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Business Type" value="owner"/>
                        <Picker.Item label="Office2" value="partner"/>
                        <Picker.Item label="Office3" value="proprietor"/>

                    </Picker>
                </View>

                <TextInput style={[stylesI.TextInput]} placeholder="GST Number"/>
                <Text style={styles.boldText}><MaterialIcons name="business-center" size={24} color="black"/> Shop
                    Office Address</Text>
                <TextInput style={[stylesI.TextInput, {marginTop: 20}]} placeholder="Address"/>

            </ScrollView>

            <View style={[styles.container, {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: 'white',
                zIndex: 2
            }]}>
                <TouchableOpacity style={{
                    backgroundColor: '#4e54c8',
                    width: '100%',
                    alignItems: 'center',
                    padding: 15,
                    borderRadius: 6
                }}>
                    <Text style={[styles.normalText, {color: "white"}]}>SAVE</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const stylesI = StyleSheet.create({

    TextInput: {

        marginBottom: 10,
        padding: 15,
        borderWidth: .5,
        borderColor: '#333',
        borderRadius: 6
    },
    Picker: {

        // marginVertical:15,
        // padding:15,
        // borderWidth:.5,
        // borderColor:'#333',
        // borderRadius:6
    }


});

import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View,Button} from "react-native"
import {bindActionCreators} from "redux";
import {setCurrentBookData, setUser} from "../redux/actions/personalsActions";
import {setAllActiveBooks} from "../redux/actions/booksDataActions";
import {connect} from "react-redux";
import {AntDesign, Entypo, Feather, Ionicons} from "@expo/vector-icons";
import {Caption, Divider, Subheading, Title, Switch} from "react-native-paper";
import Colors from "../constants/Colors";

function OneCustomerProfileScreen(props) {

    const {navigation, route} = props
    const [activeSwitch, setActiveSwitch] = useState(true)

    const onToggleActiveSwitch = () => setActiveSwitch(!activeSwitch);

    return(
        <View style={{flex: 1, backgroundColor: "#ffffff", padding: 10}}>

            <ScrollView>

                <View style={{alignItems:'center',paddingVertical:10,flex:1,backgroundColor:'white', marginHorizontal:10}}>
                    <View style={{height:100,width:100,borderRadius:100/2,backgroundColor:'#4e54c8',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:60,color:'white'}}>F</Text>
                    </View>
                    <Title>Fake Name</Title>
                    <Subheading>+912222222222</Subheading>
                </View>

                <Divider />
                {/* customer name */}

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'user'} size={24} color={"#3298fa"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Customer Name:</Title>
                        <Caption>Test Name</Caption>
                    </View>

                    <View style={{alignItems: "center"}}>
                    <Entypo name={'pencil'} size={18} color={"black"} />
                        {/* <Ionicons name="arrow-dropright" size={24} color="black"/> */}
                    </View>

                </View>

                <Divider />

                {/* customer name end */}


                 {/* customer mobile# */}

                 <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'phone'} size={24} color={"#3298fa"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Mobile Number:</Title>
                        <Caption>+911234567890</Caption>
                    </View>

                    <View style={{alignItems: "center"}}>
                    <Entypo name={'pencil'} size={18} color={"black"} />
                        {/* <Ionicons name="ios-arrow-dropright" size={24} color="black" /> */}
                    </View>

                </View>

                <Divider />

                {/* customer mobile# end */}


                 {/* customer max limit */}

                 <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'flash'} size={24} color={"#3298fa"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Max limit(Gave/Got):</Title>
                        <Caption>10000/5000</Caption>
                    </View>

                    <View style={{alignItems: "center"}}>
                    <Entypo name={'pencil'} size={18} color={"black"} />
                        {/* <Ionicons name="ios-arrow-dropright" size={24} color="black" /> */}
                    </View>

                </View>

                <Divider />

                {/* customer mobile# end */}

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'address'} size={24} color={"#3298fa"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Address:</Title>
                        <Caption>Fake Address, delhi, India</Caption>
                    </View>

                    <View style={{alignItems: "center"}}>
                    <Entypo name={'pencil'} size={18} color={"black"} />
                        {/* <Ionicons name="ios-arrow-dropright" size={24} color="black" /> */}
                    </View>

                </View>

                <Divider />

                {/* <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c2ffd4", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <AntDesign name={'flag'} size={24} color={"#33bd5c"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Transaction limit:</Title>
                        <Caption>No limit set</Caption>
                    </View>

                    <View style={{alignItems: "center"}}>
                        <Ionicons name="ios-arrow-dropright" size={24} color="black" />
                    </View>


        
                </View> */}
                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <AntDesign name={'mail'} size={24} color={"#3298fa"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Send Free SMS</Title>
                        {/* <Caption>This customer account is active.</Caption> */}
                    </View>

                    <Switch value={activeSwitch} onValueChange={onToggleActiveSwitch} />
                </View>

                <Divider />

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#c4ddf5", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <Entypo name={'list'} size={24} color={"#3298fa"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>SMS Settings:</Title>
                        <Caption>Language,Notes,Format etc</Caption>
                    </View>

                    <View style={{alignItems: "center"}}>
                        {/* <Ionicons name="ios-arrow-dropright" size={24} color="black" /> */}
                        <Entypo name={'pencil'} size={18} color={"black"} />
                    </View>

                </View>

                

                <Divider />

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                    <View style={{height: 40, width: 40, backgroundColor: "#ffccd1", borderRadius: 20, alignItems: "center", justifyContent: "center", marginHorizontal: 15}}>
                        <AntDesign name={'flag'} size={24} color={"#fc4e5f"} />
                    </View>

                    <View style={{flex: 1}}>
                        <Title style={{fontSize: 16}}>Active?</Title>
                        <Caption>This customer account is active.</Caption>
                    </View>

                    <Switch value={activeSwitch} onValueChange={onToggleActiveSwitch} />
                </View>
                <Divider />

                <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                   

                    <View style={{flex: 1}}>
                        
                        
                        <Button
  onPress={()=>{}}
  title="Delete"
  color="#ffccd1"
  accessibilityLabel="Delete this user from the list."
/>
                    </View>

                   
                </View>
            </ScrollView>

        </View>
    );
}

const mapStateToProps = (state) => {
    const { personals, booksData } = state
    return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        //all actions come here
        setCurrentBookData,
        setAllActiveBooks,
        setUser
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OneCustomerProfileScreen)
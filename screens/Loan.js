import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Entypo, FontAwesome5} from '@expo/vector-icons';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles/globalStyle';
import Header from '../navigation/shared/header';
import dbObject from '../components/database/db'
import * as lang from "../translations/lang.json"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LoanScreenTable from "../components/UI_components/LoanScreenEssencials/LoanScreenTable";
import {ActivityIndicator, Button, Caption, Chip, Searchbar, Subheading} from "react-native-paper";
import Colors from "../constants/Colors";
import {FabBtn} from "../components/UI_components/Buttons";
import {useIsFocused} from "@react-navigation/native";
import homeScreenSearch from "../components/Logic_Repository/searchLibrary/homeScreenSearch";
import loanScreenSearch from "../components/Logic_Repository/searchLibrary/loanScreenSearch";
import {FloatingAction} from "react-native-floating-action";
import {transactionTypes} from "../constants/Constansts";


function Loan(props) {

    const isFocused = useIsFocused()

    const {navigation} = props
    let lan = props.personals.currentLan

    const [mGiveSum, setGiveSum] = useState([])
    const [mTakeSum, setTakeSum] = useState([])
    const [loans, setLoans] = useState([])
    const [originalLoans, setOriginalLoans] = useState([])
    const [searchText, setSearchText] = useState("")
    const [loansLoadStatus, setLoansLoadStatus] = useState(false)

    const navigationOptions = {
        //To hide the NavigationBar from current Screen
        header: null
    };

    const fabRef = useRef(null)

    const fabActions = [
        {
            text: "Loan Given",
            icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
            name: "bt_loan_given",
            position: 1,
            color: "#303030"
        },
        {
            text: "Loan Taken",
            icon: <FontAwesome5 name={'money-check'} color={"#fff"}/>,
            name: "bt_loan_taken",
            position: 2,
            color: "#303030"
        }
    ];

    useEffect(() => {

        (async () => {

            try {
                setLoansLoadStatus(false)
                const res = await dbObject.getLoanNames(props.personals.currentBookData.id)
                console.log("loan data ", res)
                setLoans(res)
                setOriginalLoans(res)
                setLoansLoadStatus(true)
            } catch (e) {
                console.log(e)
            }
        })();

        return () => {
            setLoans([])
            setOriginalLoans([])
        }

    }, [isFocused]);

    const cardsData = [
        {
            title: "Loan Given",
            amount: 0
        },
        {
            title: "Loan Taken",
            amount: 0
        }
    ]


    return (

        <SafeAreaView style={[styles.wrapper, {paddingTop: 0, backgroundColor: "#ffffff"}]}>
            <Header navigation={navigation}/>

            <View style={{padding: 10, backgroundColor: "#fff"}}>
                <View style={{flexDirection: "row"}}>
                    {
                        cardsData.map((data, index) => (
                            <View style={{
                                flex: 1,
                                margin: 5,
                                elevation: 8,
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                backgroundColor: "#fff",
                                borderRadius: 5
                            }} key={index}>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        fontWeight: "bold",
                                        color: "#303030",
                                        fontFamily: "monospace"
                                    }}>{data.title}</Text>
                                    <Text
                                        style={index === 0 ? styles.giveAmountText : styles.takeAmountText}>₹{data.amount}</Text>
                                </View>
                                <Entypo name={"info-with-circle"} size={20}
                                        style={{position: "absolute", top: 0, right: 0, margin: 10}} color={"#303030"}/>
                            </View>
                        ))
                    }

                </View>

                <TouchableOpacity style={{
                     flexDirection: "row",
                     elevation: 8,
                     borderRadius: 5,
                     padding: 8,
                     backgroundColor: "#fff",
                     margin:2,
                     marginBottom:0,
                     alignItems: "center",
                     justifyContent: "center",
                }}

                                  onPress={() => {
                                      navigation.navigate('ViewReportScreenLoan')
                                  }}
                >
                    <AntDesign name={"folderopen"} size={20} style={{paddingHorizontal: 10}} color={Colors.primary}/>
                    <Subheading>View Report</Subheading>
                </TouchableOpacity>

            </View>

            <View style={{flex: 1, backgroundColor: "#f4f0ec", borderTopLeftRadius: 30, borderTopRightRadius: 30,}}>
                {/* <View style={[{
                    marginTop: 10,
                    marginHorizontal: 10,
                    elevation: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    borderRadius: 30,
                    paddingRight: 5,
                }]}> */}
                 <View style={[styles.searchFilter, {borderRadius: 30, elevation: 8, backgroundColor: "#fff"}]}>


                    {/* <Searchbar
                        style={{flex: 3, elevation: 0, borderRadius: 30}}
                        placeholder={lang[lan]['search']}
                        value={searchText}
                        onChangeText={text => SearchFilterFunction(text)}
                    /> */}
   <View style={{flex: 3,flexDirection: "column"}}>
          <Searchbar
          
            style={{flex: 3, elevation: 0,borderRadius: 30}}
            placeholder={ lang[lan]['search']}
            onChangeText={text => SearchFilterFunction(text)}
          />
            <Text style={[styles.countInfo,{fontSize: 8, fontWeight: "bold", color: "#78909c", fontFamily: "monospace", alignItems: "flex-start"}]}>no. of customers:0</Text>
</View>

                    <TouchableOpacity style={styles.shopOpen}>
                        <AntDesign style={styles.iSearchicon} name="filter" size={24} color="#4e54c8"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shopOpen}>
                        <AntDesign style={styles.iSearchicon} name="pdffile1" size={24} color="#4e54c8"/>
                    </TouchableOpacity>

                </View>

                <View style={{flex: 1, marginRight: 10}}>
                    {
                        loansLoadStatus ?
                            (
                                originalLoans.length > 0 ?
                                    (
                                        loans.length > 0 ?
                                            <LoanScreenTable
                                                mTakeSum={mTakeSum}
                                                lan={lan}
                                                navigation={navigation}
                                                data={loans}
                                            />
                                            :
                                            <View style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: 10
                                            }}>
                                                <Caption>No contacts found according to your search...</Caption>
                                            </View>
                                    )

                                    :

                                    <View
                                        style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                                        <Subheading style={{padding: 10, fontWeight: "bold"}}>Let's add your First Loan
                                            Detail...</Subheading>
                                        <Button
                                            icon="account-multiple-plus"
                                            mode="outlined"
                                            onPress={() => {
                                                fabRef.current.animateButton()
                                            }}
                                        >
                                            Add New
                                        </Button>
                                    </View>
                            )
                            :
                            (

                                <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}>
                                    <ActivityIndicator animating={true} color={Colors.warningText}/>
                                    <Caption>Loading your Customers. Please Wait...</Caption>
                                </View>
                            )

                    }
                </View>

            </View>

            <FloatingAction
                ref={fabRef}
                actions={fabActions}
                color={Colors.secondary}
                floatingIcon={<FontAwesome5 name={"money-check-alt"} size={22} color="#fff"/>}
                onPressItem={name => {
                    switch (name) {
                        case "bt_loan_given":
                            navigation.navigate('addLoanInputs', {transactionType: transactionTypes.LOAN_GIVEN})
                            break;
                        case "bt_loan_taken":
                            navigation.navigate('addLoanInputs', {transactionType: transactionTypes.LOAN_TAKEN})
                            break;
                    }
                }}
            />

        </SafeAreaView>

    );

    async function SearchFilterFunction(text) {
        //passing the inserted text in textInput
        try {
            setSearchText(text)
            if (text != null && text !== '') {
                const filteredContacts = await loanScreenSearch(originalLoans, text)
                setLoans(filteredContacts)
            } else {
                setLoans(originalLoans)
            }
        } catch (e) {

            Alert.alert(e)

        }

    }

    function gotoOneCustomerScreen(navigation, phone) {

        const bookid = '1'//make bookid dynamic
        dbObject.checkAndInsertContact(phone, bookid, record =>
            navigation.navigate('OneCustomerScreenLoan', {
                phoneNumber: phone
            })
        )

    }


}

const mapStateToProps = (state) => {
    const {personals, booksData} = state
    return {personals, booksData}
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        //all actions come here
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Loan)

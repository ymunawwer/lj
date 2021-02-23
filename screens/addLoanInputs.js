import React, {useRef, useState,useEffect} from 'react';
import {Picker, Text, TextInput, TouchableOpacity, View, Alert,StyleSheet} from 'react-native';
import {styles} from '../styles/globalStyle';
import DatePicker from 'react-native-datepicker';
import StepIndicator from 'react-native-step-indicator';
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ContactScreen from "./ContactScreen";
import RBSheet from "react-native-raw-bottom-sheet";
import AddNewCustomerScreen from "./AddNewCustomerScreen";
import {RoundedInput} from "../components/UI_components/Inputs";
import dbObject from '../components/database/db'
import Spinner from 'react-native-loading-spinner-overlay';
import storeObject from "../store/store";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {transactionTypes} from "../constants/Constansts";
import ExistingContactsChooser from "../components/UI_components/ExistingContactsChooser";
import MStepIndicator from "../components/UI_components/StepIndicator";



function addLoanInputs(props) {

  const {navigation, route} = props
    const {transactionType} = route.params
  
  const [date, setDate] = useState("2016-05-15")
  const [tabIndex, setTabIndex] = useState(0)
  const [chosenContact, setChosenContact] = useState({})
  const [loanName, setLoanName] = useState("")
  const [loaderVisibility, setLoaderVisibility] = useState(false)
  const [numberOfInstallment,setNumberOfInstallment]  = useState("")
  const [installmentValue,setInstallmentValue] = useState("")
  const [interestValue,setInterestValue] = useState("")
  const [interestRate,setInterestRate] = useState([ 'one', 'two', 'three', 'four', 'five' ])
  const [installmentAmount,setInstallmentAmount] = useState([ 'one', 'two', 'three', 'four', 'five' ])
  const [loanAmount,setLoanAmount] = useState("")
  const [period,setPeriod] = useState("")
  const [contacts,setContacts] = useState({})
  const [loanMode,setLoanMode] = useState("")
  // const bookId = storeObject.getCurrentBookData().id
 
  
  useEffect(() => {

  (async ()=>{
    const updatedContacts = await dbObject.getExistingContacts(props.personals.currentBookData.id);
    setContacts(updatedContacts)
    console.log('contacts',contacts)
    return updatedContacts

  })();
})
  
  // setInterestRate( [ 'one', 'two', 'three', 'four', 'five' ])
  // setInstallmentAmount( [ 'one', 'two', 'three', 'four', 'five' ])

  function checkLoanName(name){
    // console.log(props.personals.currentBookData.id)
    dbObject.checkLoanName(name, props.personals.currentBookData.id)
      .then(function(data){
        // console.log(data[0].name)
        try{
          if(data[0].name===name)
          {
            Alert.alert("Loan Name Exists")
          }else{

              saveHandler(chosenContact)
          }
        }catch(e){

            saveHandler(chosenContact)
        }
      })
  }


  const [selectedDate, setSelectedDate] = useState(null);
    
    var today = new Date();
    // setDate(today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear());
    // var calendarShow = false
    function onDateChange(date){
        setSelectedDate(date)
      }


  function saveHandler(item) {
      setLoaderVisibility(true)

      dbObject.addLoanName(loanName, item.name, item.phone, props.personals.currentBookData.id).then(function(res){
          setLoaderVisibility(false)

          /*navigation.navigate('OneCustomerScreenLoan', {
              phoneNumber: item.phone,
              name:item.name,
              loanName: loanName
          })*/

          if(transactionType === transactionTypes.LOAN_TAKEN) {
              navigation.navigate('YouGotScreenLoan', {contact: item.phone, loanName: route.params.loanName})
          }
          else if(transactionType === transactionTypes.LOAN_GIVEN) {
              navigation.navigate('YouGaveScreenLoan', {contact: item.phone, loanName: route.params.loanName})
          }
          else {
              console.log('chosen wrong transaction type.')
          }


      })

  }

  function renderTab2() {
    let interestRateItems = interestRate.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
  });

  let installmentAmountItems = installmentAmount.map( (s, i) => {
    return <Picker.Item key={i} value={s} label={s} />
});
    return (
      <View style={{flex: 1}}>
         <View >
              {/* <Text
              style={[{marginHorizontal: 2,borderColor:'#000',borderStyle:'solid'}]}
              
                  placeholder={'Customer Name'}
                  // onChangeText={text => setLoanName(text)}
              >
                {chosenContact?.name}

              </Text > */}
              <RoundedInput
                        // style={[{color: themeColor}]}
                        label="Customer Name"
                        
                        value= {chosenContact?.name}
                        
                    />
         
              <RoundedInput
              
              
                  label={"New Loan Name"}
                  placeholder={"New Loan Name"}
                  onChangeText={text => setLoanName(text)}
              />
          </View>



            <View style={{ flexDirection: 'row', margin: 8,justifyContent: 'flex-end',marginBottom:'12%' }}>
           
            <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  marginRight:8
                }}
                onPress={() => {
                  loanName===""?Alert.alert("Enter Loan Name"):checkLoanName(loanName)
                  
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10
                }}
                onPress={() => {
                  loanName===""?Alert.alert("Enter Loan Name"):checkLoanName(loanName)
                  
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>SAVE</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row',marginBottom: 8}}>
            <View style={{  borderColor: '#4e54c8',
       
        backgroundColor: 'white',
        fontSize: 12, marginLeft: 8, color: "#808080"}}>
              {/* <RoundedInput
                //  style={{width:'50%'}}
                //  inputStyle={{'width':'200%','marginLeft':20}}
                  label={"Date"}
                  placeholder={"Date"}
                  onChangeText={text => setLoanName(text)}
              /> */}
              <TouchableOpacity style={{borderWidth: .4}}>
                        <View style={[styles.row, {justifyContent: 'center', borderRadius: 8}]}>
                            <AntDesign name="calendar" size={20} />
                            <DatePicker
                                date={selectedDate}
                                mode="date"
                                placeholder="DATE"
                                format="YYYY-MM-DD"
                                minDate="2000-06-01"
                                maxDate={today}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none',
                                        visibility: 'hidden'
                                    },
                                    dateInput: {
                                        marginHorizontal: 0,
                                        border: 0,
                                        outline: 0,
                                        borderWidth: 0
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                // onDateChange={(date) => {
                                //     duedate = date
                                //     // Alert.alert(duedate)
                                //     setDate(duedate)
                                // }}
                                onDateChange={(date) => { setSelectedDate(date)  }}
                            />

                            {/* <AntDesign name="caretdown" size={10} color="red" /> */}
                        </View>
                    </TouchableOpacity>
              </View>
              <View style={{flex:1}}>
              <RoundedInput
                  label={"Mode"}
                  placeholder={"Mode"}
                  onChangeText={text => setLoanMode(text)}
                  
              /></View>
              <View style={{flex:1}}>
              <RoundedInput
                  label={"Period"}
                  placeholder={"Period"}
                  onChangeText={text => setPeriod(text)}
                  
              /></View>
          </View>
          <View style={{flexDirection: 'row' ,marginBottom: 8}}>
          <View style={{flex:1}}>
              <RoundedInput
               style={{width:'50%'}}
                  label={"Amount of Loan"}
                  placeholder={"New Loan Name"}
                  onChangeText={text => setLoanAmount(text)}
                  
              /></View>
              <View style={{flex:1}}>
              <RoundedInput
               style={{width:'50%'}}
                  label={"No. of installment"}
                  placeholder={"New Loan Name"}
                  onChangeText={text => setNumberOfInstallment(text)}
                  
              />
             </View>
          </View>
          <View style={{ flexDirection: 'row',marginBottom: 8}}>
          <View style={[stylesI.TextInput,{flex:1}]}>
          <Picker
                        style={[{height: 30}]}
                        placeholder={'Interest Rate'}
                        onValueChange={(itemValue, itemIndex) => setInterestValue(itemValue)}
                        
                        

                    >
                      <Picker.Item  value='' label={'Interest Rate'}  enabled={false} />
                      {interestRateItems}

                      {/* <Picker.Item label="Interest Rate" value=""/>
                        <Picker.Item label="Owner" value="owner"/>
                        <Picker.Item label="Partner" value="partner"/>
                        <Picker.Item label="Proprietor" value="proprietor"/> */}

                    </Picker>
          {/* <RoundedInput style={{width:50}}
                  label={"Interest Rate"}
                  placeholder={"New Loan Name"}
                  onChangeText={text => setLoanName(text)}
              /> */}
              </View>
              <View style={[stylesI.TextInput,{flex:1}]}>
              <Picker
                        style={[{height: 30}]}
                        placeholder={'Instalment Amount'}
                        onValueChange={(itemValue, itemIndex) => setInstallmentValue(itemValue)}
                    >
                      <Picker.Item  value='' label={'Instalment Amount'} disabled/>
                      {/* <Picker.Item label="Instalment Amount" value=""/>
                        <Picker.Item label="Owner" value="owner"/>
                        <Picker.Item label="Partner" value="partner"/>
                        <Picker.Item label="Proprietor" value="proprietor"/> */}

{installmentAmountItems}

                    </Picker>
              {/* <RoundedInput
                  label={"Instalment Amount"}
                  placeholder={"New Loan Name"}
                  onChangeText={text => setLoanName(text)}
              /> */}
              </View>
          
           
          </View>
          <View style={{ flexDirection: 'row',marginBottom: 8 }}>
          <View style={{flex:1}}>
          <RoundedInput
                  label={"Remark"}
                  placeholder={"Remark"}
                  onChangeText={text => setLoanName(text)}
              /></View>
</View>


          <View style={[styles.footer,{ flex:1,flexDirection: 'row', margin: 8,bottom:2 ,justifyContent: 'flex-end'}]}>
            
          {/* <View style={{flex:1,flexDirection: 'row',alignItems: 'flex-end'}}> */}
        
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  height: 50,
                  width:60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  
                }}
                onPress={() => {
                  loanName===""?Alert.alert("Enter Loan Name"):checkLoanName(loanName)
                  
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Next</Text>
              </TouchableOpacity>
              {/* </View> */}
          </View>
 
          </View>

    );
  }


  function renderTab1() {
    return(

          <ExistingContactsChooser onPressContact={(item) => {
              setChosenContact(item)
              setTabIndex(1)

          }} data = {contacts} />
    );
  }


  return (

       
    

    <View style={{backgroundColor: 'white', flex: 1, paddingTop: 10}}>

     <Spinner
          visible={loaderVisibility}
          textContent={'Creating Loan...'}
          textStyle={styles.spinnerTextStyle}
        />

        <MStepIndicator
            currentPosition={tabIndex}
            labels={["Select Customer", "Loan Details"]}
            stepCount={2}
            /*renderStepIndicator={({position, stepStatus}) => {
                switch(position) {
                    case 0:
                        return <AntDesign name={"profile"} color={stepStatus === 'finished' ? '#ffffff' : Colors.primary} size={15} />
                    case 1:
                        return <AntDesign name={"contacts"} color={stepStatus === 'finished' ? '#ffffff' : Colors.primary} size={15}/>
                }
            }}*/

        />

      {tabIndex === 0 ?
        renderTab1()
        :
        renderTab2()
      }

    </View>
  )


}

const stylesI = StyleSheet.create({

  TextInput: {

     
      padding: 6,
      paddingBottom:15,
      paddingTop:15,
      borderWidth: .5,
      borderColor: '#333',
      
      borderRadius: 6, 
      marginHorizontal: 10
  },
  Picker: {

      // marginVertical:15,
      // padding:15,
      // borderWidth:.5,
      // borderColor:'#333',
      // borderRadius:6
  }


});

const mapStateToProps = (state) => {
  const {personals, booksData} = state
  return {personals, booksData}
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(addLoanInputs)

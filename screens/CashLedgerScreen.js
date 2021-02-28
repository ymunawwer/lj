import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native";
import CashLedgerTable from "../components/UI_components/Others/cashLedgerTable";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import dbObject from '../components/database/db'


function CashLedgerScreen(props) {

  const { navigation } = props
  let lan = props.personals.currentLan
  const [cashRecord, setCashRecord] = useState("");
  


  useEffect(() => {
        (async () => {
            try {
              const res = await dbObject.getCashTransactions(props.personals.currentBookData.id)
              // console.log('ledger',res)
                  // console.log("cash", res)
                  let cashIn = res.rows['_array'].reduce((sum,item)=>{
                    console.log('sum',JSON.stringify(sum))
                    return (sum+item.amount)

                  },0)

                  let cashOut = res.rows['_array'].reduce((sum,item)=>{
                    console.log('sum',JSON.stringify(sum))
                    return (sum+item.amount)

                  },0)
                  console.log('ledger',res.rows);
                  res.rows['total']={
                    'cashInTotal':cashIn,
                    'cashOutTotal':cashOut
                  }
                  console.log('total',res.rows)
                  setCashRecord(res.rows)

            }
            catch (e) {


            }
        })();
    }, []);


  return (

    <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
    <CashLedgerTable
      lan={lan}
      navigation={navigation}
      data={cashRecord}
    />
</SafeAreaView>
  );

}
// data={[{date: "23 sept 2020", cashIn: "10", cashOut: "10", particulars: "I took and gave 10 rupees same day"}]}


const mapStateToProps = (state) => {
  const { personals, booksData } = state
  return { personals, booksData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    //all actions come here
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CashLedgerScreen)

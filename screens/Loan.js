import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity,StyleSheet, View} from 'react-native';
import {AntDesign, Entypo, FontAwesome5} from '@expo/vector-icons';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles/globalStyle';
import Header from '../navigation/shared/header';
import dbObject from '../components/database/db' 
import * as lang from "../translations/lang.json"
import RBSheet from "react-native-raw-bottom-sheet";
import RadioButtonRN from "radio-buttons-react-native";
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
import * as Print from 'expo-print';
import * as Permissions from 'expo-permissions';
import Modal from '../components/UI_components/Homescreen_essencials/Modal';

import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'


function Loan(props) {

    const isFocused = useIsFocused()

    const {navigation} = props
    let lan = props.personals.currentLan

    const [mGiveSum, setGiveSum] = useState([])
    const [mTakeSum, setTakeSum] = useState([])
    const [loans, setLoans] = useState([])
    const [originalLoans, setOriginalLoans] = useState([])
    const [searchText, setSearchText] = useState("")
    const [isModalVisible, setModalVisibility] = useState(false)
    const [filterSelection, setFilterSelection] = useState('A')
    const [sortingSelection, setSortingSelection] = useState('Most Recent')
    const [loansLoadStatus, setLoansLoadStatus] = useState(false)
    const refRBSheet = useRef();
    const [mCustomerCount, setmCustomerCount] = useState(null)
    const [sumOfTakesLoan,setSumOfTakesLoan] = useState('')
    const [sumOfGavesLoan,setSumOfGavesLoan] = useState('')
    const [modalData,setModalData] = useState([])
    
    
    const sortingData = [
        {
          label: 'Most Recent'
        },
        {
          label: 'Highest Amount'
        },
        {
          label: 'By Name(A-Z)'
        },
        {
          label: 'Oldest'
        },
        {
          label: 'Least Amount'
        }
      ];
    

    const navigationOptions = {
        //To hide the NavigationBar from current Screen
        header: null
    };

    async function getModalData(key){
      let data 
      switch(key){
        case 'GIVEN':
           data = await dbObject.getGavesLoanContact(props.personals.currentBookData.id)
          // console.log('test data',data['_array'])
          setModalData(data['_array'])
          setModalVisibility(true );
          break;
        case 'TAKEN':
           data =await dbObject.getTakesLoanContact(props.personals.currentBookData.id)
          //  console.log('test data',data['_array'])
          setModalData(data['_array'])
          setModalVisibility(true );
          break;

      }
      
      
    }

    hideModal = () =>{ setModalVisibility(false);
      // setRecord(null)
    }
  showModal = (index) => {
    
   console.log(index)
    index===0?getModalData('GIVEN'):getModalData('TAKEN');


    
    
    
    // console.log(isGive)
    
  };

    
  function getPickerInitial() {
    if (sortingSelection === 'Most Recent') {
      return 1
    } else if (sortingSelection === 'Highest Amount') {
      return 2
    } else if (sortingSelection === 'By Name(A-Z)') {
      return 3
    } else if (sortingSelection === 'Oldest') {
      return 4
    } else if (sortingSelection === 'Least Amount') {
      return 5
    }
  }

    // download share
    const Prints = 
    `<style>/* -- import Roboto Font ---------------------------- */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 100;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzQdKg.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 300;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc-CsE.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 400;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xMIzc.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 500;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc-CsE.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 700;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic-CsE.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 900;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc-CsE.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 100;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxMIzc.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 300;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fABc9.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxP.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fABc9.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfABc9.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 900;
      src: url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfABc9.ttf) format('truetype');
    }
    /* -- You can use this tables in Bootstrap (v3) projects. -- */
    /* -- Box model ------------------------------- */
    *,
    *:after,
    *:before {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    /* -- Demo style ------------------------------- */
    html,
    body {
      position: relative;
      min-height: 100%;
      height: 100%;
    }
    html {
      position: relative;
      overflow-x: hidden;
      margin: 16px;
      padding: 0;
      min-height: 100%;
      font-size: 62.5%;
    }
    body {
      font-family: "RobotoDraft", "Roboto", "Helvetica Neue, Helvetica, Arial", sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 1.4rem;
      line-height: 2rem;
      letter-spacing: 0.01rem;
      color: #212121;
      background-color: #f5f5f5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    #demo {
      margin: 20px auto;
      max-width: 960px;
    }
    #demo h1 {
      font-size: 2.4rem;
      line-height: 3.2rem;
      letter-spacing: 0;
      font-weight: 300;
      color: #212121;
      text-transform: inherit;
      margin-bottom: 1rem;
      text-align: center;
    }
    #demo h2 {
      font-size: 1.5rem;
      line-height: 2.8rem;
      letter-spacing: 0.01rem;
      font-weight: 400;
      color: #212121;
      text-align: center;
    }
    .shadow-z-1 {
      -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
      -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    }
    /* -- Material Design Table style -------------- */
    .table {
      width: 100%;
      max-width: 100%;
      margin-bottom: 2rem;
      background-color: #fff;
    }
    .table > thead > tr,
    .table > tbody > tr,
    .table > tfoot > tr {
      -webkit-transition: all 0.3s ease;
      -o-transition: all 0.3s ease;
      transition: all 0.3s ease;
    }
    .table > thead > tr > th,
    .table > tbody > tr > th,
    .table > tfoot > tr > th,
    .table > thead > tr > td,
    .table > tbody > tr > td,
    .table > tfoot > tr > td {
      text-align: left;
      padding: 1.6rem;
      vertical-align: top;
      border-top: 0;
      -webkit-transition: all 0.3s ease;
      -o-transition: all 0.3s ease;
      transition: all 0.3s ease;
    }
    .table > thead > tr > th {
      font-weight: 400;
      color: #757575;
      vertical-align: bottom;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    .table > caption + thead > tr:first-child > th,
    .table > colgroup + thead > tr:first-child > th,
    .table > thead:first-child > tr:first-child > th,
    .table > caption + thead > tr:first-child > td,
    .table > colgroup + thead > tr:first-child > td,
    .table > thead:first-child > tr:first-child > td {
      border-top: 0;
    }
    .table > tbody + tbody {
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
    .table .table {
      background-color: #fff;
    }
    .table .no-border {
      border: 0;
    }
    .table-condensed > thead > tr > th,
    .table-condensed > tbody > tr > th,
    .table-condensed > tfoot > tr > th,
    .table-condensed > thead > tr > td,
    .table-condensed > tbody > tr > td,
    .table-condensed > tfoot > tr > td {
      padding: 0.8rem;
    }
    .table-bordered {
      border: 0;
    }
    .table-bordered > thead > tr > th,
    .table-bordered > tbody > tr > th,
    .table-bordered > tfoot > tr > th,
    .table-bordered > thead > tr > td,
    .table-bordered > tbody > tr > td,
    .table-bordered > tfoot > tr > td {
      border: 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .table-bordered > thead > tr > th,
    .table-bordered > thead > tr > td {
      border-bottom-width: 2px;
    }
    .table-striped > tbody > tr:nth-child(odd) > td,
    .table-striped > tbody > tr:nth-child(odd) > th {
      background-color: #f5f5f5;
    }
    .table-hover > tbody > tr:hover > td,
    .table-hover > tbody > tr:hover > th {
      background-color: rgba(0, 0, 0, 0.12);
    }
    @media screen and (max-width: 768px) {
      .table-responsive-vertical > .table {
        margin-bottom: 0;
        background-color: transparent;
      }
      .table-responsive-vertical > .table > thead,
      .table-responsive-vertical > .table > tfoot {
        display: none;
      }
      .table-responsive-vertical > .table > tbody {
        display: block;
      }
      .table-responsive-vertical > .table > tbody > tr {
        display: block;
        border: 1px solid #e0e0e0;
        border-radius: 2px;
        margin-bottom: 1.6rem;
      }
      .table-responsive-vertical > .table > tbody > tr > td {
        background-color: #fff;
        display: block;
        vertical-align: middle;
        text-align: right;
      }
      .table-responsive-vertical > .table > tbody > tr > td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: inherit;
        font-weight: 400;
        color: #757575;
      }
      .table-responsive-vertical.shadow-z-1 {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }
      .table-responsive-vertical.shadow-z-1 > .table > tbody > tr {
        border: none;
        -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
        -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
      }
      .table-responsive-vertical > .table-bordered {
        border: 0;
      }
      .table-responsive-vertical > .table-bordered > tbody > tr > td {
        border: 0;
        border-bottom: 1px solid #e0e0e0;
      }
      .table-responsive-vertical > .table-bordered > tbody > tr > td:last-child {
        border-bottom: 0;
      }
      .table-responsive-vertical > .table-striped > tbody > tr > td,
      .table-responsive-vertical > .table-striped > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical > .table-striped > tbody > tr > td:nth-child(odd) {
        background-color: #f5f5f5;
      }
      .table-responsive-vertical > .table-hover > tbody > tr:hover > td,
      .table-responsive-vertical > .table-hover > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical > .table-hover > tbody > tr > td:hover {
        background-color: rgba(0, 0, 0, 0.12);
      }
    }
    .table-striped.table-mc-red > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-red > tbody > tr:nth-child(odd) > th {
      background-color: #fde0dc;
    }
    .table-hover.table-mc-red > tbody > tr:hover > td,
    .table-hover.table-mc-red > tbody > tr:hover > th {
      background-color: #f9bdbb;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-red > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-red > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-red > tbody > tr > td:nth-child(odd) {
        background-color: #fde0dc;
      }
      .table-responsive-vertical .table-hover.table-mc-red > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-red > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-red > tbody > tr > td:hover {
        background-color: #f9bdbb;
      }
    }
    .table-striped.table-mc-pink > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-pink > tbody > tr:nth-child(odd) > th {
      background-color: #fce4ec;
    }
    .table-hover.table-mc-pink > tbody > tr:hover > td,
    .table-hover.table-mc-pink > tbody > tr:hover > th {
      background-color: #f8bbd0;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr > td:nth-child(odd) {
        background-color: #fce4ec;
      }
      .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr > td:hover {
        background-color: #f8bbd0;
      }
    }
    .table-striped.table-mc-purple > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-purple > tbody > tr:nth-child(odd) > th {
      background-color: #f3e5f5;
    }
    .table-hover.table-mc-purple > tbody > tr:hover > td,
    .table-hover.table-mc-purple > tbody > tr:hover > th {
      background-color: #e1bee7;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr > td:nth-child(odd) {
        background-color: #f3e5f5;
      }
      .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr > td:hover {
        background-color: #e1bee7;
      }
    }
    .table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) > th {
      background-color: #ede7f6;
    }
    .table-hover.table-mc-deep-purple > tbody > tr:hover > td,
    .table-hover.table-mc-deep-purple > tbody > tr:hover > th {
      background-color: #d1c4e9;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr > td:nth-child(odd) {
        background-color: #ede7f6;
      }
      .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr > td:hover {
        background-color: #d1c4e9;
      }
    }
    .table-striped.table-mc-indigo > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-indigo > tbody > tr:nth-child(odd) > th {
      background-color: #e8eaf6;
    }
    .table-hover.table-mc-indigo > tbody > tr:hover > td,
    .table-hover.table-mc-indigo > tbody > tr:hover > th {
      background-color: #c5cae9;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr > td:nth-child(odd) {
        background-color: #e8eaf6;
      }
      .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr > td:hover {
        background-color: #c5cae9;
      }
    }
    .table-striped.table-mc-blue > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-blue > tbody > tr:nth-child(odd) > th {
      background-color: #e7e9fd;
    }
    .table-hover.table-mc-blue > tbody > tr:hover > td,
    .table-hover.table-mc-blue > tbody > tr:hover > th {
      background-color: #d0d9ff;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr > td:nth-child(odd) {
        background-color: #e7e9fd;
      }
      .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr > td:hover {
        background-color: #d0d9ff;
      }
    }
    .table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) > th {
      background-color: #e1f5fe;
    }
    .table-hover.table-mc-light-blue > tbody > tr:hover > td,
    .table-hover.table-mc-light-blue > tbody > tr:hover > th {
      background-color: #b3e5fc;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr > td:nth-child(odd) {
        background-color: #e1f5fe;
      }
      .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr > td:hover {
        background-color: #b3e5fc;
      }
    }
    .table-striped.table-mc-cyan > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-cyan > tbody > tr:nth-child(odd) > th {
      background-color: #e0f7fa;
    }
    .table-hover.table-mc-cyan > tbody > tr:hover > td,
    .table-hover.table-mc-cyan > tbody > tr:hover > th {
      background-color: #b2ebf2;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr > td:nth-child(odd) {
        background-color: #e0f7fa;
      }
      .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr > td:hover {
        background-color: #b2ebf2;
      }
    }
    .table-striped.table-mc-teal > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-teal > tbody > tr:nth-child(odd) > th {
      background-color: #e0f2f1;
    }
    .table-hover.table-mc-teal > tbody > tr:hover > td,
    .table-hover.table-mc-teal > tbody > tr:hover > th {
      background-color: #b2dfdb;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr > td:nth-child(odd) {
        background-color: #e0f2f1;
      }
      .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr > td:hover {
        background-color: #b2dfdb;
      }
    }
    .table-striped.table-mc-green > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-green > tbody > tr:nth-child(odd) > th {
      background-color: #d0f8ce;
    }
    .table-hover.table-mc-green > tbody > tr:hover > td,
    .table-hover.table-mc-green > tbody > tr:hover > th {
      background-color: #a3e9a4;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-green > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-green > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-green > tbody > tr > td:nth-child(odd) {
        background-color: #d0f8ce;
      }
      .table-responsive-vertical .table-hover.table-mc-green > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-green > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-green > tbody > tr > td:hover {
        background-color: #a3e9a4;
      }
    }
    .table-striped.table-mc-light-green > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-light-green > tbody > tr:nth-child(odd) > th {
      background-color: #f1f8e9;
    }
    .table-hover.table-mc-light-green > tbody > tr:hover > td,
    .table-hover.table-mc-light-green > tbody > tr:hover > th {
      background-color: #dcedc8;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr > td:nth-child(odd) {
        background-color: #f1f8e9;
      }
      .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr > td:hover {
        background-color: #dcedc8;
      }
    }
    .table-striped.table-mc-lime > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-lime > tbody > tr:nth-child(odd) > th {
      background-color: #f9fbe7;
    }
    .table-hover.table-mc-lime > tbody > tr:hover > td,
    .table-hover.table-mc-lime > tbody > tr:hover > th {
      background-color: #f0f4c3;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr > td:nth-child(odd) {
        background-color: #f9fbe7;
      }
      .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr > td:hover {
        background-color: #f0f4c3;
      }
    }
    .table-striped.table-mc-yellow > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-yellow > tbody > tr:nth-child(odd) > th {
      background-color: #fffde7;
    }
    .table-hover.table-mc-yellow > tbody > tr:hover > td,
    .table-hover.table-mc-yellow > tbody > tr:hover > th {
      background-color: #fff9c4;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr > td:nth-child(odd) {
        background-color: #fffde7;
      }
      .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr > td:hover {
        background-color: #fff9c4;
      }
    }
    .table-striped.table-mc-amber > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-amber > tbody > tr:nth-child(odd) > th {
      background-color: #fff8e1;
    }
    .table-hover.table-mc-amber > tbody > tr:hover > td,
    .table-hover.table-mc-amber > tbody > tr:hover > th {
      background-color: #ffecb3;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr > td:nth-child(odd) {
        background-color: #fff8e1;
      }
      .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr > td:hover {
        background-color: #ffecb3;
      }
    }
    .table-striped.table-mc-orange > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-orange > tbody > tr:nth-child(odd) > th {
      background-color: #fff3e0;
    }
    .table-hover.table-mc-orange > tbody > tr:hover > td,
    .table-hover.table-mc-orange > tbody > tr:hover > th {
      background-color: #ffe0b2;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr > td:nth-child(odd) {
        background-color: #fff3e0;
      }
      .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr > td:hover {
        background-color: #ffe0b2;
      }
    }
    .table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) > td,
    .table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) > th {
      background-color: #fbe9e7;
    }
    .table-hover.table-mc-deep-orange > tbody > tr:hover > td,
    .table-hover.table-mc-deep-orange > tbody > tr:hover > th {
      background-color: #ffccbc;
    }
    @media screen and (max-width: 767px) {
      .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr > td,
      .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) {
        background-color: #fff;
      }
      .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr > td:nth-child(odd) {
        background-color: #fbe9e7;
      }
      .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr:hover > td,
      .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr:hover {
        background-color: #fff;
      }
      .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr > td:hover {
        background-color: #ffccbc;
      }
    }</style>

    <div id="demo">
  <h1>Material Design Responsive Table</h1>
  <h2>Table of my other Material Design works (list was updated 08.2015)</h2>
  
  <!-- Responsive table starts here -->
  <!-- For correct display on small screens you must add 'data-title' to each 'td' in your table -->
  <div class="table-responsive-vertical shadow-z-1">
  <!-- Table starts here -->
  <table id="table" class="table table-hover table-mc-light-blue">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Link</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-title="ID">1</td>
          <td data-title="Name">Material Design Color Palette</td>
          <td data-title="Link">
            <a href="https://github.com/zavoloklom/material-design-color-palette" target="_blank">GitHub</a>
          </td>
          <td data-title="Status">Completed</td>
        </tr>
        <tr>
          <td data-title="ID">2</td>
          <td data-title="Name">Material Design Iconic Font</td>
          <td data-title="Link">
            <a href="https://codepen.io/zavoloklom/pen/uqCsB" target="_blank">Codepen</a>
            <a href="https://github.com/zavoloklom/material-design-iconic-font" target="_blank">GitHub</a>
          </td>
          <td data-title="Status">Completed</td>
        </tr>
        <tr>
          <td data-title="ID">3</td>
          <td data-title="Name">Material Design Hierarchical Display</td>
          <td data-title="Link">
            <a href="https://codepen.io/zavoloklom/pen/eNaEBM" target="_blank">Codepen</a>
            <a href="https://github.com/zavoloklom/material-design-hierarchical-display" target="_blank">GitHub</a>
          </td>
          <td data-title="Status">Completed</td>
        </tr>
        <tr>
          <td data-title="ID">4</td>
          <td data-title="Name">Material Design Sidebar</td>
          <td data-title="Link"><a href="https://codepen.io/zavoloklom/pen/dIgco" target="_blank">Codepen</a></td>
          <td data-title="Status">Completed</td>
        </tr>
        <tr>
          <td data-title="ID">5</td>
          <td data-title="Name">Material Design Tiles</td>
          <td data-title="Link">
            <a href="https://codepen.io/zavoloklom/pen/wtApI" target="_blank">Codepen</a>
          </td>
          <td data-title="Status">Completed</td>
        </tr>
        <tr>
          <td data-title="ID">6</td>
          <td data-title="Name">Material Design Typography</td>
          <td data-title="Link">
            <a href="https://codepen.io/zavoloklom/pen/IkaFL" target="_blank">Codepen</a>
            <a href="https://github.com/zavoloklom/material-design-typography" target="_blank">GitHub</a>
          </td>
          <td data-title="Status">Completed</td>
        </tr>
        <tr>
          <td data-title="ID">7</td>
          <td data-title="Name">Material Design Buttons</td>
          <td data-title="Link">
            <a href="https://codepen.io/zavoloklom/pen/Gubja" target="_blank">Codepen</a>
          </td>
          <td data-title="Status">In progress</td>
        </tr>
        <tr>
          <td data-title="ID">8</td>
          <td data-title="Name">Material Design Form Elements</td>
          <td data-title="Link">
            <a href="https://codepen.io/zavoloklom/pen/yaozl" target="_blank">Codepen</a>
          </td>
          <td data-title="Status">In progress</td>
        </tr>
        <tr>
          <td data-title="ID">9</td>
          <td data-title="Name">Material Design Email Template</td>
          <td data-title="Link">
            <a href="https://codepen.io/zavoloklom/pen/qEVqzx" target="_blank">Codepen</a>
          </td>
          <td data-title="Status">Completed</td>
        </tr>
        <tr>
          <td data-title="ID">10</td>
          <td data-title="Name">Material Design Animation Timing (old one)</td>
          <td data-title="Link">
            <a href="https://codepen.io/zavoloklom/pen/Jbrho" target="_blank">Codepen</a>
          </td>
          <td data-title="Status">Completed</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- Table Constructor change table classes, you don't need it in your project -->
  <div style="width: 45%; display: inline-block; vertical-align: top">
  <h2>LEKHA JOKHA</h2>
  <p>
    <label for="table-bordered">Style: bordered</label>
    <select id="table-bordered" name="table-bordered">
      <option selected value="">No</option>
      <option value="table-bordered">Yes</option>
    </select>
  </p>
  <p>
    <label for="table-striped">Style: striped</label>
    <select id="table-striped" name="table-striped">
      <option selected value="">No</option>
      <option value="table-striped">Yes</option>
    </select>
  </p>
  <p>
    <label for="table-hover">Style: hover</label>
    <select id="table-hover" name="table-hover">
      <option value="">No</option>
      <option selected value="table-hover">Yes</option>
    </select>
  </p>
  <p>
    <label for="table-color">Style: color</label>
    <select id="table-color" name="table-color">
      <option value="">Default</option>
      <option value="table-mc-red">Red</option>
      <option value="table-mc-pink">Pink</option>
      <option value="table-mc-purple">Purple</option>
      <option value="table-mc-deep-purple">Deep Purple</option>
      <option value="table-mc-indigo">Indigo</option>
      <option value="table-mc-blue">Blue</option>
      <option selected value="table-mc-light-blue">Light Blue</option>
      <option value="table-mc-cyan">Cyan</option>
      <option value="table-mc-teal">Teal</option>
      <option value="table-mc-green">Green</option>
      <option value="table-mc-light-green">Light Green</option>
      <option value="table-mc-lime">Lime</option>
      <option value="table-mc-yellow">Yellow</option>
      <option value="table-mc-amber">Amber</option>
      <option value="table-mc-orange">Orange</option>
      <option value="table-mc-deep-orange">Deep Orange</option>
    </select>
  </p>  
  </div>
  <div style="width: 45%; display: inline-block; vertical-align: top; margin-left: 30px;">
    <h2>Description</h2>
    <p>Tested on Win8.1 with browsers: Chrome 37, Firefox 32, Opera 25, IE 11, Safari 5.1.7</p>
    <p>You can use this table in Bootstrap (v3) projects. Material Design Responsive Table CSS-style will override basic bootstrap style.</p>
    <p class="mdt-subhead-2"><strong>Donate:</strong> You can support me via <a class="paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=s%2ekupletsky%40gmail%2ecom&amp;lc=US&amp;item_name=Material%20Design%20Responsive%20Table&amp;currency_code=USD&amp;bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted">PayPal</a>, <a class="webmoney" href="https://funding.webmoney.ru/material-design-iconic-font/donate">WebMoney</a> or <a class="gratipay" href="http://gratipay.com/zavoloklom/" target="_blank">Gratipay</a></p>
  </div>
</div>`

const sharePdf = (url) => {
    Sharing.shareAsync(url)
}
    
      
      
      const print = async (html) => {
        try {
          const { uri } = await Print.printToFileAsync({ 'html':html });
          
          if (Platform.OS === "ios") {
            await Sharing.shareAsync(uri);
            return uri;
          } else {
            const permission = await MediaLibrary.requestPermissionsAsync();      if (permission.granted) {
            //     const asset =await MediaLibrary.createAssetAsync(uri);
            //   alert(console.log(asset))
            //   return uri;
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "_"
                + (currentdate.getMonth()+1)  + "_" 
                + currentdate.getFullYear() + "-"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            const pdfName = `${uri.slice(
                0,
                uri.lastIndexOf('/') + 1
            )}Report_${datetime}.pdf`
    
            await FileSystem.moveAsync({
                from: uri,
                to: pdfName,
            })
            sharePdf(pdfName)
        }
    
       
          }  } catch (error) {
          console.error(error);
        }
      };

    // end
    const fabRef = useRef(null)

     // customer count
  const getCustomerCount = async (book_id) => {
   

    const record = await dbObject.getCustomerCount(book_id)
  console.log("View Report record outside if ", record[0]["COUNT(*)"])

  setmCustomerCount(record[0]["COUNT(*)"]?record[0]["COUNT(*)"]:0);
  

}

// customer count end

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

        
          getCustomerCount(props.personals.currentBookData.id);

            try {
                setLoansLoadStatus(false)
                setSumOfTakesLoan(dbObject.getSumOfTakesLoanContact(props.personals.currentBookData.id))
                setSumOfGavesLoan(dbObject.getSumOfGavesLoanContact(props.personals.currentBookData.id))
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
            amount: sumOfGavesLoan['_W']
        },
        {
            title: "Loan Taken",
            amount: sumOfTakesLoan['_W']
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
                                        style={{position: "absolute", top: 0, right: 0, margin: 10}} color={"#303030"} onPress={showModal.bind(this,index)}/>
                            </View>
                        ))
                    }

                </View>

                {
           (modalData != null && modalData.length > 0) ?

           (
            modalData.length > 0?
        <Modal
          visible={isModalVisible}
          dismiss={hideModal}
          mRecord ={modalData}
          headerItem={[
            "Customer Details",
            'isGive'==='give'?'Got / Payable':'Gave / Receivable',
           
            
          ]}
          // tableData = {tableData}
          // mTakeSum={tableData['sumArray']}
          //         lan={lan}
          //         navigation={navigation}
          //         data={mContacts}
        ></Modal>
      
        :
        <Caption>No contacts found according to your search...</Caption>
           ):
           <Caption>No contacts found according to your search...</Caption>

}

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
            <Text style={[styles.countInfo,{fontSize: 8, fontWeight: "bold", color: "#78909c", fontFamily: "monospace", alignItems: "flex-start"}]}>no. of customers: {mCustomerCount}</Text>
</View>

                    <TouchableOpacity style={styles.shopOpen} onPress={() => refRBSheet.current.open()}>
                        <AntDesign style={styles.iSearchicon} name="filter" size={24} color="#4e54c8"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shopOpen}  onPress={()=>{print(Prints)}}>
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
               <RBSheet
        ref={refRBSheet}

        closeOnDragDown={true}
        closeOnPressMask={true}
        height={510}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.5)",

          },
          draggableIcon: {
            backgroundColor: "#4e54c8"
          },
          container: {
            backgroundColor: "#f1f2f3",
            paddingHorizontal: 10
          }
        }}
      >

        <Text style={[styles.normalText]}>Filter by</Text>

        <View style={[styles.row, {
          justifyContent: 'flex-start',
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
          marginBottom: 12
        }]}>
          <TouchableOpacity style={[styleI.filterBtn, {backgroundColor: filterSelection === 'A' ? "#4e54c8" : 'white'}]}
                            onPress={() => setFilterSelection('A')}>
            <Text style={[{color: filterSelection === 'A' ? 'white' : 'grey'}]}>ALL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styleI.filterBtn, {backgroundColor: filterSelection === 'R' ? "#4e54c8" : 'white'}]}
                            onPress={() => setFilterSelection('R')}>
            <Text style={[{color: filterSelection === 'R' ? 'white' : 'grey'}]}>Receivables</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styleI.filterBtn, {backgroundColor: filterSelection === 'P' ? "#4e54c8" : 'white'}]}
                            onPress={() => setFilterSelection('P')}>
            <Text style={[{color: filterSelection === 'P' ? 'white' : 'grey'}]}>Payables</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styleI.filterBtn, {backgroundColor: filterSelection === 'S' ? "#4e54c8" : 'white'}]}
                            onPress={() => setFilterSelection('S')}>
            <Text style={[{color: filterSelection === 'S' ? 'white' : 'grey'}]}>Settled</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.normalText, {marginBottom: 5}]}>Sort by</Text>


        <View style={[styles.container, {padding: 5, backgroundColor: 'white', borderRadius: 5}]}>
          <RadioButtonRN
            data={sortingData}
            selectedBtn={(e) => setSortingSelection(e.label)}
            activeColor={'#4e54c8'}
            circleSize={10}
            initial={getPickerInitial()}
          />
        </View>

        <View style={{
          position: 'absolute',
          left: '3%',
          bottom: '1%',
          width: '100%',
          height: 50,
          backgroundColor: "#4e54c8",
          borderRadius: 6,
          paddingHorizontal: 0
        }}>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'center', height: 50, justifyContent: 'center'}}
            onPress={() => handleSortingAndFilter()}
          >
            <Text style={{color: 'white'}}>VIEW RESULT</Text>
          </TouchableOpacity>
        </View>

      </RBSheet>


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
const styleI = StyleSheet.create({

    modalView: {
      margin: 20,
      flex: 1,
      backgroundColor: "white",
      borderRadius: 2,
      //   padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    oneLangCont: {
      elevation: 5,
      width: 160,
      justifyContent: 'flex-start',
      borderRadius: 6
    },
  
    filterBtn: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 6,
      marginRight: 10,
      backgroundColor: 'white',
      elevation: 2
    },
    active: {
      backgroundColor: "#4e54c8"
    },
  
    searchBar: {
      backgroundColor: "#FFFFF0",
      borderRadius: 25,
      paddingHorizontal: 5,
      paddingVertical: 10,
      alignItems: "center",
      elevation: 5
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Loan)

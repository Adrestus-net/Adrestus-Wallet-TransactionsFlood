import React, { useEffect, useRef, useState} from 'react';
import Mnemonic from './bundle/MnemonicBundle.js'
import Keypair from './bundle/KeypairBundle.js';
import WalletAddress from './bundle/WalletAddressBundle.js';
import HashFunction from './bundle/HashFunctionBundle.js'
import ECDSASignature from './bundle/ECDSASignatureBundle'
import UtilBase64 from './bundle/UtilBase64Bundle.js'
import TransactionModel from "./model/TransactionModel";
import DateUtil from "./util/DateUtil";
import Util from "./crypto/Util";
const App = () => {
  const [count, setCount] = useState(0);
  const mnemonic="sample sail jungle learn general promote task puppy own conduct green affair";
  const passphrase = "12345678";
  const keys = useRef(null);
  const hash = useRef(new window.HashFunction());
  const sign = useRef(new window.ECDSASignature());
  const enc = useRef(new window.UtilBase64());

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
        let wallet = new window.WalletAddress();
        let mnem = new window.Mnemonic(128);
        let seed = mnem.createSeed(mnemonic, passphrase);
        keys.current = new window.Keypair(seed);
        let address = wallet.generate_address('0', keys.current.getPubBigInteger);

        
        //Transaction from first zone
        const transactionModel1 = new TransactionModel()
        transactionModel1.Transactiontype = 'RegularTransaction'
        transactionModel1.Type = 'REGULAR'
        transactionModel1.Status = 'PENDING'
        transactionModel1.Timestamp = DateUtil.getTimeInString()
        transactionModel1.Hash = ''
        transactionModel1.Nonce = count + 1
        transactionModel1.BlockNumber = 0
        transactionModel1.From = address
        transactionModel1.To = 'ADR-ADG4-KDPE-W6YI-XQ34-2VNN-NAFJ-3424-2RLB-ZB43-JHNM'
        transactionModel1.ZoneFrom = 0
        transactionModel1.ZoneTo = 1
        let amount=10
        let fees=amount*(10/100)
        if (Util.isInt(amount)) {
            transactionModel1.Amount = amount.toFixed(1)
        } else {
            transactionModel1.Amount = amount
        }
        if (Util.isInt(fees)) {
            transactionModel1.AmountWithTransactionFee = fees.toFixed(1)
        } else {
            transactionModel1.AmountWithTransactionFee = fees
        }
        transactionModel1.Xaxis = keys.current.getPubPoint.geXAxis
        transactionModel1.Yaxis = keys.current.getPubPoint.getYAxis
        const signature_model = {v: 0, r: "", s: "", pub: ''};
        transactionModel1.Signature = signature_model
        var json = Util.trimJsonStringNumbers(JSON.stringify(transactionModel1))
        transactionModel1.Hash = hash.current.hashString(json)
        let signature = sign.current.sign(keys.current.getKeypair, transactionModel1.hash)
        signature_model.v = signature.recoveryParam
        signature_model.r = enc.current.convertToBase64(signature.r.toString())
        signature_model.s = enc.current.convertToBase64(signature.s.toString())
        transactionModel1.Signature = signature_model

        //Transaction from second zone
        const transactionModel2 = new TransactionModel()
        transactionModel2.Transactiontype = 'RegularTransaction'
        transactionModel2.Type = 'REGULAR'
        transactionModel2.Status = 'PENDING'
        transactionModel2.Timestamp = DateUtil.getTimeInString()
        transactionModel2.Hash = ''
        transactionModel2.Nonce = count + 1
        transactionModel2.BlockNumber = 0
        transactionModel2.From = address
        transactionModel2.To = 'ADR-ADG4-KDPE-W6YI-XQ34-2VNN-NAFJ-3424-2RLB-ZB43-JHNM'
        transactionModel2.ZoneFrom = 2
        transactionModel2.ZoneTo = 3
        let amount2=10
        let fees2=amount2*(10/100)
        if (Util.isInt(amount2)) {
            transactionModel2.Amount = amount2.toFixed(1)
        } else {
            transactionModel2.Amount = amount2
        }
        if (Util.isInt(fees2)) {
            transactionModel2.AmountWithTransactionFee = fees2.toFixed(1)
        } else {
            transactionModel2.AmountWithTransactionFee = fees2
        }
        transactionModel2.Xaxis = keys.current.getPubPoint.geXAxis
        transactionModel2.Yaxis = keys.current.getPubPoint.getYAxis
        const signature_model2 = {v: 0, r: "", s: "", pub: ''};
        transactionModel2.Signature = signature_model2
        var json2 = Util.trimJsonStringNumbers(JSON.stringify(transactionModel2))
        transactionModel2.Hash = hash.current.hashString(json2)
        let signature2 = sign.current.sign(keys.current.getKeypair, transactionModel2.hash)
        signature_model2.v = signature.recoveryParam
        signature_model2.r = enc.current.convertToBase64(signature.r.toString())
        signature_model2.s = enc.current.convertToBase64(signature.s.toString())
        transactionModel2.Signature = signature_model2


        console.log(transactionModel1)
        console.log(transactionModel2)
        setCount(count + 1);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  return (
      <div>
        <h1>GeeksforGeeks</h1>
        <h3>React Example for using setInterval method</h3>
        <h1>{count}</h1>
      </div>
  );
};

export default App;
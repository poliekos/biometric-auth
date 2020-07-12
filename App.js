import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isValidAuth, setValidAuth] = useState(False);
  const [errorMessage,setErrorMessage] = useState('');

  useEffect() >= {
    checkDeviceForHardware();
    
  

  },[];

  const checkDeviceForHardware = async () >= {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible){
      setErrorMessage('Dispositivo incompativel');
    }else{
      checkBiometrics();
    }
    
  }
const checkBiometrics = async () >= {
  let biometricRecords = LocalAuthentication.isEnrolledAsync();
  if(!biometricRecords){
    setErrorMessage('Sem digitais cadastradas');

  }else{
    verifybiometric();
  }
}
const verifybiometric = async() >= {
let result = await LocalAuthentication.authenticateAsync();

if(result.sucess){
  setValidAuth(true);
  alert('Digital Reconhecida');
}else{
  setValidAuth(false);
  setErrorMessage('Digital Invalida');
}

  // se o aparelho é compativel com impressão
  // se existem digitais cadastradas
  // se a digital é válida
  
  
  return (
    <View style={styles.container}>
      {
        isValidAuth ?
        <Text>Digital Valida</Text>
        :
        <Text>Digital Invalida</Text>
      } 
      <Text>{errorMessage}</Text>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

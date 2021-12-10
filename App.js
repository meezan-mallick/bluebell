import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import resetPasswordScreen from './screens/resetPasswordScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  
  //validation variable for firstLaunch for onboarding state
  const Stack = createNativeStackNavigator();
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false); 
      }
    });
  },[]);


  if( isFirstLaunch === null){
    return null;
  }else if( isFirstLaunch === true){
    return (
      <NavigationContainer >
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen options={{headerShown: false}} name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="resetPasswordScreen" component={resetPasswordScreen} />
        <Stack.Screen options={{headerShown: false}} name="RegistrationScreen" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
    else{
      return <LoginScreen/>
  }

}


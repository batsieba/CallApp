import { View, Text, TextInput, Button, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';


export default function HomeScreen() {
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState('');

  const handleCall = () => {
    // Validation for phone numbers
    if (!validatePhoneNumber(phoneNumber1) || !validatePhoneNumber(phoneNumber2)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }

     // Validation for duration
     if (!duration || isNaN(parseInt(duration))) {
        Alert.alert('Invalid Duration', 'Please enter a valid duration');
        return;
      }

      // Perform action to initiate call with provided data
    // This is where you would initiate the call using phone numbers and set duration

    // Open phone app to initiate call
    Linking.openURL(`tel:${phoneNumber1}`).then(supported => {
        if (!supported) {
            Alert.alert('Phone Call Not Supported', 'Phone call functionality is not supported on this device.');
        } else {
            // If call to first number is initiated successfully, wait for duration and then call second number
            setTimeout(() => {
                Linking.openURL(`tel:${phoneNumber2}`).then(supported => {
                    if (!supported) {
                        Alert.alert('Phone Call Not Supported', 'Phone call functionality is not supported on this device.');
                    }
                });
            }, parseInt(duration) * 10000); // converting minutes to milliseconds
        }
    }).catch(error => console.log('Error occurred while initiating phone call:', error));


    // Reset form fields
    setPhoneNumber1('');
    setPhoneNumber2('');
    setNote('');
    setDuration('');
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Add your validation logic here
    // You can check the country code and phone number format
    // For simplicity, let's assume any non-empty string is a valid phone number
    return phoneNumber.trim() !== '';
  };



  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content"/>

      {/* top row */}
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3  border border-gray-300">
           <Icon.PhoneCall height={25} width={25} stroke="gray"/>
           <Text >Call Anywhere</Text>
        </View>
        
      </View>

      {/* <View style={{backgroundColor:themeColors.bgColor(1)}}>
        <Text></Text>
      </View> */}

      <Text style={{color:themeColors.text}} className="text-center text-3xl">Start Your Call</Text>

      {/* call form */}
      <View className="p-4 m-1 bg-gray-100 rounded-xl ">

      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <Text>Phone 1: </Text>
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                
                <TextInput
                    value={phoneNumber1}
                    onChangeText={setPhoneNumber1}
                    placeholder="Phone Number 1"
                    keyboardType="phone-pad"
                    style="border border-gray-300 rounded p-2 mb-4"
                />
        </View>
      </View>


      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <Text>Phone 2: </Text>
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
              
      <TextInput
        value={phoneNumber2}
        onChangeText={setPhoneNumber2}
        placeholder="Phone Number 2"
        keyboardType="phone-pad"
        style="border border-gray-300 rounded p-2 mb-4"
      />

        </View>
      </View>


      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <Text>Note:      </Text>
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Note"
        style="border border-gray-300 rounded p-2 mb-4"
      />

        </View>
      </View>



      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <Text>Duration:</Text>
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        
      <TextInput
        value={duration}
        onChangeText={setDuration}
        placeholder="Duration (in minutes)"
        keyboardType="numeric"
        style="border border-gray-300 rounded p-2 mb-4"
      />

        </View>
      </View>


      <Button className="text-white-500" style={{backgroundColor:themeColors.bgColor(1)}} title="Submit Call" onPress={handleCall} />
    </View>

    </SafeAreaView>

    
  )
}
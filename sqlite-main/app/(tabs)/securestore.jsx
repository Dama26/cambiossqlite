import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import {SecureStore} from 'expo-secure-store';

async function save(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    alert('Error saving the key/value pair');
  }
}

async function getValueFor(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert('No values stored under that key.');
    }
  } catch (error) {
    alert('Error retrieving the value for that key');
  }
}

export default function App() {
  const [key, onChangeKey] = useState('Your key here');
  const [value, onChangeValue] = useState('Your value here');

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Save an item, and grab it later!</Text>

      <TextInput
        style={styles.textInput}
        clearTextOnFocus
        onChangeText={text => onChangeKey(text)}
        value={key}
      />
      <TextInput
        style={styles.textInput}
        clearTextOnFocus
        onChangeText={text => onChangeValue(text)}
        value={value}
      />
      
      <Button
        title="Save this key/value pair"
        onPress={() => {
          save(key, value);
          onChangeKey('Your key here');
          onChangeValue('Your value here');
        }}
      />
      
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={event => {
          getValueFor(event.nativeEvent.text);
        }}
        placeholder="Enter the key for the value you want to get"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 4,
    marginBottom: 10,
  },
});


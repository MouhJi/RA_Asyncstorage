import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginComponent = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [storedUsername, setStoredUsername] = useState(null);

  useEffect(() => {
    const getStoredUsername = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          setStoredUsername(value);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getStoredUsername();
  }, []);

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      setStoredUsername(username);
      alert('Logged in successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {storedUsername ? (
        <Text>Welcome back, {storedUsername}!</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: '80%',
  },
});

export default LoginComponent;
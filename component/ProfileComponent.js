import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileComponent = ({ navigation }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          setUsername(value);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getUsername();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      setUsername(null);
      alert('Logged out successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {username ? (
        <>
          <Text>Welcome, {username}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Please log in first.</Text>
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
});

export default ProfileComponent;
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log('Index useEffect triggered - isLoading:', isLoading, 'user:', user);
    if (!isLoading) {
      if (user && user.isLoggedIn) {
        // User is logged in, navigate based on role
        console.log('User is logged in, navigating to:', user.role);
        if (user.role === 'admin') {
          console.log('Navigating to admin dashboard');
          router.replace('/admin');
        } else if (user.role === 'provider') {
          console.log('Navigating to provider dashboard');
          router.replace('/provider');
        } else {
          console.log('Navigating to customer tabs');
          router.replace('/(tabs)');
        }
      } else {
        // User is not logged in, go to login
        console.log('User is not logged in, navigating to login');
        router.replace('/login');
      }
    }
  }, [user, isLoading]);

  // Show loading screen while checking auth state
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
});

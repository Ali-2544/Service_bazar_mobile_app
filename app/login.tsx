import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Wrench, 
  Shield,
  ArrowRight
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'admin' | 'customer' | 'provider';

interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

const mockUsers = {
  admin: {
    email: 'admin@services.com',
    password: 'admin123',
    name: 'Admin User',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  customer: {
    email: 'customer@email.com',
    password: 'customer123',
    name: 'John Customer',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  provider: {
    email: 'provider@email.com',
    password: 'provider123',
    name: 'Ahmed Provider',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
};

export default function LoginScreen() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: 'customer',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = mockUsers[credentials.role];
      
      if (credentials.email === user.email && credentials.password === user.password) {
        // Store user data using auth context
        const userData = {
          ...user,
          role: credentials.role,
          isLoggedIn: true,
        };
        
        console.log('Login successful, user data:', userData);
        login(userData);
        
        // Wait a bit for state to update, then navigate
        setTimeout(() => {
          console.log('Navigating based on role:', credentials.role);
          if (credentials.role === 'admin') {
            console.log('Navigating to admin dashboard');
            router.replace('/admin');
          } else if (credentials.role === 'provider') {
            console.log('Navigating to provider dashboard');
            router.replace('/provider');
          } else {
            console.log('Navigating to main tabs');
            router.replace('/(tabs)');
          }
        }, 100);
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setCredentials({ ...credentials, role });
  };

  const handleQuickLogin = async (role: UserRole) => {
    const user = mockUsers[role];
    setCredentials({
      email: user.email,
      password: user.password,
      role,
    });
    
    // Auto-login after setting credentials
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const userData = {
        ...user,
        role: role,
        isLoggedIn: true,
      };
      
      console.log('Quick login successful, user data:', userData);
      login(userData);
      
      // Wait a bit for state to update, then navigate
      setTimeout(() => {
        console.log('Quick login - Navigating based on role:', role);
        if (role === 'admin') {
          console.log('Quick login - Navigating to admin dashboard');
          router.replace('/admin');
        } else if (role === 'provider') {
          console.log('Quick login - Navigating to provider dashboard');
          router.replace('/provider');
        } else {
          console.log('Quick login - Navigating to main tabs');
          router.replace('/(tabs)');
        }
      }, 100);
    } catch (error) {
      console.error('Quick login error:', error);
      Alert.alert('Error', 'Quick login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      role: 'customer' as UserRole,
      title: 'Customer',
      description: 'Book services for your home',
      icon: User,
      color: '#3b82f6',
    },
    {
      role: 'provider' as UserRole,
      title: 'Service Provider',
      description: 'Offer your services',
      icon: Wrench,
      color: '#10b981',
    },
    {
      role: 'admin' as UserRole,
      title: 'Admin',
      description: 'Manage the platform',
      icon: Shield,
      color: '#dc2626',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2563eb', '#1d4ed8']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Wrench size={32} color="white" />
            </View>
            <Text style={styles.logoText}>ServiceHub</Text>
          </View>
          <Text style={styles.welcomeText}>
            Welcome to ServiceHub
          </Text>
          <Text style={styles.subtitleText}>
            Connect with trusted professionals for all your home service needs
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.roleSelector}>
          <Text style={styles.roleTitle}>I am a:</Text>
          <View style={styles.roleOptions}>
            {roleOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = credentials.role === option.role;
              
              return (
                <TouchableOpacity
                  key={option.role}
                  style={[
                    styles.roleOption,
                    isSelected && { borderColor: option.color, backgroundColor: `${option.color}10` }
                  ]}
                  onPress={() => handleRoleSelect(option.role)}
                >
                  <View style={[styles.roleIcon, { backgroundColor: option.color }]}>
                    <IconComponent size={24} color="white" />
                  </View>
                  <View style={styles.roleInfo}>
                    <Text style={[styles.roleName, isSelected && { color: option.color }]}>
                      {option.title}
                    </Text>
                    <Text style={styles.roleDescription}>
                      {option.description}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.selectedIndicator, { backgroundColor: option.color }]} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.loginForm}>
          <Text style={styles.formTitle}>Login to your account</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={credentials.email}
                onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={credentials.password}
                onChangeText={(text) => setCredentials({ ...credentials, password: text })}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6b7280" />
                ) : (
                  <Eye size={20} color="#6b7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            <LinearGradient
              colors={['#2563eb', '#1d4ed8']}
              style={styles.loginButtonGradient}
            >
              {isLoading ? (
                <Text style={styles.loginButtonText}>Signing in...</Text>
              ) : (
                <>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                  <ArrowRight size={20} color="white" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.quickLoginSection}>
            <Text style={styles.quickLoginTitle}>Quick Login (Demo)</Text>
            <View style={styles.quickLoginButtons}>
              {roleOptions.map((option) => (
                <TouchableOpacity
                  key={option.role}
                  style={[styles.quickLoginButton, { borderColor: option.color }]}
                  onPress={() => handleQuickLogin(option.role)}
                >
                  <Text style={[styles.quickLoginText, { color: option.color }]}>
                    {option.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.signUpText}>Sign up here</Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  welcomeText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  roleSelector: {
    marginBottom: 32,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  roleOptions: {
    gap: 12,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  loginForm: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  passwordToggle: {
    padding: 4,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  loginButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  quickLoginSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 20,
    marginBottom: 20,
  },
  quickLoginTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  quickLoginButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  quickLoginButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickLoginText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  signUpText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

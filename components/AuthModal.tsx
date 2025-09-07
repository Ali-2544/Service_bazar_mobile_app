import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { X, User, Mail, Lock, Phone, MapPin } from 'lucide-react-native';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (userType: string) => void;
}

export default function AuthModal({ visible, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    address: '',
    service: '',
    experience: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
      Alert.alert('Success', 'Login successful!');
      onSuccess(userType);
    } else {
      if (!formData.email || !formData.password || !formData.fullName || !formData.phone) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      Alert.alert('Success', 'Registration successful!');
      onSuccess(userType);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.userTypeSelector}>
            <Text style={styles.selectorLabel}>I am a:</Text>
            <View style={styles.selectorButtons}>
              <TouchableOpacity
                style={[
                  styles.selectorButton,
                  userType === 'customer' && styles.selectorButtonActive,
                ]}
                onPress={() => setUserType('customer')}
              >
                <Text
                  style={[
                    styles.selectorButtonText,
                    userType === 'customer' && styles.selectorButtonTextActive,
                  ]}
                >
                  Customer
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.selectorButton,
                  userType === 'provider' && styles.selectorButtonActive,
                ]}
                onPress={() => setUserType('provider')}
              >
                <Text
                  style={[
                    styles.selectorButtonText,
                    userType === 'provider' && styles.selectorButtonTextActive,
                  ]}
                >
                  Service Provider
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            {mode === 'register' && (
              <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                  <User size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange('fullName', value)}
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Mail size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {mode === 'register' && (
              <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                  <Phone size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    keyboardType="phone-pad"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Lock size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {mode === 'register' && (
              <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            )}

            {mode === 'register' && (
              <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                  <MapPin size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={formData.address}
                    onChangeText={(value) => handleInputChange('address', value)}
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            )}

            {mode === 'register' && userType === 'provider' && (
              <>
                <View style={styles.inputGroup}>
                  <TextInput
                    style={styles.input}
                    placeholder="Primary Service (e.g., Plumbing, Electrical)"
                    value={formData.service}
                    onChangeText={(value) => handleInputChange('service', value)}
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <TextInput
                    style={styles.input}
                    placeholder="Years of Experience"
                    value={formData.experience}
                    onChangeText={(value) => handleInputChange('experience', value)}
                    keyboardType="numeric"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </>
            )}
          </View>

          {mode === 'login' && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.switchMode}>
            <Text style={styles.switchModeText}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </Text>
            <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
              <Text style={styles.switchModeLink}>
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          {mode === 'register' && (
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userTypeSelector: {
    marginTop: 20,
    marginBottom: 32,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  selectorButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#2563eb',
  },
  selectorButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectorButtonTextActive: {
    color: 'white',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  switchMode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  switchModeText: {
    fontSize: 14,
    color: '#6b7280',
  },
  switchModeLink: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  termsText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 40,
  },
  termsLink: {
    color: '#2563eb',
    fontWeight: '500',
  },
});
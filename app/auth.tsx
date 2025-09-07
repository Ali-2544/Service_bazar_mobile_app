import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Briefcase, Shield, ArrowRight } from 'lucide-react-native';
import AuthModal from '@/components/AuthModal';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const handleAuthSuccess = (userType: string) => {
    setShowModal(false);
    Alert.alert(
      'Welcome!',
      `Successfully logged in as ${userType}. You can now access all platform features.`,
      [
        {
          text: 'Continue',
          onPress: () => router.push('/(tabs)'),
        },
      ]
    );
  };

  const userTypes = [
    {
      icon: User,
      title: 'Customer',
      description: 'Book trusted professionals for home services',
      features: ['Browse services', 'Book appointments', 'Real-time tracking', 'Secure payments'],
      color: '#2563eb',
    },
    {
      icon: Briefcase,
      title: 'Service Provider',
      description: 'Grow your business and connect with customers',
      features: ['Accept bookings', 'Manage schedule', 'Earn money', 'Build reputation'],
      color: '#10b981',
    },
    {
      icon: Shield,
      title: 'Admin',
      description: 'Manage the platform and oversee operations',
      features: ['User management', 'Service oversight', 'Analytics', 'System control'],
      color: '#f59e0b',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563eb', '#1d4ed8']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.appTitle}>ServiceConnect</Text>
          <Text style={styles.subtitle}>All-in-One Services Platform</Text>
          <Text style={styles.description}>
            Connecting trusted professionals with customers for all home service needs
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choose Your Role</Text>
        
        {userTypes.map((userType, index) => {
          const IconComponent = userType.icon;
          return (
            <View key={index} style={styles.userTypeCard}>
              <View style={styles.userTypeHeader}>
                <View style={[styles.userTypeIcon, { backgroundColor: userType.color }]}>
                  <IconComponent size={24} color="white" />
                </View>
                <View style={styles.userTypeInfo}>
                  <Text style={styles.userTypeTitle}>{userType.title}</Text>
                  <Text style={styles.userTypeDescription}>{userType.description}</Text>
                </View>
              </View>
              
              <View style={styles.featuresList}>
                {userType.features.map((feature, featureIndex) => (
                  <View key={featureIndex} style={styles.featureItem}>
                    <View style={[styles.featureDot, { backgroundColor: userType.color }]} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.getStartedText}>Get Started</Text>
          <ArrowRight size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Why Choose ServiceConnect?</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>✓ Verified professionals</Text>
            <Text style={styles.featureItem}>✓ Secure payments</Text>
            <Text style={styles.featureItem}>✓ Real-time tracking</Text>
            <Text style={styles.featureItem}>✓ 24/7 customer support</Text>
            <Text style={styles.featureItem}>✓ Transparent pricing</Text>
            <Text style={styles.featureItem}>✓ Quality guarantee</Text>
          </View>
        </View>
      </View>

      <AuthModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </View>
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
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  userTypeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  userTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userTypeInfo: {
    flex: 1,
  },
  userTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  userTypeDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#4b5563',
  },
  getStartedButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32,
    gap: 8,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  features: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
});
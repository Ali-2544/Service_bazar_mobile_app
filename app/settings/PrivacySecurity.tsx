import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff,
  Bell,
  Globe,
  User,
  Smartphone,
  Key,
  AlertTriangle
} from 'lucide-react-native';

export default function PrivacySecurityScreen() {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    biometricLogin: true,
    locationTracking: false,
    dataSharing: false,
    marketingEmails: true,
    pushNotifications: true,
    profileVisibility: 'public',
    showOnlineStatus: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'This would open a secure password change form with current password, new password, and confirmation fields.',
      [{ text: 'OK' }]
    );
  };

  const handleTwoFactorSetup = () => {
    Alert.alert(
      'Two-Factor Authentication',
      'This would guide you through setting up 2FA using an authenticator app or SMS.',
      [{ text: 'OK' }]
    );
  };

  const handleDataExport = () => {
    Alert.alert(
      'Export Data',
      'This would allow you to download all your personal data in a portable format.',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deletion', 'Account deletion process initiated. You will receive a confirmation email.');
          },
        },
      ]
    );
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    value, 
    onPress, 
    rightComponent 
  }: {
    icon: any;
    title: string;
    description?: string;
    value?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Icon size={20} color="#6b7280" />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && <Text style={styles.settingDescription}>{description}</Text>}
          {value && <Text style={styles.settingValue}>{value}</Text>}
        </View>
      </View>
      {rightComponent || <Text style={styles.settingArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Privacy & Security</Text>
          <Text style={styles.headerSubtitle}>Protect your account and data</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Account Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Security</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              icon={Lock}
              title="Change Password"
              description="Update your account password"
              onPress={handleChangePassword}
            />
            <SettingItem
              icon={Key}
              title="Two-Factor Authentication"
              description={settings.twoFactorAuth ? "Enabled" : "Add extra security"}
              rightComponent={
                <Switch
                  value={settings.twoFactorAuth}
                  onValueChange={() => toggleSetting('twoFactorAuth')}
                  trackColor={{ false: '#e5e7eb', true: '#dc2626' }}
                  thumbColor="white"
                />
              }
            />
            <SettingItem
              icon={Smartphone}
              title="Biometric Login"
              description="Use fingerprint or face recognition"
              rightComponent={
                <Switch
                  value={settings.biometricLogin}
                  onValueChange={() => toggleSetting('biometricLogin')}
                  trackColor={{ false: '#e5e7eb', true: '#dc2626' }}
                  thumbColor="white"
                />
              }
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              icon={Globe}
              title="Location Tracking"
              description="Allow app to access your location"
              rightComponent={
                <Switch
                  value={settings.locationTracking}
                  onValueChange={() => toggleSetting('locationTracking')}
                  trackColor={{ false: '#e5e7eb', true: '#dc2626' }}
                  thumbColor="white"
                />
              }
            />
            <SettingItem
              icon={User}
              title="Profile Visibility"
              description="Control who can see your profile"
              value="Public"
              onPress={() => {
                Alert.alert(
                  'Profile Visibility',
                  'Choose who can see your profile:',
                  [
                    { text: 'Public', onPress: () => setSettings({...settings, profileVisibility: 'public'}) },
                    { text: 'Friends Only', onPress: () => setSettings({...settings, profileVisibility: 'friends'}) },
                    { text: 'Private', onPress: () => setSettings({...settings, profileVisibility: 'private'}) },
                    { text: 'Cancel', style: 'cancel' },
                  ]
                );
              }}
            />
            <SettingItem
              icon={Eye}
              title="Show Online Status"
              description="Let others see when you're online"
              rightComponent={
                <Switch
                  value={settings.showOnlineStatus}
                  onValueChange={() => toggleSetting('showOnlineStatus')}
                  trackColor={{ false: '#e5e7eb', true: '#dc2626' }}
                  thumbColor="white"
                />
              }
            />
          </View>
        </View>

        {/* Data & Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Notifications</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              icon={Shield}
              title="Data Sharing"
              description="Share data for service improvement"
              rightComponent={
                <Switch
                  value={settings.dataSharing}
                  onValueChange={() => toggleSetting('dataSharing')}
                  trackColor={{ false: '#e5e7eb', true: '#dc2626' }}
                  thumbColor="white"
                />
              }
            />
            <SettingItem
              icon={Bell}
              title="Push Notifications"
              description="Receive notifications on your device"
              rightComponent={
                <Switch
                  value={settings.pushNotifications}
                  onValueChange={() => toggleSetting('pushNotifications')}
                  trackColor={{ false: '#e5e7eb', true: '#dc2626' }}
                  thumbColor="white"
                />
              }
            />
            <SettingItem
              icon={Bell}
              title="Marketing Emails"
              description="Receive promotional emails"
              rightComponent={
                <Switch
                  value={settings.marketingEmails}
                  onValueChange={() => toggleSetting('marketingEmails')}
                  trackColor={{ false: '#e5e7eb', true: '#dc2626' }}
                  thumbColor="white"
                />
              }
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <View style={styles.settingsCard}>
            <SettingItem
              icon={Shield}
              title="Export My Data"
              description="Download all your personal data"
              onPress={handleDataExport}
            />
            <SettingItem
              icon={AlertTriangle}
              title="Delete Account"
              description="Permanently delete your account"
              onPress={handleDeleteAccount}
            />
          </View>
        </View>

        {/* Security Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Tips</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <View style={styles.tipIcon}>
                <Shield size={16} color="#10b981" />
              </View>
              <Text style={styles.tipText}>Use a strong, unique password</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIcon}>
                <Key size={16} color="#10b981" />
              </View>
              <Text style={styles.tipText}>Enable two-factor authentication</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIcon}>
                <Eye size={16} color="#10b981" />
              </View>
              <Text style={styles.tipText}>Review privacy settings regularly</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIcon}>
                <AlertTriangle size={16} color="#10b981" />
              </View>
              <Text style={styles.tipText}>Be cautious with personal information</Text>
            </View>
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
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingValue: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 20,
    color: '#9ca3af',
    fontWeight: '300',
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
  },
});

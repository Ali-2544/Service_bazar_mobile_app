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
import { User, Settings, Bell, CreditCard, MapPin, Star, CircleHelp as HelpCircle, LogOut, Shield, Eye, Moon, ChevronRight, CreditCard as Edit, Briefcase, Users } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function AdminSettingsScreen() {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleMenuPress = (item: any) => {
    if (item.screen) {
      // Navigate to the specific screen
      router.push(`/settings/${item.screen}`);
    } else {
      Alert.alert(
        item.label,
        `This would open the ${item.label} screen with relevant settings and information.`
      );
    }
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: () => {
            console.log('Logout confirmed, calling logout function');
            logout();
            console.log('Logout function called, waiting for state to clear');
            
            // Wait a bit for state to clear, then navigate
            setTimeout(() => {
              console.log('Navigating to login after logout');
              router.replace('/login');
            }, 100);
          },
        },
      ]
    );
  };

  // Common settings menu for all user types
  const commonMenuItems = [
    { icon: User, label: 'Personal Information', value: '', screen: 'PersonalInformation' },
    { icon: CreditCard, label: 'Payment Methods', value: '2 cards saved', screen: 'PaymentMethods' },
    { icon: Shield, label: 'Privacy & Security', value: '', screen: 'PrivacySecurity' },
    { icon: HelpCircle, label: 'Help & Support', value: '', screen: 'HelpSupport' },
    { icon: Eye, label: 'Terms & Privacy', value: '', screen: 'TermsPrivacy' },
  ];

  const getMenuItems = () => {
    // All user types get the same settings menu
    return commonMenuItems;
  };

  const getUserInfo = () => {
    if (user) {
      return {
        name: user.name,
        email: user.email,
        subtitle: 'Platform Administrator',
        stats: 'Super Admin • Full Access',
      };
    }
    return {
      name: 'Admin User',
      email: 'admin@platform.com',
      subtitle: 'Platform Administrator',
      stats: 'Super Admin • Full Access',
    };
  };

  const userInfo = getUserInfo();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userInfo.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userEmail}>{userInfo.email}</Text>
            <Text style={styles.userSubtitle}>{userInfo.subtitle}</Text>
            <Text style={styles.userStats}>{userInfo.stats}</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuSection}>
        {getMenuItems().map((item, index) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => !item.hasSwitch && handleMenuPress(item)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <IconComponent size={20} color="#2563eb" />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                  {item.value && (
                    <Text style={styles.menuItemValue}>{item.value}</Text>
                  )}
                </View>
              </View>

              {item.hasSwitch ? (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#e5e7eb', true: '#2563eb' }}
                  thumbColor={notificationsEnabled ? 'white' : '#f3f4f6'}
                />
              ) : (
                <ChevronRight size={20} color="#9ca3af" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIcon}>
              <Moon size={20} color="#2563eb" />
            </View>
            <Text style={styles.menuItemLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#e5e7eb', true: '#2563eb' }}
            thumbColor={darkModeEnabled ? 'white' : '#f3f4f6'}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => handleMenuPress('App Version')}
        >
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIcon}>
              <Settings size={20} color="#2563eb" />
            </View>
            <Text style={styles.menuItemLabel}>App Version</Text>
          </View>
          <Text style={styles.versionText}>v1.0.0</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          All-in-One Services Platform v1.0.0
        </Text>
        <Text style={styles.footerSubtext}>
          Connecting trusted professionals with customers
        </Text>
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
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 4,
  },
  userStats: {
    fontSize: 12,
    color: '#9ca3af',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuItemValue: {
    fontSize: 12,
    color: '#6b7280',
  },
  versionText: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingsSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  logoutSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
  },
  footer: {
    padding: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

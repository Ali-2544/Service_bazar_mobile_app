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
  User, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  Eye, 
  Edit, 
  LogOut, 
  ChevronRight,
  Moon,
  Settings
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ProviderSettingsScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleMenuPress = (item: any) => {
    if (item.screen) {
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

  const commonMenuItems = [
    { icon: User, label: 'Personal Information', value: '', screen: 'PersonalInformation' },
    { icon: CreditCard, label: 'Payment Methods', value: '2 cards saved', screen: 'PaymentMethods' },
    { icon: Shield, label: 'Privacy & Security', value: '', screen: 'PrivacySecurity' },
    { icon: HelpCircle, label: 'Help & Support', value: '', screen: 'HelpSupport' },
    { icon: Eye, label: 'Terms & Privacy', value: '', screen: 'TermsPrivacy' },
  ];

  const getMenuItems = () => {
    return commonMenuItems;
  };

  const getUserInfo = () => {
    if (user) {
      return {
        name: user.name,
        email: user.email,
        subtitle: 'Service Provider',
        stats: 'Professional • Verified',
      };
    }
    return {
      name: 'Provider User',
      email: 'provider@platform.com',
      subtitle: 'Service Provider',
      stats: 'Professional • Verified',
    };
  };

  const userInfo = getUserInfo();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#059669', '#047857']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
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
              <Edit size={20} color="#059669" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
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
                    <IconComponent size={20} color="#059669" />
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
                    trackColor={{ false: '#e5e7eb', true: '#059669' }}
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
                <Moon size={20} color="#059669" />
              </View>
              <Text style={styles.menuItemLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#e5e7eb', true: '#059669' }}
              thumbColor={darkModeEnabled ? 'white' : '#f3f4f6'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('App Version')}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIcon}>
                <Settings size={20} color="#059669" />
              </View>
              <Text style={styles.menuItemLabel}>App Version</Text>
            </View>
            <Text style={styles.versionText}>v1.0.0</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              console.log('Logout TouchableOpacity pressed');
              handleLogout();
            }}
          >
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginBottom: 4,
  },
  userSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 2,
  },
  userStats: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
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
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuItemValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  versionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  logoutSection: {
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

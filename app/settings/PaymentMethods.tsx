import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit,
  Check
} from 'lucide-react-native';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  name: string;
  number: string;
  expiry?: string;
  isDefault: boolean;
  icon: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    name: 'Visa Card',
    number: '**** **** **** 1234',
    expiry: '12/25',
    isDefault: true,
    icon: '💳',
  },
  {
    id: '2',
    type: 'card',
    name: 'Mastercard',
    number: '**** **** **** 5678',
    expiry: '08/26',
    isDefault: false,
    icon: '💳',
  },
  {
    id: '3',
    type: 'bank',
    name: 'Bank Account',
    number: '**** **** **** 9012',
    isDefault: false,
    icon: '🏦',
  },
];

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);

  const handleAddPaymentMethod = () => {
    Alert.alert(
      'Add Payment Method',
      'Choose payment method type:',
      [
        { text: 'Credit/Debit Card', onPress: () => showAddCardForm() },
        { text: 'Bank Account', onPress: () => showAddBankForm() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const showAddCardForm = () => {
    Alert.alert(
      'Add Card',
      'This would open a form to add a new credit/debit card with fields for card number, expiry date, CVV, and billing address.',
      [{ text: 'OK' }]
    );
  };

  const showAddBankForm = () => {
    Alert.alert(
      'Add Bank Account',
      'This would open a form to add a new bank account with fields for account number, routing number, and bank details.',
      [{ text: 'OK' }]
    );
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method =>
      method.id === id 
        ? { ...method, isDefault: true }
        : { ...method, isDefault: false }
    ));
    Alert.alert('Success', 'Default payment method updated');
  };

  const handleEditPaymentMethod = (method: PaymentMethod) => {
    Alert.alert(
      'Edit Payment Method',
      `This would open an edit form for ${method.name} ${method.number}`,
      [{ text: 'OK' }]
    );
  };

  const handleDeletePaymentMethod = (id: string) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(paymentMethods.filter(method => method.id !== id));
            Alert.alert('Success', 'Payment method deleted');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Payment Methods</Text>
          <Text style={styles.headerSubtitle}>Manage your payment options</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddPaymentMethod}>
              <Plus size={16} color="white" />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentMethodsList}>
            {paymentMethods.map((method) => (
              <View key={method.id} style={styles.paymentMethodCard}>
                <View style={styles.paymentMethodHeader}>
                  <View style={styles.paymentMethodInfo}>
                    <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
                    <View style={styles.paymentMethodDetails}>
                      <Text style={styles.paymentMethodName}>{method.name}</Text>
                      <Text style={styles.paymentMethodNumber}>{method.number}</Text>
                      {method.expiry && (
                        <Text style={styles.paymentMethodExpiry}>Expires {method.expiry}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.paymentMethodActions}>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Check size={12} color="white" />
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.paymentMethodFooter}>
                  <View style={styles.actionButtons}>
                    {!method.isDefault && (
                      <TouchableOpacity
                        style={styles.setDefaultButton}
                        onPress={() => handleSetDefault(method.id)}
                      >
                        <Text style={styles.setDefaultButtonText}>Set as Default</Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditPaymentMethod(method)}
                    >
                      <Edit size={14} color="#2563eb" />
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeletePaymentMethod(method.id)}
                    >
                      <Trash2 size={14} color="#dc2626" />
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Security</Text>
          <View style={styles.securityInfo}>
            <View style={styles.securityItem}>
              <View style={styles.securityIcon}>
                <Check size={20} color="#10b981" />
              </View>
              <View style={styles.securityDetails}>
                <Text style={styles.securityTitle}>Secure Encryption</Text>
                <Text style={styles.securityDescription}>
                  All payment information is encrypted and securely stored
                </Text>
              </View>
            </View>
            
            <View style={styles.securityItem}>
              <View style={styles.securityIcon}>
                <Check size={20} color="#10b981" />
              </View>
              <View style={styles.securityDetails}>
                <Text style={styles.securityTitle}>PCI Compliance</Text>
                <Text style={styles.securityDescription}>
                  We follow industry standards for payment security
                </Text>
              </View>
            </View>
            
            <View style={styles.securityItem}>
              <View style={styles.securityIcon}>
                <Check size={20} color="#10b981" />
              </View>
              <View style={styles.securityDetails}>
                <Text style={styles.securityTitle}>Fraud Protection</Text>
                <Text style={styles.securityDescription}>
                  Advanced fraud detection and prevention systems
                </Text>
              </View>
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
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  paymentMethodsList: {
    gap: 12,
  },
  paymentMethodCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  paymentMethodNumber: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  paymentMethodExpiry: {
    fontSize: 12,
    color: '#9ca3af',
  },
  paymentMethodActions: {
    alignItems: 'flex-end',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  defaultText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  paymentMethodFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  setDefaultButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  setDefaultButtonText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  editButtonText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  deleteButtonText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  securityInfo: {
    gap: 16,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  securityDetails: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  securityDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
});

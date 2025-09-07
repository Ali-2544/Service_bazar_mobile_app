import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MapPin,
  Phone,
  MessageCircle,
  Eye,
  User,
  DollarSign
} from 'lucide-react-native';

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  address: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
  notes: string;
  rating?: number;
  review?: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    customerPhone: '+971 50 123 4567',
    serviceName: 'Plumbing Repair',
    bookingDate: '2024-01-25',
    bookingTime: '10:00 AM',
    address: '123 Main Street, Dubai, UAE',
    status: 'pending',
    totalAmount: 75,
    notes: 'Kitchen sink is leaking, needs immediate repair',
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    customerEmail: 'mike.chen@email.com',
    customerPhone: '+971 50 234 5678',
    serviceName: 'Electrical Installation',
    bookingDate: '2024-01-24',
    bookingTime: '2:30 PM',
    address: '456 Business Bay, Dubai, UAE',
    status: 'confirmed',
    totalAmount: 120,
    notes: 'Install new ceiling fan in living room',
  },
  {
    id: '3',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    customerPhone: '+971 50 345 6789',
    serviceName: 'HVAC Maintenance',
    bookingDate: '2024-01-23',
    bookingTime: '9:00 AM',
    address: '789 Jumeirah, Dubai, UAE',
    status: 'completed',
    totalAmount: 95,
    notes: 'Regular AC maintenance and cleaning',
    rating: 5,
    review: 'Excellent service, very professional!',
  },
  {
    id: '4',
    customerName: 'Ahmed Hassan',
    customerEmail: 'ahmed.hassan@email.com',
    customerPhone: '+971 50 456 7890',
    serviceName: 'Plumbing Installation',
    bookingDate: '2024-01-22',
    bookingTime: '11:00 AM',
    address: '321 Marina, Dubai, UAE',
    status: 'in_progress',
    totalAmount: 150,
    notes: 'Install new water heater',
  },
];

export default function ProviderBookingsScreen() {
  const [selectedTab, setSelectedTab] = useState<'requests' | 'my-bookings'>('requests');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color="#f59e0b" />;
      case 'confirmed':
        return <CheckCircle size={16} color="#3b82f6" />;
      case 'in_progress':
        return <AlertCircle size={16} color="#8b5cf6" />;
      case 'completed':
        return <CheckCircle size={16} color="#10b981" />;
      case 'cancelled':
        return <XCircle size={16} color="#dc2626" />;
      default:
        return <Clock size={16} color="#6b7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#fef3c7';
      case 'confirmed':
        return '#dbeafe';
      case 'in_progress':
        return '#ede9fe';
      case 'completed':
        return '#d1fae5';
      case 'cancelled':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  };

  const handleBookingAction = (booking: Booking, action: string) => {
    Alert.alert(
      `${action} Booking`,
      `Are you sure you want to ${action.toLowerCase()} this booking?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action,
          onPress: () => {
            setProcessingAction(`${action}-${booking.id}`);
            
            // Simulate API call delay
            setTimeout(() => {
              // Update booking status based on action
              let newStatus = booking.status;
              switch (action.toLowerCase()) {
                case 'confirm':
                  newStatus = 'confirmed';
                  break;
                case 'decline':
                  newStatus = 'cancelled';
                  break;
                case 'start':
                  newStatus = 'in_progress';
                  break;
                case 'complete':
                  newStatus = 'completed';
                  break;
              }

              // Update the booking in state
              setBookings(prevBookings => 
                prevBookings.map(b => 
                  b.id === booking.id 
                    ? { ...b, status: newStatus as any }
                    : b
                )
              );

              setProcessingAction(null);
              Alert.alert('Success', `Booking ${action.toLowerCase()}ed successfully`);
            }, 1000);
          },
        },
      ]
    );
  };

  const handleViewBooking = (booking: Booking) => {
    const statusText = booking.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const reviewText = booking.rating ? `\nRating: ${booking.rating}/5\nReview: ${booking.review}` : '';

    Alert.alert(
      'Booking Details',
      `Customer: ${booking.customerName}\nEmail: ${booking.customerEmail}\nPhone: ${booking.customerPhone}\nService: ${booking.serviceName}\nDate: ${booking.bookingDate} at ${booking.bookingTime}\nAddress: ${booking.address}\nStatus: ${statusText}\nAmount: $${booking.totalAmount}\nNotes: ${booking.notes}${reviewText}`,
      [{ text: 'OK' }]
    );
  };

  const handleMessageCustomer = (booking: Booking) => {
    Alert.alert(
      'Message Customer',
      `Contact ${booking.customerName}:\n\nPhone: ${booking.customerPhone}\nEmail: ${booking.customerEmail}\n\nThis would open a chat interface in a real app.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => Alert.alert('Call', `Calling ${booking.customerPhone}...`) 
        },
        { 
          text: 'Email', 
          onPress: () => Alert.alert('Email', `Opening email to ${booking.customerEmail}...`) 
        },
      ]
    );
  };

  const filteredBookings = selectedTab === 'requests' 
    ? bookings.filter(booking => booking.status === 'pending')
    : bookings.filter(booking => booking.status !== 'pending');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#059669', '#047857']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Bookings</Text>
          <Text style={styles.headerSubtitle}>Manage your service bookings</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'requests' && styles.activeTab]}
            onPress={() => setSelectedTab('requests')}
          >
            <Text style={[styles.tabText, selectedTab === 'requests' && styles.activeTabText]}>
              Booking Requests ({bookings.filter(b => b.status === 'pending').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'my-bookings' && styles.activeTab]}
            onPress={() => setSelectedTab('my-bookings')}
          >
            <Text style={[styles.tabText, selectedTab === 'my-bookings' && styles.activeTabText]}>
              My Bookings ({bookings.filter(b => b.status !== 'pending').length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bookings List */}
        <View style={styles.bookingsList}>
          {filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.customerName}>{booking.customerName}</Text>
                  <Text style={styles.serviceName}>{booking.serviceName}</Text>
                  <Text style={styles.bookingDateTime}>
                    {booking.bookingDate} at {booking.bookingTime}
                  </Text>
                </View>
                <View style={styles.bookingAmount}>
                  <Text style={styles.amountText}>${booking.totalAmount}</Text>
                </View>
              </View>

              <View style={styles.bookingDetails}>
                <View style={styles.detailItem}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{booking.address}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Phone size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{booking.customerPhone}</Text>
                </View>
              </View>

              <View style={styles.bookingFooter}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                  {getStatusIcon(booking.status)}
                  <Text style={styles.statusText}>
                    {booking.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                </View>

                <View style={styles.bookingActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleViewBooking(booking)}
                  >
                    <Eye size={14} color="#6b7280" />
                    <Text style={styles.actionButtonText}>View</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleMessageCustomer(booking)}
                  >
                    <MessageCircle size={14} color="#6b7280" />
                    <Text style={styles.actionButtonText}>Message</Text>
                  </TouchableOpacity>

                  {booking.status === 'pending' && (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.actionButton, 
                          styles.confirmButton,
                          processingAction === `Confirm-${booking.id}` && styles.processingButton
                        ]}
                        onPress={() => handleBookingAction(booking, 'Confirm')}
                        disabled={processingAction === `Confirm-${booking.id}`}
                      >
                        <CheckCircle size={14} color="#10b981" />
                        <Text style={[styles.actionButtonText, styles.confirmButtonText]}>
                          {processingAction === `Confirm-${booking.id}` ? 'Processing...' : 'Confirm'}
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[
                          styles.actionButton, 
                          styles.declineButton,
                          processingAction === `Decline-${booking.id}` && styles.processingButton
                        ]}
                        onPress={() => handleBookingAction(booking, 'Decline')}
                        disabled={processingAction === `Decline-${booking.id}`}
                      >
                        <XCircle size={14} color="#dc2626" />
                        <Text style={[styles.actionButtonText, styles.declineButtonText]}>
                          {processingAction === `Decline-${booking.id}` ? 'Processing...' : 'Decline'}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {booking.status === 'confirmed' && (
                    <TouchableOpacity
                      style={[
                        styles.actionButton, 
                        styles.startButton,
                        processingAction === `Start-${booking.id}` && styles.processingButton
                      ]}
                      onPress={() => handleBookingAction(booking, 'Start')}
                      disabled={processingAction === `Start-${booking.id}`}
                    >
                      <Clock size={14} color="#3b82f6" />
                      <Text style={[styles.actionButtonText, styles.startButtonText]}>
                        {processingAction === `Start-${booking.id}` ? 'Processing...' : 'Start'}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {booking.status === 'in_progress' && (
                    <TouchableOpacity
                      style={[
                        styles.actionButton, 
                        styles.completeButton,
                        processingAction === `Complete-${booking.id}` && styles.processingButton
                      ]}
                      onPress={() => handleBookingAction(booking, 'Complete')}
                      disabled={processingAction === `Complete-${booking.id}`}
                    >
                      <CheckCircle size={14} color="#10b981" />
                      <Text style={[styles.actionButtonText, styles.completeButtonText]}>
                        {processingAction === `Complete-${booking.id}` ? 'Processing...' : 'Complete'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {filteredBookings.length === 0 && (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#9ca3af" />
            <Text style={styles.emptyStateTitle}>No bookings found</Text>
            <Text style={styles.emptyStateText}>
              {selectedTab === 'requests' 
                ? 'You have no pending booking requests at the moment.'
                : 'You have no confirmed bookings at the moment.'
              }
            </Text>
          </View>
        )}
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
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
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
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#059669',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: 'white',
  },
  bookingsList: {
    gap: 16,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  bookingDateTime: {
    fontSize: 14,
    color: '#9ca3af',
  },
  bookingAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
  },
  bookingDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#d1fae5',
  },
  confirmButtonText: {
    color: '#10b981',
  },
  declineButton: {
    backgroundColor: '#fee2e2',
  },
  declineButtonText: {
    color: '#dc2626',
  },
  startButton: {
    backgroundColor: '#dbeafe',
  },
  startButtonText: {
    color: '#3b82f6',
  },
  completeButton: {
    backgroundColor: '#d1fae5',
  },
  completeButtonText: {
    color: '#10b981',
  },
  processingButton: {
    opacity: 0.6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

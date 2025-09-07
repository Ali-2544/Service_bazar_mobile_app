import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Calendar, Clock, MapPin, Star, Phone, MessageCircle, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

const bookings = [
  {
    id: 1,
    providerName: 'Ahmed Hassan',
    service: 'Plumbing',
    status: 'confirmed',
    date: '2024-12-30',
    time: '2:00 PM',
    address: '123 Business Bay, Dubai',
    price: 150,
    duration: '2 hours',
    phone: '+971 50 123 4567',
    description: 'Kitchen sink pipe repair',
    estimatedArrival: '1:45 PM',
  },
  {
    id: 2,
    providerName: 'Sarah Johnson',
    service: 'Electrical',
    status: 'completed',
    date: '2024-12-28',
    time: '10:00 AM',
    address: '456 Marina Walk, Dubai',
    price: 200,
    duration: '3 hours',
    phone: '+971 50 987 6543',
    description: 'Outlet installation and wiring',
    completedAt: '1:15 PM',
    rating: 5,
  },
  {
    id: 3,
    providerName: 'Michael Chen',
    service: 'AC Repair',
    status: 'in-progress',
    date: '2024-12-29',
    time: '11:00 AM',
    address: '789 Downtown Dubai',
    price: 180,
    duration: '2.5 hours',
    phone: '+971 50 555 1234',
    description: 'AC unit cleaning and maintenance',
    startedAt: '11:15 AM',
  },
  {
    id: 4,
    providerName: 'Maria Rodriguez',
    service: 'Painting',
    status: 'pending',
    date: '2024-12-31',
    time: '9:00 AM',
    address: '321 Jumeirah Beach Residence',
    price: 350,
    duration: '4 hours',
    phone: '+971 50 777 8888',
    description: 'Living room wall painting',
  },
];

const statusConfig = {
  pending: {
    color: '#f59e0b',
    backgroundColor: '#fef3c7',
    icon: AlertCircle,
    text: 'Pending Confirmation',
  },
  confirmed: {
    color: '#10b981',
    backgroundColor: '#d1fae5',
    icon: CheckCircle,
    text: 'Confirmed',
  },
  'in-progress': {
    color: '#2563eb',
    backgroundColor: '#dbeafe',
    icon: Clock,
    text: 'In Progress',
  },
  completed: {
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    icon: CheckCircle,
    text: 'Completed',
  },
  cancelled: {
    color: '#dc2626',
    backgroundColor: '#fecaca',
    icon: XCircle,
    text: 'Cancelled',
  },
};

export default function BookingsScreen() {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const handleBookingPress = (booking: any) => {
    Alert.alert(
      'Booking Details',
      `${booking.service} with ${booking.providerName}\nDate: ${booking.date} at ${booking.time}\nPrice: $${booking.price}\n\nThis would open the full booking details screen.`
    );
  };

  const handleContactProvider = (booking: any, method: 'call' | 'message') => {
    const action = method === 'call' ? 'Call' : 'Message';
    Alert.alert(
      `${action} Provider`,
      `${action} ${booking.providerName}?\nThis would initiate ${method === 'call' ? 'a call' : 'messaging'} with the service provider.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: action, onPress: () => Alert.alert(`${action}ing ${booking.providerName}...`) },
      ]
    );
  };

  const handleTrackProvider = (booking: any) => {
    Alert.alert(
      'Track Provider',
      `Track ${booking.providerName}'s location?\nThis would open the live tracking map showing the provider's current location and ETA.`
    );
  };

  const handleCancelBooking = (booking: any) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking with ${booking.providerName}?\nCancellation may incur charges depending on timing.`,
      [
        { text: 'Keep Booking', style: 'cancel' },
        { 
          text: 'Cancel Booking', 
          style: 'destructive',
          onPress: () => Alert.alert('Booking Cancelled', 'Your booking has been cancelled successfully.')
        },
      ]
    );
  };

  const upcomingBookings = bookings.filter(b => 
    ['pending', 'confirmed', 'in-progress'].includes(b.status)
  );
  
  const pastBookings = bookings.filter(b => 
    ['completed', 'cancelled'].includes(b.status)
  );

  const displayBookings = selectedTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
            onPress={() => setSelectedTab('upcoming')}
          >
            <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
              Upcoming ({upcomingBookings.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
            onPress={() => setSelectedTab('past')}
          >
            <Text style={[styles.tabText, selectedTab === 'past' && styles.activeTabText]}>
              Past ({pastBookings.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.bookingsList} showsVerticalScrollIndicator={false}>
        {displayBookings.map((booking) => {
          const status = statusConfig[booking.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;

          return (
            <TouchableOpacity
              key={booking.id}
              style={styles.bookingCard}
              onPress={() => handleBookingPress(booking)}
            >
              <View style={styles.bookingHeader}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{booking.service}</Text>
                  <Text style={styles.providerName}>{booking.providerName}</Text>
                </View>
                
                <View style={[styles.statusBadge, { backgroundColor: status.backgroundColor }]}>
                  <StatusIcon size={12} color={status.color} />
                  <Text style={[styles.statusText, { color: status.color }]}>
                    {status.text}
                  </Text>
                </View>
              </View>

              <Text style={styles.description}>{booking.description}</Text>

              <View style={styles.bookingDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{booking.date} at {booking.time}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.detailText}>Duration: {booking.duration}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#6b7280" />
                  <Text style={styles.detailText} numberOfLines={1}>
                    {booking.address}
                  </Text>
                </View>
              </View>

              {booking.status === 'in-progress' && booking.startedAt && (
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>
                    Service started at {booking.startedAt}
                  </Text>
                  <TouchableOpacity
                    style={styles.trackButton}
                    onPress={() => handleTrackProvider(booking)}
                  >
                    <Text style={styles.trackButtonText}>Track Provider</Text>
                  </TouchableOpacity>
                </View>
              )}

              {booking.status === 'confirmed' && booking.estimatedArrival && (
                <View style={styles.arrivalInfo}>
                  <Text style={styles.arrivalText}>
                    Estimated arrival: {booking.estimatedArrival}
                  </Text>
                </View>
              )}

              {booking.status === 'completed' && booking.rating && (
                <View style={styles.completedInfo}>
                  <Text style={styles.completedText}>
                    Completed at {booking.completedAt}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingLabel}>Your Rating:</Text>
                    <View style={styles.stars}>
                      {[...Array(booking.rating)].map((_, i) => (
                        <Star key={i} size={14} color="#fbbf24" fill="#fbbf24" />
                      ))}
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.bookingFooter}>
                <Text style={styles.price}>${booking.price}</Text>
                
                <View style={styles.actionButtons}>
                  {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                    <>
                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => handleContactProvider(booking, 'call')}
                      >
                        <Phone size={16} color="#2563eb" />
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => handleContactProvider(booking, 'message')}
                      >
                        <MessageCircle size={16} color="#2563eb" />
                      </TouchableOpacity>
                    </>
                  )}
                  
                  {booking.status === 'pending' && (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancelBooking(booking)}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {displayBookings.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {selectedTab} bookings
            </Text>
            <Text style={styles.emptyStateSubtext}>
              {selectedTab === 'upcoming' 
                ? 'Book a service to see your upcoming appointments'
                : 'Your completed bookings will appear here'
              }
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#1f2937',
    fontWeight: '600',
  },
  bookingsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
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
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
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
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
    flex: 1,
  },
  progressInfo: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  trackButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  trackButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  arrivalInfo: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  arrivalText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '500',
  },
  completedInfo: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  completedText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#4b5563',
    marginRight: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  Filter,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Star,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  MessageCircle
} from 'lucide-react-native';

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAvatar: string;
  providerName: string;
  providerEmail: string;
  providerPhone: string;
  providerAvatar: string;
  serviceName: string;
  serviceCategory: string;
  serviceIcon: any;
  serviceColor: string;
  bookingDate: string;
  bookingTime: string;
  address: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
  notes: string;
  createdAt: string;
  rating?: number;
  review?: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+971 50 123 4567',
    customerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    providerName: 'Ahmed Hassan',
    providerEmail: 'ahmed.hassan@email.com',
    providerPhone: '+971 50 987 6543',
    providerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'Plumbing Repair',
    serviceCategory: 'Plumbing',
    serviceIcon: 'Droplets',
    serviceColor: '#3b82f6',
    bookingDate: '2024-01-25',
    bookingTime: '10:00 AM',
    address: '123 Main Street, Dubai, UAE',
    status: 'completed',
    totalAmount: 150,
    notes: 'Kitchen sink repair needed',
    createdAt: '2024-01-20',
    rating: 5,
    review: 'Excellent service, very professional!',
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '+971 50 555 1234',
    customerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    providerName: 'Mohammed Al-Rashid',
    providerEmail: 'mohammed.r@email.com',
    providerPhone: '+971 50 777 8888',
    providerAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'Electrical Installation',
    serviceCategory: 'Electrical',
    serviceIcon: 'Zap',
    serviceColor: '#eab308',
    bookingDate: '2024-01-26',
    bookingTime: '2:00 PM',
    address: '456 Business Bay, Dubai, UAE',
    status: 'in_progress',
    totalAmount: 300,
    notes: 'Install new light fixtures in living room',
    createdAt: '2024-01-22',
  },
  {
    id: '3',
    customerName: 'Mike Wilson',
    customerEmail: 'mike.w@email.com',
    customerPhone: '+971 50 999 0000',
    customerAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    providerName: 'Lisa Chen',
    providerEmail: 'lisa.chen@email.com',
    providerPhone: '+971 50 111 2222',
    providerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'AC Repair',
    serviceCategory: 'HVAC',
    serviceIcon: 'Wind',
    serviceColor: '#06b6d4',
    bookingDate: '2024-01-27',
    bookingTime: '9:00 AM',
    address: '789 Marina Walk, Dubai, UAE',
    status: 'confirmed',
    totalAmount: 200,
    notes: 'AC not cooling properly',
    createdAt: '2024-01-23',
  },
  {
    id: '4',
    customerName: 'Emma Davis',
    customerEmail: 'emma.d@email.com',
    customerPhone: '+971 50 333 4444',
    customerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    providerName: 'David Brown',
    providerEmail: 'david.b@email.com',
    providerPhone: '+971 50 555 6666',
    providerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'Painting Service',
    serviceCategory: 'Painting',
    serviceIcon: 'Paintbrush',
    serviceColor: '#8b5cf6',
    bookingDate: '2024-01-28',
    bookingTime: '11:00 AM',
    address: '321 Jumeirah Beach, Dubai, UAE',
    status: 'pending',
    totalAmount: 500,
    notes: 'Paint bedroom walls',
    createdAt: '2024-01-24',
  },
  {
    id: '5',
    customerName: 'Alex Thompson',
    customerEmail: 'alex.t@email.com',
    customerPhone: '+971 50 777 8888',
    customerAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    providerName: 'Ahmed Hassan',
    providerEmail: 'ahmed.hassan@email.com',
    providerPhone: '+971 50 987 6543',
    providerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'Plumbing Installation',
    serviceCategory: 'Plumbing',
    serviceIcon: 'Droplets',
    serviceColor: '#3b82f6',
    bookingDate: '2024-01-29',
    bookingTime: '3:00 PM',
    address: '654 Downtown Dubai, UAE',
    status: 'cancelled',
    totalAmount: 180,
    notes: 'Install new bathroom fixtures',
    createdAt: '2024-01-25',
  },
];

export default function AdminBookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'>('all');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#3b82f6';
      case 'in_progress': return '#8b5cf6';
      case 'completed': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'pending': return '#fef3c7';
      case 'confirmed': return '#eff6ff';
      case 'in_progress': return '#f3e8ff';
      case 'completed': return '#d1fae5';
      case 'cancelled': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return AlertCircle;
      case 'confirmed': return CheckCircle;
      case 'in_progress': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    in_progress: bookings.filter(b => b.status === 'in_progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalAmount, 0),
  };

  const handleViewBooking = (booking: Booking) => {
    const statusText = booking.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const reviewText = booking.rating ? `\nRating: ${booking.rating}/5\nReview: ${booking.review}` : '';
    
    Alert.alert(
      'Booking Details (View Only)',
      `Customer: ${booking.customerName}\nProvider: ${booking.providerName}\nService: ${booking.serviceName}\nDate: ${booking.bookingDate} at ${booking.bookingTime}\nAddress: ${booking.address}\nStatus: ${statusText}\nAmount: $${booking.totalAmount}\nNotes: ${booking.notes}${reviewText}\n\nNote: Status changes are managed by service providers.`,
      [{ text: 'OK' }]
    );
  };



  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Bookings Management</Text>
          <Text style={styles.headerSubtitle}>View all bookings and their status</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bookings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#f59e0b' }]}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#10b981' }]}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#10b981' }]}>${stats.totalRevenue}</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterButtons}>
              {(['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] as const).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[styles.filterButton, filterStatus === status && styles.activeFilter]}
                  onPress={() => setFilterStatus(status)}
                >
                  <Text style={[styles.filterButtonText, filterStatus === status && styles.activeFilterText]}>
                    {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <ScrollView style={styles.bookingsList} showsVerticalScrollIndicator={false}>
          {filteredBookings.map((booking) => {
            const StatusIcon = getStatusIcon(booking.status);
            return (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingInfo}>
                    <View style={styles.serviceInfo}>
                      <View style={[styles.serviceIcon, { backgroundColor: booking.serviceColor }]}>
                        <Text style={styles.serviceIconText}>{booking.serviceName.charAt(0)}</Text>
                      </View>
                      <View style={styles.serviceDetails}>
                        <Text style={styles.serviceName}>{booking.serviceName}</Text>
                        <Text style={styles.serviceCategory}>{booking.serviceCategory}</Text>
                        <View style={styles.bookingMeta}>
                          <Calendar size={12} color="#6b7280" />
                          <Text style={styles.bookingDate}>{booking.bookingDate} at {booking.bookingTime}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.bookingStatus}>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(booking.status) }]}>
                        <StatusIcon size={12} color={getStatusColor(booking.status)} />
                        <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                          {booking.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.bookingContent}>
                  <View style={styles.participantsSection}>
                    <View style={styles.participant}>
                      <Image source={{ uri: booking.customerAvatar }} style={styles.participantAvatar} />
                      <View style={styles.participantInfo}>
                        <Text style={styles.participantName}>{booking.customerName}</Text>
                        <Text style={styles.participantRole}>Customer</Text>
                        <View style={styles.participantContact}>
                          <Phone size={10} color="#6b7280" />
                          <Text style={styles.participantPhone}>{booking.customerPhone}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.participant}>
                      <Image source={{ uri: booking.providerAvatar }} style={styles.participantAvatar} />
                      <View style={styles.participantInfo}>
                        <Text style={styles.participantName}>{booking.providerName}</Text>
                        <Text style={styles.participantRole}>Provider</Text>
                        <View style={styles.participantContact}>
                          <Phone size={10} color="#6b7280" />
                          <Text style={styles.participantPhone}>{booking.providerPhone}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.bookingDetails}>
                    <View style={styles.detailRow}>
                      <MapPin size={14} color="#6b7280" />
                      <Text style={styles.detailText}>{booking.address}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <DollarSign size={14} color="#6b7280" />
                      <Text style={styles.detailText}>${booking.totalAmount}</Text>
                    </View>
                    {booking.notes && (
                      <View style={styles.detailRow}>
                        <MessageCircle size={14} color="#6b7280" />
                        <Text style={styles.detailText}>{booking.notes}</Text>
                      </View>
                    )}
                    {booking.rating && (
                      <View style={styles.detailRow}>
                        <Star size={14} color="#fbbf24" fill="#fbbf24" />
                        <Text style={styles.detailText}>{booking.rating}/5 - {booking.review}</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.bookingActions}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleViewBooking(booking)}
                  >
                    <Eye size={16} color="#2563eb" />
                    <Text style={styles.viewButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilter: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeFilterText: {
    color: 'white',
  },
  bookingsList: {
    flex: 1,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingHeader: {
    marginBottom: 12,
  },
  bookingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  serviceInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceIconText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  serviceCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  bookingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingDate: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  bookingStatus: {
    alignItems: 'flex-end',
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
    fontSize: 10,
    fontWeight: '600',
  },
  bookingContent: {
    marginBottom: 12,
  },
  participantsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  participant: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 4,
  },
  participantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  participantRole: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  participantContact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantPhone: {
    fontSize: 10,
    color: '#6b7280',
    marginLeft: 2,
  },
  bookingDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
    flex: 1,
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  viewButtonText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
  },
});

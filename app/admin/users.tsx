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
  Check, 
  X, 
  User, 
  Wrench,
  Star,
  MapPin,
  Clock,
  Filter,
  Eye
} from 'lucide-react-native';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'provider' | 'customer';
  status: 'pending' | 'approved' | 'rejected';
  avatar: string;
  rating?: number;
  reviews?: number;
  services?: string[];
  location?: string;
  joinedDate: string;
  documents?: string[];
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+971 50 123 4567',
    type: 'provider',
    status: 'pending',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.9,
    reviews: 124,
    services: ['Plumbing', 'Water Heater Repair'],
    location: 'Dubai, UAE',
    joinedDate: '2024-01-15',
    documents: ['ID Copy', 'License', 'Insurance'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+971 50 987 6543',
    type: 'provider',
    status: 'approved',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.8,
    reviews: 98,
    services: ['Electrical', 'Smart Home Installation'],
    location: 'Abu Dhabi, UAE',
    joinedDate: '2024-01-10',
    documents: ['ID Copy', 'License', 'Insurance'],
  },
  {
    id: '3',
    name: 'Mohammed Al-Rashid',
    email: 'mohammed.r@email.com',
    phone: '+971 50 555 1234',
    type: 'customer',
    status: 'pending',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Sharjah, UAE',
    joinedDate: '2024-01-20',
  },
  {
    id: '4',
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '+971 50 777 8888',
    type: 'provider',
    status: 'rejected',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.2,
    reviews: 45,
    services: ['Painting', 'Interior Design'],
    location: 'Dubai, UAE',
    joinedDate: '2024-01-05',
    documents: ['ID Copy', 'Portfolio'],
  },
];

export default function AdminUsersScreen() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'provider' | 'customer'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleApproveUser = (userId: string) => {
    Alert.alert(
      'Approve User',
      'Are you sure you want to approve this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            setUsers(users.map(user =>
              user.id === userId ? { ...user, status: 'approved' } : user
            ));
            Alert.alert('Success', 'User approved successfully');
          },
        },
      ]
    );
  };

  const handleRejectUser = (userId: string) => {
    Alert.alert(
      'Reject User',
      'Are you sure you want to reject this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setUsers(users.map(user =>
              user.id === userId ? { ...user, status: 'rejected' } : user
            ));
            Alert.alert('Success', 'User rejected');
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'pending': return '#fef3c7';
      case 'approved': return '#d1fae5';
      case 'rejected': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  const stats = {
    total: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
    rejected: users.filter(u => u.status === 'rejected').length,
    providers: users.filter(u => u.type === 'provider').length,
    customers: users.filter(u => u.type === 'customer').length,
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>User Management</Text>
          <Text style={styles.headerSubtitle}>Approve and manage users</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#f59e0b' }]}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#10b981' }]}>{stats.approved}</Text>
            <Text style={styles.statLabel}>Approved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#ef4444' }]}>{stats.rejected}</Text>
            <Text style={styles.statLabel}>Rejected</Text>
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
                onPress={() => setFilterType('all')}
              >
                <Text style={[styles.filterButtonText, filterType === 'all' && styles.activeFilterText]}>
                  All Users
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, filterType === 'provider' && styles.activeFilter]}
                onPress={() => setFilterType('provider')}
              >
                <Wrench size={16} color={filterType === 'provider' ? 'white' : '#6b7280'} />
                <Text style={[styles.filterButtonText, filterType === 'provider' && styles.activeFilterText]}>
                  Providers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, filterType === 'customer' && styles.activeFilter]}
                onPress={() => setFilterType('customer')}
              >
                <User size={16} color={filterType === 'customer' ? 'white' : '#6b7280'} />
                <Text style={[styles.filterButtonText, filterType === 'customer' && styles.activeFilterText]}>
                  Customers
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.statusFilters}>
          <TouchableOpacity
            style={[styles.statusFilter, filterStatus === 'all' && styles.activeStatusFilter]}
            onPress={() => setFilterStatus('all')}
          >
            <Text style={[styles.statusFilterText, filterStatus === 'all' && styles.activeStatusFilterText]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusFilter, filterStatus === 'pending' && styles.activeStatusFilter]}
            onPress={() => setFilterStatus('pending')}
          >
            <Text style={[styles.statusFilterText, filterStatus === 'pending' && styles.activeStatusFilterText]}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusFilter, filterStatus === 'approved' && styles.activeStatusFilter]}
            onPress={() => setFilterStatus('approved')}
          >
            <Text style={[styles.statusFilterText, filterStatus === 'approved' && styles.activeStatusFilterText]}>
              Approved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusFilter, filterStatus === 'rejected' && styles.activeStatusFilter]}
            onPress={() => setFilterStatus('rejected')}
          >
            <Text style={[styles.statusFilterText, filterStatus === 'rejected' && styles.activeStatusFilterText]}>
              Rejected
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.usersList} showsVerticalScrollIndicator={false}>
          {filteredUsers.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userHeader}>
                <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                <View style={styles.userInfo}>
                  <View style={styles.userNameRow}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(user.status) }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(user.status) }]}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userPhone}>{user.phone}</Text>
                  <View style={styles.userMeta}>
                    <View style={styles.userType}>
                      {user.type === 'provider' ? (
                        <Wrench size={14} color="#6b7280" />
                      ) : (
                        <User size={14} color="#6b7280" />
                      )}
                      <Text style={styles.userTypeText}>
                        {user.type === 'provider' ? 'Service Provider' : 'Customer'}
                      </Text>
                    </View>
                    {user.location && (
                      <View style={styles.userLocation}>
                        <MapPin size={14} color="#6b7280" />
                        <Text style={styles.userLocationText}>{user.location}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {user.type === 'provider' && user.services && (
                <View style={styles.servicesSection}>
                  <Text style={styles.servicesTitle}>Services:</Text>
                  <View style={styles.servicesList}>
                    {user.services.map((service, index) => (
                      <View key={index} style={styles.serviceTag}>
                        <Text style={styles.serviceTagText}>{service}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {user.type === 'provider' && user.rating && (
                <View style={styles.ratingSection}>
                  <View style={styles.ratingRow}>
                    <Star size={16} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{user.rating}</Text>
                    <Text style={styles.reviewsText}>({user.reviews} reviews)</Text>
                  </View>
                </View>
              )}

              <View style={styles.userFooter}>
                <View style={styles.joinedDate}>
                  <Clock size={14} color="#6b7280" />
                  <Text style={styles.joinedDateText}>Joined: {user.joinedDate}</Text>
                </View>
                <View style={styles.actionButtons}>
                  {user.status === 'pending' && (
                    <>
                      <TouchableOpacity
                        style={styles.approveButton}
                        onPress={() => handleApproveUser(user.id)}
                      >
                        <Check size={16} color="white" />
                        <Text style={styles.approveButtonText}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={() => handleRejectUser(user.id)}
                      >
                        <X size={16} color="white" />
                        <Text style={styles.rejectButtonText}>Reject</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  <TouchableOpacity style={styles.viewButton}>
                    <Eye size={16} color="#2563eb" />
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
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
    fontSize: 20,
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
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 4,
  },
  activeFilterText: {
    color: 'white',
  },
  statusFilters: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  statusFilter: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeStatusFilter: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  statusFilterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeStatusFilterText: {
    color: 'white',
  },
  usersList: {
    flex: 1,
  },
  userCard: {
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
  userHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  userMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  userType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTypeText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  userLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLocationText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  servicesSection: {
    marginBottom: 12,
  },
  servicesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  serviceTag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  serviceTagText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  ratingSection: {
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  userFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinedDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinedDateText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  approveButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rejectButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

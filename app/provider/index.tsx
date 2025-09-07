import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Calendar, 
  DollarSign, 
  Star, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  MessageCircle,
  BarChart3
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageRating: number;
  totalReviews: number;
  activeServices: number;
}

interface RecentBooking {
  id: string;
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed';
  amount: number;
}

const mockStats: DashboardStats = {
  totalBookings: 124,
  completedBookings: 98,
  pendingBookings: 8,
  totalRevenue: 12450,
  monthlyRevenue: 2450,
  averageRating: 4.8,
  totalReviews: 89,
  activeServices: 4,
};

const mockRecentBookings: RecentBooking[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    serviceName: 'Plumbing Repair',
    date: '2024-01-25',
    time: '10:00 AM',
    status: 'pending',
    amount: 75,
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    serviceName: 'Electrical Installation',
    date: '2024-01-24',
    time: '2:30 PM',
    status: 'confirmed',
    amount: 120,
  },
  {
    id: '3',
    customerName: 'Emily Davis',
    serviceName: 'HVAC Maintenance',
    date: '2024-01-23',
    time: '9:00 AM',
    status: 'completed',
    amount: 95,
  },
];

export default function ProviderDashboardScreen() {
  const { user } = useAuth();
  const [stats] = useState<DashboardStats>(mockStats);
  const [recentBookings] = useState<RecentBooking[]>(mockRecentBookings);

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
      default:
        return '#f3f4f6';
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    subtitle 
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Icon size={24} color="white" />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );

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
                {user?.name?.split(' ').map(n => n[0]).join('') || 'P'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.providerName}>{user?.name || 'Provider'}</Text>
              <Text style={styles.providerRole}>Service Provider</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              icon={Calendar}
              color="#3b82f6"
            />
            <StatCard
              title="Completed"
              value={stats.completedBookings}
              icon={CheckCircle}
              color="#10b981"
            />
            <StatCard
              title="Pending"
              value={stats.pendingBookings}
              icon={Clock}
              color="#f59e0b"
            />
            <StatCard
              title="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              color="#059669"
            />
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceItem}>
              <View style={styles.performanceIcon}>
                <Star size={20} color="#f59e0b" />
              </View>
              <View style={styles.performanceContent}>
                <Text style={styles.performanceValue}>{stats.averageRating}</Text>
                <Text style={styles.performanceLabel}>Average Rating</Text>
                <Text style={styles.performanceSubtext}>{stats.totalReviews} reviews</Text>
              </View>
            </View>
            
            <View style={styles.performanceItem}>
              <View style={styles.performanceIcon}>
                <TrendingUp size={20} color="#10b981" />
              </View>
              <View style={styles.performanceContent}>
                <Text style={styles.performanceValue}>${stats.monthlyRevenue}</Text>
                <Text style={styles.performanceLabel}>This Month</Text>
                <Text style={styles.performanceSubtext}>Revenue</Text>
              </View>
            </View>
            
            <View style={styles.performanceItem}>
              <View style={styles.performanceIcon}>
                <Users size={20} color="#3b82f6" />
              </View>
              <View style={styles.performanceContent}>
                <Text style={styles.performanceValue}>{stats.activeServices}</Text>
                <Text style={styles.performanceLabel}>Active Services</Text>
                <Text style={styles.performanceSubtext}>Available</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Eye size={16} color="#059669" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.bookingsList}>
            {recentBookings.map((booking) => (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingInfo}>
                    <Text style={styles.customerName}>{booking.customerName}</Text>
                    <Text style={styles.serviceName}>{booking.serviceName}</Text>
                    <Text style={styles.bookingDateTime}>
                      {booking.date} at {booking.time}
                    </Text>
                  </View>
                  <View style={styles.bookingAmount}>
                    <Text style={styles.amountText}>${booking.amount}</Text>
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
                    <TouchableOpacity style={styles.actionButton}>
                      <MessageCircle size={14} color="#6b7280" />
                      <Text style={styles.actionButtonText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Eye size={14} color="#6b7280" />
                      <Text style={styles.actionButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Calendar size={24} color="#059669" />
              <Text style={styles.quickActionText}>View Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <BarChart3 size={24} color="#059669" />
              <Text style={styles.quickActionText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Star size={24} color="#059669" />
              <Text style={styles.quickActionText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Users size={24} color="#059669" />
              <Text style={styles.quickActionText}>My Services</Text>
            </TouchableOpacity>
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginBottom: 2,
  },
  providerName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  providerRole: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  performanceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  performanceContent: {
    flex: 1,
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  performanceSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
  bookingsList: {
    gap: 12,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  serviceName: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  bookingDateTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  bookingAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
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
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
});

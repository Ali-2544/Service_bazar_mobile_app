import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Wrench,
  DollarSign,
  Calendar,
  Clock,
  Star,
  Activity
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface AnalyticsData {
  period: string;
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  activeProviders: number;
  newUsers: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
}

const mockData: { [key: string]: AnalyticsData } = {
  daily: {
    period: 'Today',
    totalUsers: 1247,
    totalBookings: 89,
    totalRevenue: 12450,
    averageRating: 4.7,
    activeProviders: 156,
    newUsers: 23,
    completedBookings: 67,
    pendingBookings: 12,
    cancelledBookings: 10,
  },
  weekly: {
    period: 'This Week',
    totalUsers: 8734,
    totalBookings: 567,
    totalRevenue: 78900,
    averageRating: 4.6,
    activeProviders: 234,
    newUsers: 156,
    completedBookings: 445,
    pendingBookings: 78,
    cancelledBookings: 44,
  },
  monthly: {
    period: 'This Month',
    totalUsers: 34567,
    totalBookings: 2345,
    totalRevenue: 312000,
    averageRating: 4.8,
    activeProviders: 456,
    newUsers: 678,
    completedBookings: 1987,
    pendingBookings: 234,
    cancelledBookings: 124,
  },
  yearly: {
    period: 'This Year',
    totalUsers: 123456,
    totalBookings: 12345,
    totalRevenue: 1567000,
    averageRating: 4.7,
    activeProviders: 789,
    newUsers: 2345,
    completedBookings: 9876,
    pendingBookings: 1234,
    cancelledBookings: 1235,
  },
};

export default function AdminAnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const currentData = mockData[selectedPeriod];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    trend, 
    trendValue 
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    trend?: 'up' | 'down';
    trendValue?: string;
  }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: color }]}>
          <Icon size={20} color="white" />
        </View>
        {trend && trendValue && (
          <View style={[styles.trendContainer, { backgroundColor: trend === 'up' ? '#dcfce7' : '#fee2e2' }]}>
            {trend === 'up' ? (
              <TrendingUp size={12} color="#16a34a" />
            ) : (
              <TrendingDown size={12} color="#ef4444" />
            )}
            <Text style={[styles.trendText, { color: trend === 'up' ? '#16a34a' : '#ef4444' }]}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const ProgressBar = ({ 
    label, 
    value, 
    total, 
    color 
  }: {
    label: string;
    value: number;
    total: number;
    color: string;
  }) => {
    const percentage = (value / total) * 100;
    return (
      <View style={styles.progressItem}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>{label}</Text>
          <Text style={styles.progressValue}>{value}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: color }]} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Analytics Dashboard</Text>
          <Text style={styles.headerSubtitle}>Track your platform performance</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.periodSelector}>
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.activePeriodButton
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.activePeriodButtonText
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.periodInfo}>
          <Calendar size={16} color="#6b7280" />
          <Text style={styles.periodInfoText}>{currentData.period}</Text>
        </View>

        <ScrollView style={styles.analyticsContent} showsVerticalScrollIndicator={false}>
          {/* Key Metrics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Metrics</Text>
            <View style={styles.statsGrid}>
              <StatCard
                title="Total Users"
                value={formatNumber(currentData.totalUsers)}
                icon={Users}
                color="#3b82f6"
                trend="up"
                trendValue="+12%"
              />
              <StatCard
                title="Total Bookings"
                value={formatNumber(currentData.totalBookings)}
                icon={Wrench}
                color="#10b981"
                trend="up"
                trendValue="+8%"
              />
              <StatCard
                title="Revenue"
                value={formatCurrency(currentData.totalRevenue)}
                icon={DollarSign}
                color="#f59e0b"
                trend="up"
                trendValue="+15%"
              />
              <StatCard
                title="Avg Rating"
                value={currentData.averageRating}
                icon={Star}
                color="#8b5cf6"
                trend="up"
                trendValue="+0.2"
              />
            </View>
          </View>

          {/* User Growth */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Growth</Text>
            <View style={styles.growthCard}>
              <View style={styles.growthHeader}>
                <View style={styles.growthIcon}>
                  <Activity size={24} color="#10b981" />
                </View>
                <View style={styles.growthInfo}>
                  <Text style={styles.growthNumber}>+{currentData.newUsers}</Text>
                  <Text style={styles.growthLabel}>New Users</Text>
                </View>
              </View>
              <View style={styles.growthChart}>
                <View style={styles.chartBar} />
                <View style={[styles.chartBar, { height: 60 }]} />
                <View style={[styles.chartBar, { height: 40 }]} />
                <View style={[styles.chartBar, { height: 80 }]} />
                <View style={[styles.chartBar, { height: 30 }]} />
                <View style={[styles.chartBar, { height: 70 }]} />
                <View style={[styles.chartBar, { height: 50 }]} />
              </View>
            </View>
          </View>

          {/* Booking Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Status</Text>
            <View style={styles.progressCard}>
              <ProgressBar
                label="Completed"
                value={currentData.completedBookings}
                total={currentData.totalBookings}
                color="#10b981"
              />
              <ProgressBar
                label="Pending"
                value={currentData.pendingBookings}
                total={currentData.totalBookings}
                color="#f59e0b"
              />
              <ProgressBar
                label="Cancelled"
                value={currentData.cancelledBookings}
                total={currentData.totalBookings}
                color="#ef4444"
              />
            </View>
          </View>

          {/* Provider Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Provider Activity</Text>
            <View style={styles.activityCard}>
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Users size={20} color="#3b82f6" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityValue}>{currentData.activeProviders}</Text>
                  <Text style={styles.activityLabel}>Active Providers</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Clock size={20} color="#f59e0b" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityValue}>
                    {Math.round((currentData.activeProviders / currentData.totalUsers) * 100)}%
                  </Text>
                  <Text style={styles.activityLabel}>Provider Ratio</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Revenue Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
            <View style={styles.revenueCard}>
              <View style={styles.revenueItem}>
                <View style={styles.revenueIcon}>
                  <DollarSign size={20} color="#10b981" />
                </View>
                <View style={styles.revenueInfo}>
                  <Text style={styles.revenueValue}>
                    {formatCurrency(currentData.totalRevenue * 0.7)}
                  </Text>
                  <Text style={styles.revenueLabel}>Service Fees (70%)</Text>
                </View>
              </View>
              <View style={styles.revenueItem}>
                <View style={styles.revenueIcon}>
                  <DollarSign size={20} color="#3b82f6" />
                </View>
                <View style={styles.revenueInfo}>
                  <Text style={styles.revenueValue}>
                    {formatCurrency(currentData.totalRevenue * 0.3)}
                  </Text>
                  <Text style={styles.revenueLabel}>Commission (30%)</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <View style={styles.quickStatsGrid}>
              <View style={styles.quickStatCard}>
                <Text style={styles.quickStatValue}>
                  {Math.round(currentData.totalRevenue / currentData.totalBookings)}
                </Text>
                <Text style={styles.quickStatLabel}>Avg Booking Value</Text>
              </View>
              <View style={styles.quickStatCard}>
                <Text style={styles.quickStatValue}>
                  {Math.round((currentData.completedBookings / currentData.totalBookings) * 100)}%
                </Text>
                <Text style={styles.quickStatLabel}>Completion Rate</Text>
              </View>
              <View style={styles.quickStatCard}>
                <Text style={styles.quickStatValue}>
                  {Math.round(currentData.totalBookings / currentData.activeProviders)}
                </Text>
                <Text style={styles.quickStatLabel}>Bookings/Provider</Text>
              </View>
              <View style={styles.quickStatCard}>
                <Text style={styles.quickStatValue}>
                  {Math.round((currentData.newUsers / currentData.totalUsers) * 100)}%
                </Text>
                <Text style={styles.quickStatLabel}>Growth Rate</Text>
              </View>
            </View>
          </View>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriodButton: {
    backgroundColor: '#dc2626',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activePeriodButtonText: {
    color: 'white',
  },
  periodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  periodInfoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  analyticsContent: {
    flex: 1,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
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
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  growthCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  growthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  growthIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  growthInfo: {
    flex: 1,
  },
  growthNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 4,
  },
  growthLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  growthChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    gap: 4,
  },
  chartBar: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    height: 20,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  revenueCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  revenueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  revenueIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  revenueInfo: {
    flex: 1,
  },
  revenueValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  revenueLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  quickStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickStatCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

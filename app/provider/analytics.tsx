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
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Clock,
  Star,
  Users,
  Activity,
  CheckCircle
} from 'lucide-react-native';

interface AnalyticsData {
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  totalBookings: number;
  completedBookings: number;
  averageRating: number;
  totalReviews: number;
  responseTime: number;
  completionRate: number;
}

interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

interface ServicePerformance {
  serviceName: string;
  bookings: number;
  revenue: number;
  rating: number;
}

const mockAnalytics: AnalyticsData = {
  totalRevenue: 12450,
  monthlyRevenue: 2450,
  weeklyRevenue: 680,
  totalBookings: 124,
  completedBookings: 98,
  averageRating: 4.8,
  totalReviews: 89,
  responseTime: 2.5,
  completionRate: 79,
};

const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 2100, bookings: 18 },
  { month: 'Feb', revenue: 1800, bookings: 15 },
  { month: 'Mar', revenue: 2400, bookings: 20 },
  { month: 'Apr', revenue: 2200, bookings: 19 },
  { month: 'May', revenue: 2800, bookings: 24 },
  { month: 'Jun', revenue: 2450, bookings: 21 },
];

const mockServicePerformance: ServicePerformance[] = [
  { serviceName: 'Plumbing', bookings: 45, revenue: 3600, rating: 4.9 },
  { serviceName: 'Electrical', bookings: 32, revenue: 4200, rating: 4.7 },
  { serviceName: 'HVAC', bookings: 28, revenue: 2800, rating: 4.8 },
  { serviceName: 'Cleaning', bookings: 19, revenue: 1850, rating: 4.6 },
];

export default function ProviderAnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [analytics] = useState<AnalyticsData>(mockAnalytics);
  const [revenueData] = useState<RevenueData[]>(mockRevenueData);
  const [servicePerformance] = useState<ServicePerformance[]>(mockServicePerformance);

  const MetricCard = ({ 
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
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: color }]}>
          <Icon size={20} color="white" />
        </View>
        {trend && trendValue && (
          <View style={[styles.trendBadge, { backgroundColor: trend === 'up' ? '#d1fae5' : '#fee2e2' }]}>
            {trend === 'up' ? (
              <TrendingUp size={12} color="#10b981" />
            ) : (
              <TrendingDown size={12} color="#dc2626" />
            )}
            <Text style={[styles.trendText, { color: trend === 'up' ? '#10b981' : '#dc2626' }]}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
  );

  const RevenueChart = () => (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Revenue Trend</Text>
      <View style={styles.chartContainer}>
        {revenueData.map((data, index) => (
          <View key={data.month} style={styles.chartBar}>
            <View style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: (data.revenue / 3000) * 100,
                    backgroundColor: '#059669'
                  }
                ]} 
              />
            </View>
            <Text style={styles.barLabel}>{data.month}</Text>
            <Text style={styles.barValue}>${data.revenue}</Text>
          </View>
        ))}
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
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSubtitle}>Track your performance and revenue</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.activePeriodButton]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'week' && styles.activePeriodText]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.activePeriodButton]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'month' && styles.activePeriodText]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'year' && styles.activePeriodButton]}
            onPress={() => setSelectedPeriod('year')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'year' && styles.activePeriodText]}>
              Year
            </Text>
          </TouchableOpacity>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Total Revenue"
              value={`$${analytics.totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              color="#059669"
              trend="up"
              trendValue="+12%"
            />
            <MetricCard
              title="Monthly Revenue"
              value={`$${analytics.monthlyRevenue.toLocaleString()}`}
              icon={Calendar}
              color="#3b82f6"
              trend="up"
              trendValue="+8%"
            />
            <MetricCard
              title="Total Bookings"
              value={analytics.totalBookings}
              icon={Users}
              color="#8b5cf6"
              trend="up"
              trendValue="+15%"
            />
            <MetricCard
              title="Completion Rate"
              value={`${analytics.completionRate}%`}
              icon={Activity}
              color="#10b981"
              trend="up"
              trendValue="+3%"
            />
          </View>
        </View>

        {/* Revenue Chart */}
        <View style={styles.section}>
          <RevenueChart />
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
                <Text style={styles.performanceValue}>{analytics.averageRating}</Text>
                <Text style={styles.performanceLabel}>Average Rating</Text>
                <Text style={styles.performanceSubtext}>{analytics.totalReviews} reviews</Text>
              </View>
            </View>
            
            <View style={styles.performanceItem}>
              <View style={styles.performanceIcon}>
                <Clock size={20} color="#3b82f6" />
              </View>
              <View style={styles.performanceContent}>
                <Text style={styles.performanceValue}>{analytics.responseTime}h</Text>
                <Text style={styles.performanceLabel}>Avg Response Time</Text>
                <Text style={styles.performanceSubtext}>To booking requests</Text>
              </View>
            </View>
            
            <View style={styles.performanceItem}>
              <View style={styles.performanceIcon}>
                <CheckCircle size={20} color="#10b981" />
              </View>
              <View style={styles.performanceContent}>
                <Text style={styles.performanceValue}>{analytics.completedBookings}</Text>
                <Text style={styles.performanceLabel}>Completed Bookings</Text>
                <Text style={styles.performanceSubtext}>Out of {analytics.totalBookings} total</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Performance</Text>
          <View style={styles.serviceList}>
            {servicePerformance.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.serviceName}</Text>
                  <View style={styles.serviceRating}>
                    <Star size={14} color="#f59e0b" />
                    <Text style={styles.ratingText}>{service.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.serviceMetrics}>
                  <View style={styles.serviceMetric}>
                    <Text style={styles.metricLabel}>Bookings</Text>
                    <Text style={styles.metricValue}>{service.bookings}</Text>
                  </View>
                  <View style={styles.serviceMetric}>
                    <Text style={styles.metricLabel}>Revenue</Text>
                    <Text style={styles.metricValue}>${service.revenue}</Text>
                  </View>
                </View>
              </View>
            ))}
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
  periodSelector: {
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
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: '#059669',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activePeriodText: {
    color: 'white',
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barContainer: {
    height: 80,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 10,
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
  serviceList: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  serviceMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  serviceMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
});

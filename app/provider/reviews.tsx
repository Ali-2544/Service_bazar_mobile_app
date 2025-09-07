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
  Star, 
  MessageCircle, 
  Calendar,
  User,
  ThumbsUp,
  Filter
} from 'lucide-react-native';

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  serviceName: string;
  rating: number;
  review: string;
  date: string;
  helpful: number;
  isHelpful: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    customerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'Plumbing Repair',
    rating: 5,
    review: 'Excellent service! The plumber was very professional and fixed the issue quickly. Highly recommended!',
    date: '2024-01-20',
    helpful: 12,
    isHelpful: false,
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    customerAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'Electrical Installation',
    rating: 4,
    review: 'Good work overall. The electrician was knowledgeable and completed the installation on time.',
    date: '2024-01-18',
    helpful: 8,
    isHelpful: true,
  },
  {
    id: '3',
    customerName: 'Emily Davis',
    customerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'HVAC Maintenance',
    rating: 5,
    review: 'Outstanding service! The technician was thorough and explained everything clearly. Will definitely use again.',
    date: '2024-01-15',
    helpful: 15,
    isHelpful: false,
  },
  {
    id: '4',
    customerName: 'Ahmed Hassan',
    customerAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'Plumbing Installation',
    rating: 3,
    review: 'Service was okay. The work was completed but took longer than expected. Could be more efficient.',
    date: '2024-01-12',
    helpful: 3,
    isHelpful: false,
  },
  {
    id: '5',
    customerName: 'Lisa Wong',
    customerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    serviceName: 'Electrical Repair',
    rating: 5,
    review: 'Perfect! The electrician was very professional and solved the problem quickly. Great communication throughout.',
    date: '2024-01-10',
    helpful: 20,
    isHelpful: true,
  },
];

export default function ProviderReviewsScreen() {
  const [reviews] = useState<Review[]>(mockReviews);
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(selectedFilter));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color={index < rating ? '#f59e0b' : '#d1d5db'}
        fill={index < rating ? '#f59e0b' : 'transparent'}
      />
    ));
  };

  const handleHelpful = (reviewId: string) => {
    // In a real app, this would update the helpful count
    console.log('Marked review as helpful:', reviewId);
  };

  const handleReply = (reviewId: string) => {
    // In a real app, this would open a reply modal
    console.log('Reply to review:', reviewId);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#059669', '#047857']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Reviews</Text>
          <Text style={styles.headerSubtitle}>Customer feedback and ratings</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Rating Overview */}
        <View style={styles.section}>
          <View style={styles.ratingOverview}>
            <View style={styles.ratingSummary}>
              <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
              <View style={styles.starsContainer}>
                {renderStars(Math.round(averageRating))}
              </View>
              <Text style={styles.totalReviews}>{totalReviews} reviews</Text>
            </View>
            
            <View style={styles.ratingBreakdown}>
              {[5, 4, 3, 2, 1].map((rating) => (
                <View key={rating} style={styles.ratingBar}>
                  <Text style={styles.ratingLabel}>{rating}</Text>
                  <Star size={12} color="#f59e0b" fill="#f59e0b" />
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.bar, 
                        { 
                          width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100}%`,
                          backgroundColor: '#059669'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.barCount}>{ratingDistribution[rating as keyof typeof ratingDistribution]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Filter */}
        <View style={styles.section}>
          <View style={styles.filterContainer}>
            <Filter size={16} color="#6b7280" />
            <Text style={styles.filterLabel}>Filter by rating:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {['all', '5', '4', '3', '2', '1'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter && styles.activeFilterButton
                  ]}
                  onPress={() => setSelectedFilter(filter as any)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedFilter === filter && styles.activeFilterButtonText
                  ]}>
                    {filter === 'all' ? 'All' : `${filter} Stars`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Reviews List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          <View style={styles.reviewsList}>
            {filteredReviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.customerInfo}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {review.customerName.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    <View style={styles.customerDetails}>
                      <Text style={styles.customerName}>{review.customerName}</Text>
                      <Text style={styles.serviceName}>{review.serviceName}</Text>
                    </View>
                  </View>
                  <View style={styles.reviewMeta}>
                    <View style={styles.starsContainer}>
                      {renderStars(review.rating)}
                    </View>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>

                <Text style={styles.reviewText}>{review.review}</Text>

                <View style={styles.reviewActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, review.isHelpful && styles.helpfulButton]}
                    onPress={() => handleHelpful(review.id)}
                  >
                    <ThumbsUp size={14} color={review.isHelpful ? '#059669' : '#6b7280'} />
                    <Text style={[styles.actionButtonText, review.isHelpful && styles.helpfulButtonText]}>
                      Helpful ({review.helpful})
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleReply(review.id)}
                  >
                    <MessageCircle size={14} color="#6b7280" />
                    <Text style={styles.actionButtonText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {filteredReviews.length === 0 && (
          <View style={styles.emptyState}>
            <Star size={48} color="#9ca3af" />
            <Text style={styles.emptyStateTitle}>No reviews found</Text>
            <Text style={styles.emptyStateText}>
              No reviews match the selected filter criteria.
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
  section: {
    marginBottom: 24,
  },
  ratingOverview: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  ratingSummary: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 16,
    color: '#6b7280',
  },
  ratingBreakdown: {
    gap: 8,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    width: 20,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  barCount: {
    fontSize: 12,
    color: '#6b7280',
    width: 20,
    textAlign: 'right',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  filterLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
    marginRight: 12,
  },
  filterScroll: {
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#059669',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  customerDetails: {
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
  },
  reviewMeta: {
    alignItems: 'flex-end',
  },
  reviewDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
    marginBottom: 16,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helpfulButton: {
    // Additional styles for helpful state
  },
  actionButtonText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  helpfulButtonText: {
    color: '#059669',
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

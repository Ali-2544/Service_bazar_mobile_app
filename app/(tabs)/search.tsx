import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  ChevronDown,
} from 'lucide-react-native';

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'plumbing', name: 'Plumbing' },
  { id: 'electrical', name: 'Electrical' },
  { id: 'ac', name: 'AC Repair' },
  { id: 'painting', name: 'Painting' },
  { id: 'cleaning', name: 'Cleaning' },
  { id: 'repair', name: 'General Repair' },
];

const providers = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    service: 'Plumber',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 35,
    distance: 1.2,
    availability: 'Available Now',
    verified: true,
    experience: '8 years',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    service: 'Electrician',
    rating: 4.8,
    reviews: 98,
    hourlyRate: 42,
    distance: 2.1,
    availability: 'Available in 2 hours',
    verified: true,
    experience: '6 years',
  },
  {
    id: 3,
    name: 'Michael Chen',
    service: 'AC Technician',
    rating: 4.7,
    reviews: 156,
    hourlyRate: 38,
    distance: 0.8,
    availability: 'Available Now',
    verified: true,
    experience: '10 years',
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    service: 'House Painter',
    rating: 4.9,
    reviews: 203,
    hourlyRate: 32,
    distance: 3.2,
    availability: 'Available Tomorrow',
    verified: true,
    experience: '12 years',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  const handleProviderPress = (provider: any) => {
    Alert.alert(
      'Provider Selected',
      `${provider.name} - ${provider.service}\nRate: $${provider.hourlyRate}/hr\nThis would open the provider details and booking screen.`
    );
  };

  const handleBookNow = (provider: any) => {
    Alert.alert(
      'Book Service',
      `Book ${provider.name} for ${provider.service}?\nRate: $${provider.hourlyRate}/hr\n\nThis would open the booking confirmation screen.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => Alert.alert('Booking Confirmed!') },
      ]
    );
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          provider.service.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services or providers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort by: Distance</Text>
          <ChevronDown size={16} color="#6b7280" />
        </TouchableOpacity>
        <Text style={styles.resultCount}>
          {filteredProviders.length} providers found
        </Text>
      </View>

      <ScrollView style={styles.providersList} showsVerticalScrollIndicator={false}>
        {filteredProviders.map((provider) => (
          <TouchableOpacity
            key={provider.id}
            style={styles.providerCard}
            onPress={() => handleProviderPress(provider)}
          >
            <View style={styles.providerHeader}>
              <View style={styles.providerInfo}>
                <View style={styles.nameContainer}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  {provider.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.providerService}>{provider.service}</Text>
                <Text style={styles.providerExperience}>{provider.experience} experience</Text>
              </View>
              
              <View style={styles.providerMeta}>
                <Text style={styles.hourlyRate}>${provider.hourlyRate}/hr</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                  <Text style={styles.reviewsText}>({provider.reviews})</Text>
                </View>
              </View>
            </View>

            <View style={styles.providerDetails}>
              <View style={styles.detailItem}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.detailText}>{provider.distance} km away</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.detailText}>{provider.availability}</Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.messageButton}>
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBookNow(provider)}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryChip: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  categoryTextActive: {
    color: 'white',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 4,
  },
  resultCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  providersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  providerCard: {
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
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  providerInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 8,
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    backgroundColor: '#10b981',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  providerService: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 4,
  },
  providerExperience: {
    fontSize: 12,
    color: '#6b7280',
  },
  providerMeta: {
    alignItems: 'flex-end',
  },
  hourlyRate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  ratingContainer: {
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
    marginLeft: 2,
  },
  providerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});
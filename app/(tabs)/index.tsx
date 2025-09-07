import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, MapPin, Star, Clock, Wrench, Zap, Droplets, Paintbrush, Wind, Chrome as HomeIcon } from 'lucide-react-native';

const services = [
  {
    id: 1,
    name: 'Plumbing',
    icon: Droplets,
    color: '#3b82f6',
    providers: 45,
  },
  {
    id: 2,
    name: 'Electrical',
    icon: Zap,
    color: '#eab308',
    providers: 32,
  },
  {
    id: 3,
    name: 'AC Repair',
    icon: Wind,
    color: '#06b6d4',
    providers: 28,
  },
  {
    id: 4,
    name: 'Painting',
    icon: Paintbrush,
    color: '#8b5cf6',
    providers: 38,
  },
  {
    id: 5,
    name: 'General Repair',
    icon: Wrench,
    color: '#f59e0b',
    providers: 52,
  },
  {
    id: 6,
    name: 'Cleaning',
    icon: HomeIcon,
    color: '#10b981',
    providers: 41,
  },
];

const topProviders = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    service: 'Plumber',
    rating: 4.9,
    reviews: 124,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    hourlyRate: 35,
    distance: 1.2,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    service: 'Electrician',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    hourlyRate: 42,
    distance: 2.1,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Downtown, Dubai');

  const handleServicePress = (service: any) => {
    Alert.alert(
      'Service Selected',
      `You selected ${service.name}. This would navigate to the service providers list.`
    );
  };

  const handleProviderPress = (provider: any) => {
    Alert.alert(
      'Provider Selected',
      `You selected ${provider.name}. This would show the provider details and booking options.`
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2563eb', '#1d4ed8']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          
          <Text style={styles.welcomeText}>
            Find trusted professionals for all your home services
          </Text>

          <View style={styles.searchContainer}>
            <Search size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="What service do you need?"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceCard}
                  onPress={() => handleServicePress(service)}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                    <IconComponent size={24} color="white" />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceProviders}>
                    {service.providers} providers
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Providers Nearby</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {topProviders.map((provider) => (
            <TouchableOpacity
              key={provider.id}
              style={styles.providerCard}
              onPress={() => handleProviderPress(provider)}
            >
              <Image source={{ uri: provider.image }} style={styles.providerImage} />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerService}>{provider.service}</Text>
                
                <View style={styles.providerStats}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{provider.rating}</Text>
                    <Text style={styles.reviewsText}>({provider.reviews})</Text>
                  </View>
                  
                  <View style={styles.distanceContainer}>
                    <MapPin size={12} color="#6b7280" />
                    <Text style={styles.distanceText}>{provider.distance} km</Text>
                  </View>
                </View>

                <View style={styles.providerMeta}>
                  <Text style={styles.hourlyRate}>${provider.hourlyRate}/hr</Text>
                  <View style={styles.availabilityBadge}>
                    <View style={styles.availabilityDot} />
                    <Text style={styles.availabilityText}>Available</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.emergencyButton}>
            <View style={styles.emergencyContent}>
              <Clock size={24} color="white" />
              <View style={styles.emergencyText}>
                <Text style={styles.emergencyTitle}>Need Emergency Service?</Text>
                <Text style={styles.emergencySubtitle}>
                  24/7 urgent repair services available
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    lineHeight: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  seeAllText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
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
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceProviders: {
    fontSize: 12,
    color: '#6b7280',
  },
  providerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  providerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  providerService: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  providerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
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
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 2,
  },
  providerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hourlyRate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
    marginRight: 4,
  },
  availabilityText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
  },
  emergencyButton: {
    backgroundColor: '#dc2626',
    borderRadius: 16,
    padding: 20,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyText: {
    marginLeft: 16,
    flex: 1,
  },
  emergencyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  emergencySubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Search,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react-native';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdate: string;
}

const mockFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'How do I book a service?',
    answer: 'To book a service, browse available services, select your preferred provider, choose a date and time, and complete the booking process.',
    category: 'Booking',
  },
  {
    id: '2',
    question: 'How can I cancel a booking?',
    answer: 'You can cancel a booking up to 2 hours before the scheduled time through the app or by contacting support.',
    category: 'Booking',
  },
  {
    id: '3',
    question: 'What payment methods are accepted?',
    answer: 'We accept credit cards, debit cards, and bank transfers. All payments are processed securely.',
    category: 'Payment',
  },
  {
    id: '4',
    question: 'How do I become a service provider?',
    answer: 'Apply through the app by providing your credentials, experience, and required documents. Our team will review your application.',
    category: 'Provider',
  },
  {
    id: '5',
    question: 'How do I rate a service?',
    answer: 'After service completion, you can rate and review the provider through the booking details in your app.',
    category: 'Reviews',
  },
];

const mockTickets: SupportTicket[] = [
  {
    id: '1',
    title: 'Payment issue with booking',
    status: 'resolved',
    priority: 'high',
    createdAt: '2024-01-15',
    lastUpdate: '2024-01-16',
  },
  {
    id: '2',
    title: 'Service provider didn\'t show up',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-01-20',
    lastUpdate: '2024-01-21',
  },
  {
    id: '3',
    title: 'Account verification question',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-01-22',
    lastUpdate: '2024-01-22',
  },
];

export default function HelpSupportScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = ['All', 'Booking', 'Payment', 'Provider', 'Reviews', 'Account'];

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSupport = (method: string) => {
    Alert.alert(
      `Contact Support - ${method}`,
      `This would open ${method.toLowerCase()} to contact our support team.`,
      [{ text: 'OK' }]
    );
  };

  const handleCreateTicket = () => {
    Alert.alert(
      'Create Support Ticket',
      'This would open a form to create a new support ticket with details about your issue.',
      [{ text: 'OK' }]
    );
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    Alert.alert(
      'Support Ticket Details',
      `Title: ${ticket.title}\nStatus: ${ticket.status}\nPriority: ${ticket.priority}\nCreated: ${ticket.createdAt}\nLast Update: ${ticket.lastUpdate}`,
      [{ text: 'OK' }]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle size={16} color="#f59e0b" />;
      case 'in_progress':
        return <Clock size={16} color="#3b82f6" />;
      case 'resolved':
        return <CheckCircle size={16} color="#10b981" />;
      default:
        return <AlertCircle size={16} color="#6b7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return '#fef3c7';
      case 'in_progress':
        return '#dbeafe';
      case 'resolved':
        return '#d1fae5';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <Text style={styles.headerSubtitle}>Get help when you need it</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity style={styles.contactCard} onPress={() => handleContactSupport('Live Chat')}>
              <View style={styles.contactIcon}>
                <MessageCircle size={24} color="#dc2626" />
              </View>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactDescription}>Chat with our support team</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={() => handleContactSupport('Phone')}>
              <View style={styles.contactIcon}>
                <Phone size={24} color="#dc2626" />
              </View>
              <Text style={styles.contactTitle}>Phone</Text>
              <Text style={styles.contactDescription}>Call us directly</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={() => handleContactSupport('Email')}>
              <View style={styles.contactIcon}>
                <Mail size={24} color="#dc2626" />
              </View>
              <Text style={styles.contactTitle}>Email</Text>
              <Text style={styles.contactDescription}>Send us an email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handleCreateTicket}>
              <View style={styles.contactIcon}>
                <HelpCircle size={24} color="#dc2626" />
              </View>
              <Text style={styles.contactTitle}>Create Ticket</Text>
              <Text style={styles.contactDescription}>Submit a support request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Tickets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Support Tickets</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#2563eb" />
            </TouchableOpacity>
          </View>
          <View style={styles.ticketsList}>
            {mockTickets.map((ticket) => (
              <TouchableOpacity
                key={ticket.id}
                style={styles.ticketCard}
                onPress={() => handleViewTicket(ticket)}
              >
                <View style={styles.ticketHeader}>
                  <Text style={styles.ticketTitle}>{ticket.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
                    {getStatusIcon(ticket.status)}
                    <Text style={styles.statusText}>{ticket.status.replace('_', ' ')}</Text>
                  </View>
                </View>
                <Text style={styles.ticketDate}>Created: {ticket.createdAt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Search */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search FAQs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.faqList}>
            {filteredFAQs.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Text style={styles.faqCategory}>{faq.category}</Text>
                </TouchableOpacity>
                {expandedFAQ === faq.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Star size={20} color="#f59e0b" />
              <Text style={styles.quickActionText}>Rate App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <HelpCircle size={20} color="#3b82f6" />
              <Text style={styles.quickActionText}>App Tutorial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <MessageCircle size={20} color="#10b981" />
              <Text style={styles.quickActionText}>Feedback</Text>
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
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
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
    gap: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactCard: {
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
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  ticketsList: {
    gap: 12,
  },
  ticketCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
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
  ticketDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryChipActive: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  categoryTextActive: {
    color: 'white',
  },
  faqList: {
    gap: 8,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  faqCategory: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
});

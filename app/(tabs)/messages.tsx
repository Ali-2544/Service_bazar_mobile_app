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
import { Search, Phone, Video, MoveVertical as MoreVertical, Clock, CheckCheck } from 'lucide-react-native';

const conversations = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    service: 'Plumber',
    lastMessage: 'I can be there in 30 minutes. Is that okay?',
    timestamp: '2 min ago',
    unreadCount: 2,
    online: true,
    avatar: 'AH',
    status: 'confirmed',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    service: 'Electrician',
    lastMessage: 'The wiring issue has been fixed successfully.',
    timestamp: '1 hour ago',
    unreadCount: 0,
    online: false,
    avatar: 'SJ',
    status: 'completed',
  },
  {
    id: 3,
    name: 'Michael Chen',
    service: 'AC Technician',
    lastMessage: 'Thank you for choosing our service!',
    timestamp: '3 hours ago',
    unreadCount: 0,
    online: true,
    avatar: 'MC',
    status: 'completed',
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    service: 'House Painter',
    lastMessage: 'When would be the best time to start?',
    timestamp: '1 day ago',
    unreadCount: 1,
    online: false,
    avatar: 'MR',
    status: 'pending',
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleConversationPress = (conversation: any) => {
    Alert.alert(
      'Open Chat',
      `Opening chat with ${conversation.name}.\nThis would open the full chat interface with message history and real-time messaging.`
    );
  };

  const handleCallPress = (conversation: any) => {
    Alert.alert(
      'Make Call',
      `Call ${conversation.name}?\nThis would initiate a call using the app's calling feature.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Alert.alert('Calling...') },
      ]
    );
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#10b981';
      case 'completed':
        return '#6b7280';
      case 'pending':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.searchContainer}>
          <Search size={18} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <ScrollView style={styles.conversationsList} showsVerticalScrollIndicator={false}>
        {filteredConversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationCard}
            onPress={() => handleConversationPress(conversation)}
          >
            <View style={styles.conversationContent}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{conversation.avatar}</Text>
                </View>
                {conversation.online && <View style={styles.onlineIndicator} />}
              </View>

              <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>{conversation.name}</Text>
                  <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                </View>

                <View style={styles.serviceContainer}>
                  <Text style={styles.serviceText}>{conversation.service}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(conversation.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(conversation.status) }]}>
                      {getStatusText(conversation.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.lastMessageContainer}>
                  <Text
                    style={[
                      styles.lastMessage,
                      conversation.unreadCount > 0 && styles.unreadMessage,
                    ]}
                    numberOfLines={1}
                  >
                    {conversation.lastMessage}
                  </Text>
                  {conversation.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleCallPress(conversation)}
              >
                <Phone size={18} color="#2563eb" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Video size={18} color="#2563eb" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <MoreVertical size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredConversations.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No conversations found</Text>
            <Text style={styles.emptyStateSubtext}>
              Start a conversation by booking a service
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
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
  conversationsList: {
    flex: 1,
  },
  conversationCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: 'white',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  lastMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  unreadMessage: {
    color: '#1f2937',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#2563eb',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
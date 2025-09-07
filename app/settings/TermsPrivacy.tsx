import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  FileText, 
  Shield, 
  Eye, 
  Lock,
  CheckCircle,
  ExternalLink,
  Download,
  Calendar
} from 'lucide-react-native';

interface Document {
  id: string;
  title: string;
  type: 'terms' | 'privacy' | 'cookie' | 'gdpr';
  lastUpdated: string;
  version: string;
  description: string;
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Terms of Service',
    type: 'terms',
    lastUpdated: '2024-01-15',
    version: '2.1',
    description: 'Our terms and conditions for using the service',
  },
  {
    id: '2',
    title: 'Privacy Policy',
    type: 'privacy',
    lastUpdated: '2024-01-10',
    version: '3.0',
    description: 'How we collect, use, and protect your data',
  },
  {
    id: '3',
    title: 'Cookie Policy',
    type: 'cookie',
    lastUpdated: '2024-01-05',
    version: '1.5',
    description: 'Information about cookies and tracking',
  },
  {
    id: '4',
    title: 'GDPR Compliance',
    type: 'gdpr',
    lastUpdated: '2024-01-01',
    version: '1.0',
    description: 'Your rights under GDPR regulations',
  },
];

export default function TermsPrivacyScreen() {
  const [acceptedDocuments, setAcceptedDocuments] = useState<string[]>(['1', '2']);

  const handleViewDocument = (document: Document) => {
    Alert.alert(
      document.title,
      `This would open the full ${document.title} document.\n\nVersion: ${document.version}\nLast Updated: ${document.lastUpdated}\n\n${document.description}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'View Full Document', onPress: () => showFullDocument(document) },
        { text: 'Download PDF', onPress: () => downloadDocument(document) },
      ]
    );
  };

  const showFullDocument = (document: Document) => {
    Alert.alert(
      `Full ${document.title}`,
      `This would display the complete ${document.title} document in a readable format within the app.`,
      [{ text: 'OK' }]
    );
  };

  const downloadDocument = (document: Document) => {
    Alert.alert(
      'Download Document',
      `This would download the ${document.title} as a PDF file to your device.`,
      [{ text: 'OK' }]
    );
  };

  const handleAcceptDocument = (documentId: string) => {
    if (acceptedDocuments.includes(documentId)) {
      setAcceptedDocuments(acceptedDocuments.filter(id => id !== documentId));
      Alert.alert('Document Unaccepted', 'You have unaccepted this document.');
    } else {
      setAcceptedDocuments([...acceptedDocuments, documentId]);
      Alert.alert('Document Accepted', 'You have accepted this document.');
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'terms':
        return <FileText size={24} color="#dc2626" />;
      case 'privacy':
        return <Shield size={24} color="#dc2626" />;
      case 'cookie':
        return <Eye size={24} color="#dc2626" />;
      case 'gdpr':
        return <Lock size={24} color="#dc2626" />;
      default:
        return <FileText size={24} color="#dc2626" />;
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'terms':
        return '#fef2f2';
      case 'privacy':
        return '#eff6ff';
      case 'cookie':
        return '#f0fdf4';
      case 'gdpr':
        return '#fef3c7';
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
          <Text style={styles.headerTitle}>Terms & Privacy</Text>
          <Text style={styles.headerSubtitle}>Legal documents and policies</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Documents List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal Documents</Text>
          <View style={styles.documentsList}>
            {documents.map((document) => (
              <View key={document.id} style={styles.documentCard}>
                <View style={styles.documentHeader}>
                  <View style={styles.documentInfo}>
                    <View style={[styles.documentIcon, { backgroundColor: getDocumentTypeColor(document.type) }]}>
                      {getDocumentIcon(document.type)}
                    </View>
                    <View style={styles.documentDetails}>
                      <Text style={styles.documentTitle}>{document.title}</Text>
                      <Text style={styles.documentDescription}>{document.description}</Text>
                      <View style={styles.documentMeta}>
                        <View style={styles.metaItem}>
                          <Calendar size={12} color="#6b7280" />
                          <Text style={styles.metaText}>{document.lastUpdated}</Text>
                        </View>
                        <Text style={styles.versionText}>v{document.version}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.documentActions}>
                    {acceptedDocuments.includes(document.id) && (
                      <View style={styles.acceptedBadge}>
                        <CheckCircle size={12} color="white" />
                        <Text style={styles.acceptedText}>Accepted</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.documentFooter}>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() => handleViewDocument(document)}
                    >
                      <ExternalLink size={14} color="#2563eb" />
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.downloadButton}
                      onPress={() => downloadDocument(document)}
                    >
                      <Download size={14} color="#6b7280" />
                      <Text style={styles.downloadButtonText}>Download</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[
                        styles.acceptButton,
                        acceptedDocuments.includes(document.id) && styles.acceptButtonActive
                      ]}
                      onPress={() => handleAcceptDocument(document.id)}
                    >
                      <CheckCircle size={14} color={acceptedDocuments.includes(document.id) ? "white" : "#10b981"} />
                      <Text style={[
                        styles.acceptButtonText,
                        acceptedDocuments.includes(document.id) && styles.acceptButtonTextActive
                      ]}>
                        {acceptedDocuments.includes(document.id) ? 'Accepted' : 'Accept'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Privacy Rights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Privacy Rights</Text>
          <View style={styles.rightsCard}>
            <View style={styles.rightItem}>
              <View style={styles.rightIcon}>
                <Shield size={20} color="#10b981" />
              </View>
              <View style={styles.rightDetails}>
                <Text style={styles.rightTitle}>Data Access</Text>
                <Text style={styles.rightDescription}>
                  Request a copy of all personal data we have about you
                </Text>
              </View>
            </View>
            
            <View style={styles.rightItem}>
              <View style={styles.rightIcon}>
                <Eye size={20} color="#10b981" />
              </View>
              <View style={styles.rightDetails}>
                <Text style={styles.rightTitle}>Data Portability</Text>
                <Text style={styles.rightDescription}>
                  Export your data in a machine-readable format
                </Text>
              </View>
            </View>
            
            <View style={styles.rightItem}>
              <View style={styles.rightIcon}>
                <Lock size={20} color="#10b981" />
              </View>
              <View style={styles.rightDetails}>
                <Text style={styles.rightTitle}>Data Deletion</Text>
                <Text style={styles.rightDescription}>
                  Request deletion of your personal data
                </Text>
              </View>
            </View>
            
            <View style={styles.rightItem}>
              <View style={styles.rightIcon}>
                <FileText size={20} color="#10b981" />
              </View>
              <View style={styles.rightDetails}>
                <Text style={styles.rightTitle}>Data Correction</Text>
                <Text style={styles.rightDescription}>
                  Update or correct inaccurate personal information
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal Contact</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Privacy Officer</Text>
            <Text style={styles.contactEmail}>privacy@servicesapp.com</Text>
            <Text style={styles.contactPhone}>+971 4 123 4567</Text>
            <Text style={styles.contactAddress}>
              Services App Legal Department{'\n'}
              Dubai, UAE
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Shield size={20} color="#dc2626" />
              <Text style={styles.quickActionText}>Data Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Lock size={20} color="#dc2626" />
              <Text style={styles.quickActionText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <FileText size={20} color="#dc2626" />
              <Text style={styles.quickActionText}>Report Issue</Text>
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
  documentsList: {
    gap: 12,
  },
  documentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 12,
  },
  documentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentDetails: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  versionText: {
    fontSize: 12,
    color: '#9ca3af',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  documentActions: {
    alignItems: 'flex-end',
  },
  acceptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  acceptedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  documentFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    padding: 20,
    paddingTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  downloadButtonText: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  acceptButtonActive: {
    backgroundColor: '#10b981',
  },
  acceptButtonText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
  },
  acceptButtonTextActive: {
    color: 'white',
  },
  rightsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rightDetails: {
    flex: 1,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  rightDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  contactEmail: {
    fontSize: 16,
    color: '#2563eb',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  contactAddress: {
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

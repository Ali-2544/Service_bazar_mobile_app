import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Wrench,
  Droplets,
  Zap,
  Wind,
  Paintbrush,
  Home as HomeIcon,
  Clock
} from 'lucide-react-native';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  color: string;
  basePrice: number;
  isActive: boolean;
  createdAt: string;
}

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Plumbing',
    category: 'Plumbing',
    description: 'Professional plumbing services for all your water and drainage needs',
    icon: Droplets,
    color: '#3b82f6',
    basePrice: 50,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Electrical',
    category: 'Electrical',
    description: 'Certified electricians for electrical installations and repairs',
    icon: Zap,
    color: '#eab308',
    basePrice: 75,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'AC Repair',
    category: 'HVAC',
    description: 'HVAC specialists for air conditioning maintenance and repair',
    icon: Wind,
    color: '#06b6d4',
    basePrice: 100,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Painting',
    category: 'Painting',
    description: 'Professional painting services for interior and exterior',
    icon: Paintbrush,
    color: '#8b5cf6',
    basePrice: 200,
    isActive: false,
    createdAt: '2024-01-10',
  },
];

export default function AdminServicesScreen() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    name: '',
    category: 'Plumbing',
    description: '',
    icon: 'Wrench',
    color: '#3b82f6',
    basePrice: 0,
    isActive: true,
  });


  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddService = () => {
    if (!newService.name.trim()) {
      Alert.alert('Error', 'Please enter a service name');
      return;
    }

    if (!newService.category.trim()) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (newService.basePrice < 0) {
      Alert.alert('Error', 'Base price cannot be negative');
      return;
    }

    const service: Service = {
      id: Date.now().toString(),
      name: newService.name,
      category: newService.category,
      description: newService.description,
      icon: getIconComponent(newService.icon),
      color: newService.color,
      basePrice: newService.basePrice,
      isActive: newService.isActive,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setServices([...services, service]);
    setNewService({ 
      name: '', 
      category: 'Plumbing',
      description: '', 
      icon: 'Wrench',
      color: '#3b82f6',
      basePrice: 0,
      isActive: true,
    });
    setShowAddModal(false);
    Alert.alert('Success', 'Service added successfully');
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    const iconName = iconOptions.find(icon => icon.component === service.icon)?.name || 'Wrench';
    setNewService({
      name: service.name,
      category: service.category,
      description: service.description,
      icon: iconName,
      color: service.color,
      basePrice: service.basePrice,
      isActive: service.isActive,
    });
    setShowAddModal(true);
  };

  const handleUpdateService = () => {
    if (!newService.name.trim()) {
      Alert.alert('Error', 'Please enter a service name');
      return;
    }

    if (!newService.category.trim()) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (newService.basePrice < 0) {
      Alert.alert('Error', 'Base price cannot be negative');
      return;
    }

    setServices(services.map(service =>
      service.id === editingService?.id
        ? { 
            ...service, 
            name: newService.name, 
            category: newService.category,
            description: newService.description, 
            icon: getIconComponent(newService.icon),
            color: newService.color,
            basePrice: newService.basePrice,
            isActive: newService.isActive,
          }
        : service
    ));

    setEditingService(null);
    setNewService({ 
      name: '', 
      category: 'Plumbing',
      description: '', 
      icon: 'Wrench',
      color: '#3b82f6',
      basePrice: 0,
      isActive: true,
    });
    setShowAddModal(false);
    Alert.alert('Success', 'Service updated successfully');
  };

  const handleDeleteService = (serviceId: string) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setServices(services.filter(service => service.id !== serviceId));
            Alert.alert('Success', 'Service deleted successfully');
          },
        },
      ]
    );
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(service =>
      service.id === serviceId
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const colorOptions = [
    '#3b82f6', '#eab308', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981',
    '#ef4444', '#84cc16', '#f97316', '#ec4899', '#6366f1', '#14b8a6'
  ];

  const categoryOptions = [
    'Plumbing', 'Electrical', 'HVAC', 'Painting', 'Cleaning', 'Repair',
    'Installation', 'Maintenance', 'Landscaping', 'Security', 'Other'
  ];

  const iconOptions = [
    { name: 'Wrench', component: Wrench },
    { name: 'Droplets', component: Droplets },
    { name: 'Zap', component: Zap },
    { name: 'Wind', component: Wind },
    { name: 'Paintbrush', component: Paintbrush },
    { name: 'Home', component: HomeIcon },
    { name: 'Clock', component: Clock },
  ];

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(icon => icon.name === iconName);
    return iconOption ? iconOption.component : Wrench;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Services Management</Text>
          <Text style={styles.headerSubtitle}>Manage all service categories</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{services.length}</Text>
            <Text style={styles.statLabel}>Total Services</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{services.filter(s => s.isActive).length}</Text>
            <Text style={styles.statLabel}>Active Services</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{services.filter(s => !s.isActive).length}</Text>
            <Text style={styles.statLabel}>Inactive Services</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Services</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Plus size={20} color="white" />
            <Text style={styles.addButtonText}>Add Service</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.servicesList} showsVerticalScrollIndicator={false}>
          {filteredServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <View key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <View style={styles.serviceInfo}>
                    <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                      <IconComponent size={24} color="white" />
                    </View>
                    <View style={styles.serviceDetails}>
                      <Text style={styles.serviceName}>{service.name}</Text>
                      <Text style={styles.serviceCategory}>{service.category}</Text>
                      <Text style={styles.serviceDescription}>{service.description}</Text>
                      <View style={styles.serviceMeta}>
                        <Text style={styles.servicePrice}>${service.basePrice}</Text>
                        <Text style={styles.serviceDate}>Created: {service.createdAt}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.serviceActions}>
                    <TouchableOpacity
                      style={[styles.statusButton, { backgroundColor: service.isActive ? '#dcfce7' : '#fee2e2' }]}
                      onPress={() => toggleServiceStatus(service.id)}
                    >
                      <Text style={[styles.statusText, { color: service.isActive ? '#16a34a' : '#dc2626' }]}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditService(service)}
                  >
                    <Edit size={16} color="#2563eb" />
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteService(service.id)}
                  >
                    <Trash2 size={16} color="#dc2626" />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Add/Edit Service Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowAddModal(false);
                setEditingService(null);
                setNewService({ 
                  name: '', 
                  category: 'Plumbing',
                  description: '', 
                  icon: 'Wrench',
                  color: '#3b82f6',
                  basePrice: 0,
                  isActive: true,
                });
              }}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Service Name</Text>
              <TextInput
                style={styles.textInput}
                value={newService.name}
                onChangeText={(text) => setNewService({ ...newService, name: text })}
                placeholder="Enter service name"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <TouchableOpacity 
                style={styles.dropdownContainer}
                onPress={() => {
                  Alert.alert(
                    'Select Category',
                    'Choose a category for this service',
                    categoryOptions.map(category => ({
                      text: category,
                      onPress: () => {
                        setNewService({ ...newService, category });
                      },
                    }))
                  );
                }}
              >
                <Text style={styles.dropdownText}>{newService.category}</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newService.description}
                onChangeText={(text) => setNewService({ ...newService, description: text })}
                placeholder="Enter service description"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Icon</Text>
              <TouchableOpacity 
                style={styles.dropdownContainer}
                onPress={() => {
                  Alert.alert(
                    'Select Icon',
                    'Choose an icon for this service',
                    iconOptions.map(icon => ({
                      text: icon.name,
                      onPress: () => {
                        setNewService({ ...newService, icon: icon.name });
                      },
                    }))
                  );
                }}
              >
                <View style={styles.iconDropdownContent}>
                  {(() => {
                    const IconComponent = getIconComponent(newService.icon);
                    return <IconComponent size={20} color="#6b7280" />;
                  })()}
                  <Text style={styles.dropdownText}>{newService.icon}</Text>
                </View>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Color Theme</Text>
              <View style={styles.colorPicker}>
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      newService.color === color && styles.selectedColor
                    ]}
                    onPress={() => setNewService({ ...newService, color })}
                  />
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Base Price ($)</Text>
              <TextInput
                style={styles.textInput}
                value={newService.basePrice.toString()}
                onChangeText={(text) => {
                  const price = parseFloat(text) || 0;
                  setNewService({ ...newService, basePrice: price });
                }}
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.toggleContainer}>
                <Text style={styles.inputLabel}>Service is active</Text>
                <TouchableOpacity
                  style={[styles.toggle, newService.isActive && styles.toggleActive]}
                  onPress={() => setNewService({ ...newService, isActive: !newService.isActive })}
                >
                  <View style={[styles.toggleThumb, newService.isActive && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={editingService ? handleUpdateService : handleAddService}
            >
              <Text style={styles.saveButtonText}>
                {editingService ? 'Update Service' : 'Create Service'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  servicesList: {
    flex: 1,
  },
  serviceCard: {
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
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceCategory: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 4,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
  },
  serviceDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  serviceActions: {
    alignItems: 'flex-end',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 6,
  },
  editButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fef2f2',
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButtonText: {
    color: '#6b7280',
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#1f2937',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  dropdownButton: {
    padding: 8,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  iconDropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#2563eb',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 4,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1f2937',
  },
  iconDropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

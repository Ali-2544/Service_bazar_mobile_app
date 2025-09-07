import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#dc2626',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="PersonalInformation"
        options={{
          title: 'Personal Information',
        }}
      />
      <Stack.Screen
        name="PaymentMethods"
        options={{
          title: 'Payment Methods',
        }}
      />
      <Stack.Screen
        name="PrivacySecurity"
        options={{
          title: 'Privacy & Security',
        }}
      />
      <Stack.Screen
        name="HelpSupport"
        options={{
          title: 'Help & Support',
        }}
      />
      <Stack.Screen
        name="TermsPrivacy"
        options={{
          title: 'Terms & Privacy',
        }}
      />
    </Stack>
  );
}

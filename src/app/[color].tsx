import { Pressable, Text, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailScreen() {
  const { color } = useLocalSearchParams<{ color: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={{
          position: 'absolute',
          top: insets.top + 8,
          left: 16,
          zIndex: 10,
          backgroundColor: '#eee',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
        }}
      >
        <Text>✕ Close</Text>
      </Pressable>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Detail: {color}
      </Text>
      <Text style={{ marginTop: 16, color: '#888' }}>
        Drag down to dismiss (zoom transition)
      </Text>
    </View>
  );
}

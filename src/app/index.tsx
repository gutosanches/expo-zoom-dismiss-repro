import { Pressable, ScrollView, Text, View } from "react-native";

import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ITEMS = ["red", "blue", "green", "orange", "purple"];

export default function ListScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
        gap: 16,
        paddingHorizontal: 20,
        paddingBottom: 80,
        paddingTop: insets.top + 20,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Zoom Transition Repro
      </Text>
      <Text style={{ color: "#888" }}>
        Tap a card, then drag down to dismiss
      </Text>

      {ITEMS.map((color, i) => (
        <Link
          key={color}
          href={`/${color}`}
          asChild
        >
          <Link.AppleZoom>
            <Pressable>
              <View
                style={{
                  height: 128,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  Card {i + 1} — {color}
                </Text>
              </View>
            </Pressable>
          </Link.AppleZoom>
        </Link>
      ))}
    </ScrollView>
  );
}

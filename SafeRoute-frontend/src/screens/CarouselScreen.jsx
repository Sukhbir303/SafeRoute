import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    title: "SafeRoute SOS",
    description:
      "An AI-powered invisible safety and smart navigation system designed to protect you throughout every journey.",
    image: {
      uri: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    },
  },
  {
    title: "AI-Powered Safe Navigation",
    description:
      "Routes are intelligently analyzed using risk zones, lighting conditions, and real-time safety signals.",
    image: {
      uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  },
  {
    title: "Invisible SOS Activation",
    description:
      "Trigger emergency alerts discreetly using gestures, button patterns, or wearable integrations.",
    image: {
      uri: "https://images.unsplash.com/photo-1600267165521-6c9f9f58c2a0",
    },
  },
  {
    title: "Trusted Circle Protection",
    description:
      "Instantly notify trusted contacts, nearby helpers, and emergency services when danger is detected.",
    image: {
      uri: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
  },
  {
    title: "Privacy & Security First",
    description:
      "Your data is encrypted, shared only when needed, and automatically deleted after each journey.",
    image: {
      uri: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    },
  },
];

export default function CarouselScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const { markCarouselSeen } = useAuth();

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  });

  const handleContinue = () => {
    markCarouselSeen();
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 60 }}
        renderItem={({ item }) => (
          <ImageBackground source={item.image} style={styles.slide}>
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </ImageBackground>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, index === i && styles.activeDot]}
          />
        ))}
      </View>

      {/* Continue Button (Only on last slide) */}
      {index === slides.length - 1 && (
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.85}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  slide: {
    width,
    height,
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(2, 6, 23, 0.72)",
    paddingHorizontal: 32,
    paddingVertical: 40,
    marginHorizontal: 20,
    borderRadius: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    lineHeight: 24,
  },
  pagination: {
    position: "absolute",
    bottom: 110,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#475569",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#38BDF8",
    width: 20,
  },
  continueButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#38BDF8",
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 5,
  },
  continueText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

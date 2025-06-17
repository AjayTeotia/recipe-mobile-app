import { recipeCardStyles } from "@/assets/styles/home.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const RecipeCard = ({ recipe }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={recipeCardStyles.container}
      onPress={() => router.push(`/recipe/${recipe.id}`)}
      activeOpacity={0.8}
    >
      <View style={recipeCardStyles.imageContainer}>
        <Image
          source={{ uri: recipe.image }}
          style={recipeCardStyles.image}
          contentFit="cover"
          transition={300}
        />
      </View>

      <View style={recipeCardStyles.content}>
        {/* Title */}
        <Text style={recipeCardStyles.title} numberOfLines={2}>
          {recipe.title}
        </Text>

        {/* Description */}
        {recipe.description && (
          <Text style={recipeCardStyles.description} numberOfLines={2}>
            {recipe.description}
          </Text>
        )}

        {/* Footer */}
        <View style={recipeCardStyles.footer}>
          {/* Cook time */}
          {recipe.cookTime && (
            <View style={recipeCardStyles.timeContainer}>
              <Ionicons
                name="time-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={recipeCardStyles.timeText}>{recipe.cookTime}</Text>
            </View>
          )}

          {/* Serving count */}
          {recipe.servings && (
            <View style={recipeCardStyles.servingsContainer}>
              <Ionicons
                name="people-outline"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={recipeCardStyles.servingsText}>
                {recipe.servings}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

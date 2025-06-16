import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Linking, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { user } = useUser();

  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}

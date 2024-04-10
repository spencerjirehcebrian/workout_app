import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await Font.loadAsync({
          neon: require("../assets/fonts/TiltNeon-Regular.ttf"),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoadingComplete(true);
        console.log("Fonts Loaded");
      }
    };
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

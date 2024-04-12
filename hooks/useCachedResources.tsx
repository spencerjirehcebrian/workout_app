import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { containsKey, getData, storeData } from "../storage";
import data from "../data.json";
import { clearWorkouts, getWorkouts, initWorkouts } from "../storage/workout";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        // await clearWorkouts();
        await initWorkouts();
        await Font.loadAsync({
          neon: require("../assets/fonts/TiltNeon-Regular.ttf"),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        const workouts = await getWorkouts();
        console.log(workouts);
        setIsLoadingComplete(true);
        console.log("Fonts Loaded");
      }
    };
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

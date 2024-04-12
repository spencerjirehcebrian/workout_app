import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getWorkouts } from "../storage/workout";
import { Workout } from "../types/data";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isFocused = useIsFocused();
  // console.log("is Focused", isFocused);

  useEffect(() => {
    async function getData() {
      // console.log("Getting Data");
      const _workouts = await getWorkouts();
      setWorkouts(_workouts);
    }
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  return workouts;
};

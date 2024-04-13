import { containsKey, getData, removeItem, storeData } from ".";
import data from "../data.json";
import { Workout } from "../types/data";

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getData("workout-data");
  return workouts;
};
export const initWorkouts = async (): Promise<boolean> => {
  const hasWorkouts = await containsKey("workout-data");
  if (!hasWorkouts) {
    console.log("Storing data");
    await storeData("workout-data", data);
    return true;
  }
  return false;
};

export const clearWorkouts = async (): Promise<void> => {
  await removeItem("workout-data");
};
export const getWorkoutBySlug = async (slug: string): Promise<Workout> => {
  const workouts = await getWorkouts();
  const workout = workouts.filter((w) => w.slug === slug)[0];
  return workout;
};

export const storeWorkout = async (newWorkout: Workout): Promise<boolean> => {
  const workouts = await getWorkouts();
  console.log(workouts);
  await storeData("workout-data", [...workouts, newWorkout]);
  return true;
};

export type Difficulty = "easy" | "normal" | "hard";
export type SequenceType = "exercise" | "stretch" | "break";
export interface Workout {
  slug: string;
  name: string;
  duration: number;
  difficulty: Difficulty;
  sequence: Array<>;
}
export interface SequenceItem {
  slug: string;
  name: string;
  type: SequenceType;
  reps?: number;
  duration: number;
}

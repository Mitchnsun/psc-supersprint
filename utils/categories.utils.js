/* eslint-disable import/prefer-default-export */
import isEmpty from "lodash/isEmpty"

export const CATEGORIES = [
  { id: "V", label: "Vétéran", min: 40, max: 99 },
  { id: "S", label: "Senior", min: 20, max: 39 },
  { id: "J", label: "Juniors", min: 18, max: 19 },
  { id: "C", label: "Cadets", min: 16, max: 17 },
  { id: "M", label: "Minimes", min: 14, max: 15 },
  { id: "B", label: "Benjamins", min: 12, max: 13 },
];
export const categoryFromBirthYear = year => {
  const today = new Date().getFullYear();
  const age = today - year;
  const category = CATEGORIES.find(cat => cat.min <= age && age <= cat.max);
  return !isEmpty(category) ? category : { id: "S", label: "Senior", min: 20, max: 39 };
}

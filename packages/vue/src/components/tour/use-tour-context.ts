import { createContext } from "../../utils";
import type { UseTourReturn } from "./use-tour";

export interface UseTourContext extends UseTourReturn {}

export const [TourProvider, useTourContext] =
	createContext<UseTourContext>("TourContext");

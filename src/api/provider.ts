import { analyzer as analyzerImpl } from "../analyzer";
import { Analyzer, Verifier } from "./types";
import { verifier as verifierImpl } from "../verifier";

export const verifier: Verifier = verifierImpl;
export const analyzer: Analyzer = analyzerImpl;
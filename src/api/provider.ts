import { analyzer as analyzerImpl } from "../impl/analyzer";
import { Analyzer, Verifier } from "./types";
import { verifier as verifierImpl } from "../impl/verifier";

export const verifier: Verifier = verifierImpl;
export const analyzer: Analyzer = analyzerImpl;
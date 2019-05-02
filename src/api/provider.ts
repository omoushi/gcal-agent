import { analyzer as analyzerImpl } from "../impl/analyzer";
import { Analyzer, GasApiProxy, Verifier } from "./types";
import { verifier as verifierImpl } from "../impl/verifier";
import { gasApiProxy as gasApiProxyImpl } from "../impl/gas";

export const verifier: Verifier = verifierImpl;
export const analyzer: Analyzer = analyzerImpl;
export const gasApiProxy: GasApiProxy = gasApiProxyImpl;
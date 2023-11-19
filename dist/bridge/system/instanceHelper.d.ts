import { AbstractedObject } from "./abstracted.js";
export declare function getNativeInstanceUnsafe(klass: Il2Cpp.Class): Il2Cpp.Object;
export declare function getNativeInstance(klass: Il2Cpp.Class): Promise<Il2Cpp.Object>;
export declare function checkEquality(a: Il2Cpp.Field.Type | AbstractedObject, b: Il2Cpp.Field.Type | AbstractedObject): boolean;

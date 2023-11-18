import { AbstractedObject } from "./abstracted.js";

export function getNativeInstanceUnsafe(klass: Il2Cpp.Class): Il2Cpp.Object {
    return klass.field("instance").value as Il2Cpp.Object
}
export function getNativeInstance(klass: Il2Cpp.Class): Promise<Il2Cpp.Object> {
    return new Promise((resolve, reject)=>{
        const nativeObj = getNativeInstanceUnsafe(klass);
        if (nativeObj.handle.equals(0x0)) reject("Native instance is null");
        else resolve(nativeObj);
    })
}

export function checkEquality(a: Il2Cpp.Field.Type | AbstractedObject, b: Il2Cpp.Field.Type | AbstractedObject): boolean {
    const a2: Il2Cpp.Field.Type = a instanceof AbstractedObject ? a.object : a;
    const b2: Il2Cpp.Field.Type = b instanceof AbstractedObject ? b.object : b;
    if (a instanceof NativeStruct && b instanceof NativeStruct &&
        a.handle.equals(b.handle))
        return true; // NativeStructs are compared by handle
    else if (a === b)
        return true; // Other types are compared 
    else
        return false;
}
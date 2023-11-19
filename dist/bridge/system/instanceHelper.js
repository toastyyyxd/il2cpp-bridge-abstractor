import { AbstractedObject } from "./abstracted.js";
export function getNativeInstanceUnsafe(klass) {
    return klass.field("instance").value;
}
export function getNativeInstance(klass) {
    return new Promise((resolve, reject) => {
        const nativeObj = getNativeInstanceUnsafe(klass);
        if (nativeObj.handle.equals(0x0))
            reject("Native instance is null");
        else
            resolve(nativeObj);
    });
}
export function checkEquality(a, b) {
    const a2 = a instanceof AbstractedObject ? a.object : a;
    const b2 = b instanceof AbstractedObject ? b.object : b;
    if (a instanceof NativeStruct && b instanceof NativeStruct &&
        a.handle.equals(b.handle))
        return true; // NativeStructs are compared by handle
    else if (a === b)
        return true; // Other types are compared 
    else
        return false;
}
//# sourceMappingURL=instanceHelper.js.map
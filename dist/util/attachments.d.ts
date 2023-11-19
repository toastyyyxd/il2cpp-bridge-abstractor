/// <reference types="node" />
/// <reference types="frida-gum" />
export declare class AttachmentCollection<Attachment extends {}> {
    cleanupInterval: NodeJS.Timeout;
    attachments: Map<number, [number, Attachment]>;
    constructor(cleanupDelay?: number);
    set(handle: NativePointer, attachment: Attachment, lifetime?: number): void;
    merge(handle: NativePointer, attachment: Attachment, lifetime?: number): void;
    get(handle: NativePointer): Attachment | undefined;
    delete(handle: NativePointer): boolean;
    has(handle: NativePointer): boolean;
    keepAlive(handle: NativePointer, lifetime?: number): boolean;
}

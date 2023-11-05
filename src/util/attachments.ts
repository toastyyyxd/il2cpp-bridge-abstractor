export class AttachmentCollection<Attachment extends {}> {
    cleanupInterval: NodeJS.Timeout;
    attachments = new Map<number, [number, Attachment]>();

    constructor(cleanupDelay: number = 2500) {
        this.cleanupInterval = setInterval(() => {
            for (const handle of this.attachments.keys()) {
                const attachment = this.attachments.get(handle)!;
                attachment[0] -= cleanupDelay;
                if (attachment[0] <= 0) {
                    this.attachments.delete(handle);
                }
            }
        }, cleanupDelay)
    }

    set(handle: NativePointer, attachment: Attachment, lifetime: number = 5000) {
        const handleKey = handle.toUInt32();
        this.attachments.set(handleKey, [lifetime, attachment]);
    }
    merge(handle: NativePointer, attachment: Attachment, lifetime: number = 5000) {
        const handleKey = handle.toUInt32();
        if (!this.attachments.has(handleKey)) {
            this.attachments.set(handleKey, [lifetime, attachment]);
        } else {
            Object.assign(this.attachments.get(handleKey)![1], attachment);
        }
    }

    get(handle: NativePointer): Attachment | undefined {
        const handleKey = handle.toUInt32();
        return this.attachments.get(handleKey)?.[1];
    }

    delete(handle: NativePointer): boolean {
        const handleKey = handle.toUInt32();
        return this.attachments.delete(handleKey);
    }

    has(handle: NativePointer): boolean {
        const handleKey = handle.toUInt32();
        return this.attachments.has(handleKey);
    }

    keepAlive(handle: NativePointer, lifetime: number = 5000): boolean {
        const handleKey = handle.toUInt32();
        if (!this.attachments.has(handleKey)) return false;
        this.attachments.get(handleKey)![0] = lifetime;
        return true;
    }
}
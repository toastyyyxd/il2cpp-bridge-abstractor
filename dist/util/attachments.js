export class AttachmentCollection {
    cleanupInterval;
    attachments = new Map();
    constructor(cleanupDelay = 2500) {
        this.cleanupInterval = setInterval(() => {
            for (const handle of this.attachments.keys()) {
                const attachment = this.attachments.get(handle);
                attachment[0] -= cleanupDelay;
                if (attachment[0] <= 0) {
                    this.attachments.delete(handle);
                }
            }
        }, cleanupDelay);
    }
    set(handle, attachment, lifetime = 5000) {
        const handleKey = handle.toUInt32();
        this.attachments.set(handleKey, [lifetime, attachment]);
    }
    merge(handle, attachment, lifetime = 5000) {
        const handleKey = handle.toUInt32();
        if (!this.attachments.has(handleKey)) {
            this.attachments.set(handleKey, [lifetime, attachment]);
        }
        else {
            Object.assign(this.attachments.get(handleKey)[1], attachment);
        }
    }
    get(handle) {
        const handleKey = handle.toUInt32();
        return this.attachments.get(handleKey)?.[1];
    }
    delete(handle) {
        const handleKey = handle.toUInt32();
        return this.attachments.delete(handleKey);
    }
    has(handle) {
        const handleKey = handle.toUInt32();
        return this.attachments.has(handleKey);
    }
    keepAlive(handle, lifetime = 5000) {
        const handleKey = handle.toUInt32();
        if (!this.attachments.has(handleKey))
            return false;
        this.attachments.get(handleKey)[0] = lifetime;
        return true;
    }
}
//# sourceMappingURL=attachments.js.map
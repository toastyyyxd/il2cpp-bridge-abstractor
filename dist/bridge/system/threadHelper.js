let il2cpp_thread_get_all_attached_threadsStripped = false;
export async function isMainThreadReady() {
    try {
        const thread = Il2Cpp.mainThread;
        const get_ExecutionContext = thread.object.tryMethod("GetMutableExecutionContext") ?? thread.object.method("get_ExecutionContext");
        const executionContext = get_ExecutionContext.invoke();
        let synchronizationContext = executionContext.tryField("_syncContext")?.value ??
            executionContext.tryMethod("get_SynchronizationContext")?.invoke() ??
            thread.tryLocalValue(Il2Cpp.corlib.class("System.Threading.SynchronizationContext"));
        return synchronizationContext != null && !synchronizationContext.isNull();
    }
    catch {
        return await isMainThreadReadyFallback();
    }
}
async function isMainThreadReadyFallback() {
    return await Il2Cpp.perform(() => {
        let i = 0;
        i++;
        return true;
    }, 'main').catch(() => false);
}
//# sourceMappingURL=threadHelper.js.map
export async function isMainThreadReady() {
    const thread = Il2Cpp.mainThread;
    const get_ExecutionContext = thread.object.tryMethod("GetMutableExecutionContext") ?? thread.object.method("get_ExecutionContext");
    const executionContext = get_ExecutionContext.invoke();
    let synchronizationContext = executionContext.tryField("_syncContext")?.value ??
        executionContext.tryMethod("get_SynchronizationContext")?.invoke() ??
        thread.tryLocalValue(Il2Cpp.corlib.class("System.Threading.SynchronizationContext"));
    return synchronizationContext != null && !synchronizationContext.isNull();
}
//# sourceMappingURL=threadHelper.js.map
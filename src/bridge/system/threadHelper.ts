interface Thread extends Il2Cpp.Thread {
    tryLocalValue<T extends Il2Cpp.Object>(klass: Il2Cpp.Class): T | null;
}

export async function isMainThreadReady() : Promise<boolean> {
    const thread = Il2Cpp.mainThread as Thread;

    const get_ExecutionContext = thread.object.tryMethod<Il2Cpp.Object>("GetMutableExecutionContext") ?? thread.object.method<Il2Cpp.Object>("get_ExecutionContext");
    const executionContext = get_ExecutionContext.invoke();

    let synchronizationContext = executionContext.tryField<Il2Cpp.Object>("_syncContext")?.value ??
        executionContext.tryMethod<Il2Cpp.Object>("get_SynchronizationContext")?.invoke() ??
        thread.tryLocalValue<Il2Cpp.Object>(Il2Cpp.corlib.class("System.Threading.SynchronizationContext"));
    return synchronizationContext != null && !synchronizationContext.isNull();
}
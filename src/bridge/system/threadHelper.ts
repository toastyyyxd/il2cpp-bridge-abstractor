interface Thread extends Il2Cpp.Thread {
    tryLocalValue<T extends Il2Cpp.Object>(klass: Il2Cpp.Class): T | null;
}

let il2cpp_thread_get_all_attached_threadsStripped = false;
export async function isMainThreadReady() : Promise<boolean> {
    try {
        const thread = Il2Cpp.mainThread as Thread;
        const get_ExecutionContext = thread.object.tryMethod<Il2Cpp.Object>("GetMutableExecutionContext") ?? thread.object.method<Il2Cpp.Object>("get_ExecutionContext");
        const executionContext = get_ExecutionContext.invoke();

        let synchronizationContext = executionContext.tryField<Il2Cpp.Object>("_syncContext")?.value ??
            executionContext.tryMethod<Il2Cpp.Object>("get_SynchronizationContext")?.invoke() ??
            thread.tryLocalValue<Il2Cpp.Object>(Il2Cpp.corlib.class("System.Threading.SynchronizationContext"));
        return synchronizationContext != null && !synchronizationContext.isNull();
    } catch {
        return await isMainThreadReadyFallback()
    }
}
async function isMainThreadReadyFallback(): Promise<boolean> {
    try {
        Il2Cpp.perform(() => {
            let i = 0;
            i++;
        }, 'main');
    }
    catch {
        return false;
    } finally {
        return true;
    }
}
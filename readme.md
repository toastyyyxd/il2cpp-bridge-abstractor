### Note: This repo is meant for a personal project, you're welcome to use it but I encourage you to make a fork or just make your own.
This repo is subject to change at any time, with or without notice.

# Design structure
Currently the code is sortof a mess, I'm working on cleaning it up and making it more modular. The planned structure is as follows:
## Base Design
`AbstractedObject` is the base class for all abstracted objects.
## AbstractedObject Design
`native` is the property that is used to reference the Il2Cpp.Object that the abstraction is linked to, while inside the class. `object` is the getter for `native` and is readonly and public.
`constructor` is the constructor for the class, it takes a native object as a parameter and links the abstraction to it. `abstractify` is an alias for `constructor`, and for the sake of consistency, it is recommended to use `abstractify` instead of `constructor`.
## Design Guide for Classes that inherit from AbstractedObject 
**Note:** If you're trying to abstract a C# struct, read the next part instead.
**Note:** Abstraction should only be used on objects that are instances of `NativeStruct`, otherwise it would be unnecessary.
1. All classes that inherit from AbstractedObject should override the `native` and `object` properties to suit their needs. For example, `AbstractedArray` overrides `native` to be an `Il2Cpp.Array` instead of an `Il2Cpp.Object`.
2. All classes that inherit from AbstractedObject should override the `constructor` and `abstractify` methods to suit their needs. For example, `AbstractedArray` overrides `constructor` to take an `Il2Cpp.Array` instead of an `Il2Cpp.Object`.
3. Classes that allow creation of new instances should have a static `create` method that returns a new instance of the class. If the class can store data, such as `AbstractedArray`, it should have a static `createEmpty` method that returns a new instance of the class with no data.
## Abstracting C# Structs
Since structs are value types, there is no need to have anything linked to an object, therefore they do not need to inherit from `AbstractedObject`.
Instead, according to your needs you should create your own class.
For example, if you want to abstract `UnityEngine.Vector3`, you should create a class called `KeyValuePair` that has the following methods:
- public static `constructor(k: Il2Cpp.Object, v: Il2Cpp.Object)` - Creates a new instance of the class with the specified values.
- public static `abstractify(nativeObject: Il2Cpp.ValueType)` - Same as constructor, but takes the values from the native object.
- public `deabstractify()` - Creates a new C# object with the values from the abstraction.
There's no need for a `native` property, since there's no object to link to (ValueType objects are passed by value, not by reference).


# Documentation
## Base AbstractedObject Class
`AbstractedObject` is the base class for all abstracted objects.
Properties:
- protected `native` - The `Il2Cpp.Object` that this class is abstracting.
- public getter `object` - same as `native` but readonly and public.
Methods:
- public static `constructor(native: Il2Cpp.Object)` - Creates new abstraction object linked to a native object.
- public static `abtractify(native: Il2Cpp.Object)` - Same as constructor

declare type NoopDecorator = (_target: object, _propertyKey: string, _descriptor?: PropertyDescriptor) => void;
declare global {
    /**
     * Indicates that this function or variable is being overridden
     * from the implemented or extended parent class.
     *
     * @see [TSLint Override](https://github.com/hmil/tslint-override)
     */
    var override: NoopDecorator;
    /**
     * Indicates that this function or variable is being overridden
     * from the implemented or extended parent class.
     *
     * @see [TSLint Override](https://github.com/hmil/tslint-override)
     */
    var Override: NoopDecorator;
    interface Window {
        override: NoopDecorator;
        Override: NoopDecorator;
    }
    interface WorkerGlobalScope {
        override: NoopDecorator;
        Override: NoopDecorator;
    }
    namespace NodeJS {
        interface Global {
            override: NoopDecorator;
            Override: NoopDecorator;
        }
    }
}
export declare const ctx: NodeJS.Global | undefined;
export declare const override: NoopDecorator;
export declare const Override: NoopDecorator;
export {};

declare const _default: {
    title: string;
    component: import("preact").FunctionalComponent<import("./Button.tsx").ButtonProps>;
    tags: string[];
    argTypes: {
        backgroundColor: {
            control: string;
        };
        onClick: {
            action: string;
        };
    };
    args: {
        onClick: import("vitest").Mock<(...args: any[]) => any>;
    };
};
export default _default;
export declare const Primary: {
    args: {
        primary: boolean;
        label: string;
    };
};
export declare const Secondary: {
    args: {
        label: string;
    };
};
export declare const Large: {
    args: {
        size: string;
        label: string;
    };
};
export declare const Small: {
    args: {
        size: string;
        label: string;
    };
};

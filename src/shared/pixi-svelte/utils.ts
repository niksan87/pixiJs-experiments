import { getContext } from 'svelte';

export const addInstance = (self: any): void => {
    const parent = getContext('pixi-container') || getContext('pixi-stage');

    if (parent) {
        parent.addChild(self);

        return () => {
            parent && parent.removeChild(self);
        };
    } else {
        throw new Error('Unable to find container or stage');
    }
};

export const applyProps = (
    instance,
    props,
    applyProp = (key, value) => value
) => {
    for (const prop in props) {
        if (prop in instance) {
            let val = applyProp(prop, props[prop]);
            val = (val === 'true' || val === true) ? Boolean(val): val;
            instance[prop] = val;
        }
    }
};

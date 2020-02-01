<script>
    import * as PIXI from 'pixi.js';
    import { onMount, beforeUpdate, setContext, getContext } from 'svelte';
    import { addInstance, applyProps } from './utils';

    const self = new PIXI.Container();
    const removeSelf = addInstance(self);

    setContext('pixi-container', self);

    beforeUpdate(() => {
        applyProps(self, $$props);
    });

    onMount(() => {
        return () => {
            removeSelf();
            setContext('pixi-container', undefined);
        };
    });
</script>

<slot />

<script>
    import * as PIXI from 'pixi.js';
    import { onMount, beforeUpdate, setContext, getContext } from 'svelte';
    import { addInstance, applyProps, Container, Sprite, Text } from '@shared';
    import { Slot } from '@modules';

    const self = new Slot();
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

<Text name="SLOT" text="SLOT BATENCE !" />

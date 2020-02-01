<script>
    import {
        onMount,
        beforeUpdate,
        setContext,
        getContext,
        createEventDispatcher
    } from 'svelte';
    import { addInstance, applyProps, Container, Sprite, Text } from '@shared';
    import { Background } from '@modules';

    const self = new Background(PIXI.Texture.EMPTY);
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

    const dispatcher = createEventDispatcher();

    self.on('click', () => {
        console.log('BG_CLICK');
        dispatcher('BG_CLICK', self);
    });
</script>

<slot />

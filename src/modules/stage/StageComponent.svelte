<script>
    import * as PIXI from 'pixi.js';
    import {
        onMount,
        beforeUpdate,
        setContext,
        getContext,
        createEventDispatcher
    } from 'svelte';

    import { addInstance, applyProps, Container, Sprite, Text } from '@shared';
    import { Stage, SlotComponent, BackgroundComponent } from '@modules';

    export const instance = new Stage();
    // instance.interactive = true;
    // instance.buttonMode = true;
    // instance.on('click', () => console.log(55));
    export let currentWidth = window.innerWidth;
    export let currentHeight = window.innerHeight;

    setContext('pixi-stage', instance);

    function handleMouseUp(data) {
        data.detail.clicked = !data.detail.clicked;
        console.log(data.detail.clicked);
        currentWidth = data.detail.clicked
            ? currentWidth - currentWidth / 2
            : currentWidth + currentWidth;
        currentHeight = data.detail.clicked
            ? currentHeight - currentHeight / 2
            : currentHeight + currentHeight;
    }

    function handleResize() {
        currentWidth = window.innerWidth;
        currentHeight = window.innerHeight;
    }
</script>

<BackgroundComponent
    texture={PIXI.Texture.from(`../src/media/basic-texture.jpg`)}
    width={currentWidth}
    height={currentHeight}
    interactive="true"
    buttonMode="true"
    on:BG_CLICK={handleMouseUp} />

<svelte:window on:resize={handleResize} />

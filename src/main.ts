import { Context, StageComponent } from '@modules';

PIXI.WebGLRenderer = PIXI.Renderer;
window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });


window.onload = () => {
    const context = new Context();    
};

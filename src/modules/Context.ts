import { Renderer, Ticker, Container } from '@shared';
import { Stage, StageComponent } from '@modules';

export class Context {
    protected renderer: Renderer;
    protected stage: PIXI.Container;
    protected ticker: Ticker;
    protected num: number = 0;
    protected canvas: HTMLCanvasElement;

    constructor() {
        window.loader = new PIXI.Loader();
        this.renderer = new Renderer();
        this.canvas = this.renderer.view;
        this.stage = new StageComponent({target: document.body}).instance;
        this.ticker = new Ticker();
        this.ticker.add(this.animate, this);
        this.ticker.start();
    }

    animate() {
        this.renderer.render(this.stage);
    }

}

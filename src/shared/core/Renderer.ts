export class Renderer extends PIXI.Renderer {
    constructor() {
        super({
            view: document.createElement('canvas'),
            // resolution: window.devicePixelRatio,
            // autoDensity: true,
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.addCanvas();
        this.addOnResize();
    }

    public addCanvas(): void {
        document.body.appendChild(this.view);
    }

    // Todo: external resize manager
    public addOnResize(): void {
        window.addEventListener('resize', () => {
            this.resize(window.innerWidth, window.innerHeight);
        });
    }
}

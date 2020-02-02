PIXI.WebGLRenderer = PIXI.Renderer;
window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
import 'regenerator-runtime/runtime';

window.onload = () => {
    loadAssets()
        .then(() => {
            setStyles();
            initApp1();
            initApp2();
            initApp3();
        });
};

const margin = 1;
const padding = 30;
const scrollWidth = 17;
const resizable = true;
const showBounds = true;
const spriteUrl = '../src/img.png';
const textStyle = {
    fontFamily: 'Times new roman',
    fontSize: 20
};

const canvasSettings = {
    width: 1280,
    height: 720,
    backgroundColor: 0xf1ebe9,
    antialias: false
};

function loadAssets() {
    return new Promise((resolve) => {
        const loader = PIXI.Loader.shared;
        loader.add('logo', spriteUrl);
        loader.onComplete.add(() => {
            console.log('onLoad');
            resolve();
        });
        loader.load();
    });
}

function setStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    const styles = `
        body {
            margin: 0px;
            padding: 0px;
            background-color: red;
        }
        canvas {
            margin: ${margin}px ${margin}px 0px ${margin}px;
            display: block;
        }
    `;
    style.appendChild(document.createTextNode(styles));
    document.getElementsByTagName('head')[0].appendChild(style);
}

function addOnResize(name, resizeRenderer = false) {
    if(!resizable) return;
    window.addEventListener('resize', () => resize(name, resizeRenderer));
    resize(name, resizeRenderer);
}

function resize(name, resizeRenderer) {
    const app = window[name];
    let scaleCoef = window.innerWidth / canvasSettings.width;
    app.view.style.width = window.innerWidth - scrollWidth - 2 * margin + 'px';
    app.view.style.height = canvasSettings.height * scaleCoef + 'px';
    if (resizeRenderer) {
        app.renderer.resize(app.renderer.view.clientWidth, app.renderer.view.clientHeight);
    }
    window.dispatchEvent(new CustomEvent(`updateText_${name}`, {'detail': {text: getText(name)}}));
}

function addText(name, textValue) {
    const style = new PIXI.TextStyle(textStyle);
    const text = new PIXI.Text(textValue, style);
    window[name].stage.addChild(text);
    let prev;
    for (const child of text.parent.children) {
        if(child === text) {
            break;
        } else {
            prev = child;
        }
    }

    text.position.set(
        padding,
        prev.y + prev.height + padding
    );

    const bound = addVisibleBounds(text);
    updateBound(text, bound);

    window.addEventListener(`updateText_${name}`, (e) => {
        text.text = e.detail.text;
        updateBound(text, bound);
    });

}

function updateBound(element, bound) {
    bound.position.set(element.x, element.y);
    bound.width = element.width;
    bound.height = element.height;
}

function addVisibleBounds(element) {
    if(!showBounds) return;
    const graphics = new PIXI.Graphics();
    graphics.beginFill('0xff0000', 0.3);
    graphics.drawRect(0, 0, 1, 1);
    graphics.endFill();    
    element.parent.addChild(graphics);
    element.parent.swapChildren(element, graphics);
    return graphics;
}

function createApp(name) {
    window[name] = new PIXI.Application(canvasSettings);
    document.body.appendChild(window[name].view);
}

function addSprite(name) {
    const texture = PIXI.Loader.shared.resources['logo'].texture;
    const sprite = new PIXI.Sprite(texture);
    sprite.x = padding;
    sprite.y = padding;
    window[name].stage.addChild(sprite);
    const bound = addVisibleBounds(sprite);
    updateBound(sprite, bound);

}

function getText(name) {
    return `Original size: ${canvasSettings.width}x${canvasSettings.height}
Renderer size: ${window[name].renderer.width}x${window[name].renderer.height}`;
}

function initApp1() {
    const name = 'app1';
    
    createApp(name);
    addSprite(name);
    addText(name, getText(name));
    addOnResize(name, true);

    //     const textValue = `Canvas size: 200x208
    // Style size: 400x408
    // x: 100px
    // y: 50px
    // fontSize: 20
    // scale: 1

    // renderer.resize() used`;
    //     const text = addText( app.stage, textValue );
    //     text.x = 20;
    //     text.y = 10;
}

function initApp2() {
    const name = 'app2';
    createApp(name);
    addSprite(name);
    addText(name, 'pesho');
    addOnResize(name);
    //     const coef = app.view.width / app.view.clientWidth;
    //     const newFontSize = Math.round( 20 * coef );
    //     //app.stage.scale.set( coef );
    //     const textValue = `Canvas size: 200x208
    // Style size: 400x408
    // x: 100px
    // y: 50px
    // fontSize: ${newFontSize}
    // scale: ${coef}`;
    //     const text = addText( app.stage, textValue, newFontSize );
    //     text.x = 20;
    //     text.y = 10;

    //     const img = addSprite( app.stage );
    //     setTimeout( () => {
    //         img.width *= coef;
    //         img.height *= coef;
    //         img.x = 20;
    //         img.y = 200 * coef;
    //     }, 500 );
}

function initApp3() {
    const name = 'app3';
    createApp(name);
    addSprite(name);
    addText(name, 'pesho');
    addOnResize(name);

    //     const coef = app.view.width / app.view.clientWidth;
    //     app.stage.scale.set( coef );
    //     const textValue = `Canvas size: 200x208
    // Style size: 400x408
    // x: 100px
    // y: 50px
    // fontSize: 20
    // scale: ${coef}

    // rootContainer scaled`;
    //     const text = addText( app.stage, textValue );
    //     text.x = 20;
    //     text.y = 10;

    //     const img = addSprite( app.stage );
    //     img.x = 20;
    //     img.y = 200;
}

PIXI.WebGLRenderer = PIXI.Renderer;
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
    window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register( { PIXI: PIXI } );

window.onload = () => {
    setStyles();
    initApp1( canvasSettings );
    initApp2( canvasSettings );
    initApp3( canvasSettings );
};

const canvasSettings = {
    width: 200,
    height: 204,
    backgroundColor: 0xF1EBE9,
    antialias: false
};

function setStyles() {
    const style = document.createElement( 'style' );
    style.type = 'text/css';
    style.appendChild( document.createTextNode( `
        body {
            margin: 0px;
            padding: 0px;
        }
        canvas {
            margin: 1px;
            width: ${400}px;
            height: ${408}px;
        }
    ` ) );
    document.getElementsByTagName( 'head' )[0].appendChild( style );
}

function initApp1( settings: object ) {
    const app = window.app1 = new PIXI.Application( settings );
    document.body.appendChild( app.view );
    app.renderer.resize( app.view.clientWidth, app.view.clientHeight );
    const textValue = `Canvas size: 200x208
Style size: 400x408
x: 100px
y: 50px
fontSize: 20
scale: 1

renderer.resize() used`;
    const text = addText( app.stage, textValue );
    text.x = 20;
    text.y = 10;

    const img = addSprite( app.stage );
    img.x = 20;
    img.y = 200;
}

function initApp2( settings: object ) {
    const app = window.app2 = new PIXI.Application( settings );
    document.body.appendChild( app.view );
    const coef = app.view.width / app.view.clientWidth;
    const newFontSize = Math.round( 20 * coef );
    //app.stage.scale.set( coef );
    const textValue = `Canvas size: 200x208
Style size: 400x408
x: 100px
y: 50px
fontSize: ${newFontSize}
scale: ${coef}`;
    const text = addText( app.stage, textValue, newFontSize );
    text.x = 20;
    text.y = 10;

    const img = addSprite( app.stage );
    setTimeout( () => {
        img.width *= coef;
        img.height *= coef;
        img.x = 20;
        img.y = 200 * coef;
    }, 500 );


}

function initApp3( settings: object ) {
    const app = window.app1 = new PIXI.Application( settings );
    document.body.appendChild( app.view );
    const coef = app.view.width / app.view.clientWidth;
    app.stage.scale.set( coef );
    const textValue = `Canvas size: 200x208
Style size: 400x408
x: 100px
y: 50px
fontSize: 20
scale: ${coef}

rootContainer scaled`;
    const text = addText( app.stage, textValue );
    text.x = 20;
    text.y = 10;

    const img = addSprite( app.stage );
    img.x = 20;
    img.y = 200;
}

function addText( app: PIXI.Container, textValue, fontSize = 20 ) {
    const style = new PIXI.TextStyle( {
        fontFamily: 'Times new roman',
        fontSize: fontSize
    } );
    const text = new PIXI.Text( textValue, style );
    text.fontSize = fontSize;
    app.addChild( text );
    return text;
}

function addSprite( app: PIXI.Container ) {
    const img = new PIXI.Sprite( PIXI.Texture.from( '../src/img.png' ) );
    app.addChild( img );
    return img;
}



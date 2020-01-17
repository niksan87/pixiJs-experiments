window.onload = () => {
    setStyles();
    initApp1( canvasSettings );
    initApp2( canvasSettings );
};

const canvasSettings = {
    width: 400,
    height: 408,
    backgroundColor: 0xF1EBE9
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
            width: ${window.innerWidth / 2 - 2}px;
            height: ${window.innerHeight - 8}px;
        }
    ` ) );
    document.getElementsByTagName( 'head' )[0].appendChild( style );
}

function initApp1( settings: object ) {
    const app = window.app1 = new PIXI.Application( settings );
    document.body.appendChild( app.view );
    app.renderer.resize( app.view.clientWidth, app.view.clientHeight );
    addText( app.stage );
}

function initApp2( settings: object ) {
    const app = window.app2 = new PIXI.Application( settings );
    document.body.appendChild( app.view );
    const coef = app.view.width / app.view.clientWidth;
    app.stage.scale.set( coef );
    addText( app.stage );
}

function addText( app: PIXI.Container ) {
    const style = new PIXI.TextStyle( {
        fontFamily: 'Times new roman',
        fontSize: 30
    } );
    const text = new PIXI.Text( 'A test text here.', style );
    app.addChild( text );
}

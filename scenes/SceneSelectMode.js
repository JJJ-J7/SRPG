import * as UI from '../UIcomponents/index.js';

export class SceneSelectMode extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneSelectMode' });
  }

  create() {
    // Phaser canvasの背景色を薄い紫に
    this.cameras.main.setBackgroundColor(UI.UI_ThemeColors.background);
    console.log(`${this.scene.key} created`);

    this.events.off('shutdown', this.shutdown, this);
    this.events.off('destroy', this.shutdown, this);
    this.events.on('shutdown', this.shutdown, this);
    this.events.on('destroy', this.shutdown, this);

        // 戻り元シーン名をdata.fromから取得（なければSceneUiTest）
    const data = arguments[0] || {};
    const returnScene = data.from || 'SceneUiTest';
    //console.log(`Will Back to: ${returnScene}`);

    // 0. UI親
    this.uiParent = new UI.UI_FreeContainer({
      className: UI.UI_Settings.uiParentClassName,
      parent: document.body,
      position: 'fixed',
      left: '50%',
      top: '50%',
      width: innerWidth,
      height: innerHeight,
      zIndex: 1000,
      center: true,
      scene: this, // 現在のシーンを設定
      opacity: 0.0,
    });
    // DOMフェードイン
    this.uiParent.fadeIn({ delay: UI.UI_Settings.crossFadeDelay });

    // 4. テキストボックス（中央やや下）
    this.header = new UI.UI_TxtBox({
      text: 'Select Game Mode',
      backgroundColor: 'transparent',
      textColor: '#000',
      fontSize: 32,
      parent: this.uiParent.el,
      position: 'fixed',
      left: '5%',
      top: '5%',
      center: false,
      className: 'sample-ui-textbox',
      scene: this, // 現在のシーンを設定
    });    

    // 1. テキストボタン（中央やや上）
    this.btnStart = new UI.UI_TxtBtn({
      text: 'Start Game',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Start Game Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '30%',
      zIndex: 1000,
      width: 200,
      scene: this,
      gotoScene: 'SceneGame' // シーン遷移のための設定
    });

    this.btnContinue = new UI.UI_TxtBtn({
      text: 'Continue',
      backgroundColor: '#007bff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Continue Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '40%',
      zIndex: 1000,
      width: 200,
      scene: this,
    });

    this.btnBack = new UI.UI_TxtBtn({
      text: 'Back',
      backgroundColor: '#505050ff',
      textColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: 20,
      onClick: () => {
        console.log('Back Button Pressed');
      },
      parent: this.uiParent.el,
      position: 'fixed',
      left: '50%',
      top: '50%',
      zIndex: 1000,
      width: 200,
      scene: this,
      gotoScene: 'SceneSelectTribe' // 戻り元シーンへ遷移
    });

  }

  shutdown() {
    // UI親コンテナのみdestroy（配下DOMもまとめて破棄）
    console.log(`shutdown: ${this.scene.key} (${this.timestamp}) `);
    if (this.uiParent && typeof this.uiParent.destroy === 'function') {
      this.uiParent.destroy();
    }
  }
}
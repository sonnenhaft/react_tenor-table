import React from 'react';
import { Widget } from './Widget';

import b from './sample-ts-import';
import a from './sample-js-import';
import { SampleJsxImport } from './SampleJsxImport';

let focus = function() {
  console.log('activated');
};
let blur = function() {
  console.log('deactivated');
};

// https://greensock.com/forums/topic/9059-cross-browser-to-detect-tab-or-window-is-active-so-animations-stay-in-sync-using-html5-visibility-api/
function subscribeToDocumentInactive(fn: (isActive: boolean, documentHiddenEvent?: Event) => void) {
// @ts-ignore
  fn(document.visible, null);

  const subscribeToDocumentHiddenEvent = function(documentHiddenEvent: Event) {
    // @ts-ignore
    fn.call(this, document.visible, documentHiddenEvent);
  };

  document.addEventListener('visibilitychange', subscribeToDocumentHiddenEvent);
  return function unsubscribeFromDocumentHiddenEvent() {
    document.removeEventListener('visibilitychange', subscribeToDocumentHiddenEvent);
  };
}

export class App extends React.Component {
  unsubscribeFromDocumentHiddenEvent?: () => void;

  componentDidMount(): void {
    console.log('componentDidMount');
    a();
    b();

    window.addEventListener('focus', focus);
    window.addEventListener('blur', blur);
    this.unsubscribeFromDocumentHiddenEvent = subscribeToDocumentInactive((isActive: boolean) => {
      console.log('isDocumentActive', isActive);
    });

  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener('focus', focus);
    window.removeEventListener('blur', blur);
    this.unsubscribeFromDocumentHiddenEvent();
  }

  render() {
    return <div>
      <SampleJsxImport />
      <p>
        <a href="/storybook">storybook</a>
      </p>

      TS configured
      <Widget />
    </div>;
  }
}
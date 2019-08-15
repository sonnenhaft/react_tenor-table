import * as React from 'react';
import { Widget } from './Widget';

import b from './sample-ts-import';
import a from './sample-js-import';
import { SampleJsxImport } from './SampleJsxImport';

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
    a();
    b();

    this.unsubscribeFromDocumentHiddenEvent = subscribeToDocumentInactive((isActive: boolean) => {
      console.log('isDocumentActive', isActive);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromDocumentHiddenEvent();
  }

  render() {
    return <div>
      <SampleJsxImport />
      <p>
        <a href="storybook">storybook</a>
        &nbsp;
        <a href="coverage/lcov-report/index.html">coverage</a>
      </p>

      TS configured
      <Widget />
    </div>;
  }
}
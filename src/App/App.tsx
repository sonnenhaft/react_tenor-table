import * as React from 'react';
import { Widget } from './components/Widget';
import { Menu } from './components/Menu';
import { DefaultPadding } from './components/DefaultPadding';

import b from './sample-ts-import';
import a from './sample-js-import';
import { SampleJsxImport } from './SampleJsxImport';
import { subscribeToDocumentInactive } from './subscribeToDocumentInactive';

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
    return <React.Fragment>
      <Menu />

      <DefaultPadding>
        <SampleJsxImport />

        TS configured
      </DefaultPadding>

      <Widget />
    </React.Fragment>;
  }
}
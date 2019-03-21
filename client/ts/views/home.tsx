import * as React from 'react';

interface IHomeState {
}

export default class Home extends React.Component<{}, IHomeState> {
  public render(): React.ReactElement<{}> {
    return (
      <div>
        <h1>First Page</h1>
        { this._content() }
      </div>
    );
  }

  private _content(): React.ReactNode {
    return (
      <div>
        Add some content
      </div>
    )
  }
}
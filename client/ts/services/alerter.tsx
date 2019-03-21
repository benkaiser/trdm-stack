import { Provider, withAlert, InjectedAlertProp, AlertType, ProviderOptions } from 'react-alert';
import * as React from 'react';

const ALERT_OPTIONS: ProviderOptions = {
  offset: '10px',
  position: 'top right',
  timeout: 5000,
  transition: 'scale'
}

export interface IAlerterProps {
  alert: InjectedAlertProp;
}

export default class Alerter extends React.Component<IAlerterProps> {
  private static _component: Alerter;

  public static error(message: string) {
    return Alerter._component.alert(message, 'error');
  }

  public static info(message: string) {
    return Alerter._component.alert(message, 'info');
  }

  public static success(message: string) {
    return Alerter._component.alert(message, 'success');
  }

  constructor(props: IAlerterProps) {
    super(props);
    Alerter._component = this;
    this.state = {
      value: ''
    };
  }

  public render(): React.ReactNode {
    return '';
  }

  public alert(message: string, type: AlertType): void {
    this.props.alert.show(message, {
      type: type
    });
  }
}

class AlertTemplate extends React.Component {
  public render(): React.ReactNode {
    let { style, options, message, close } = this.props as any;
    if (style) {
      style = {
        ...style,
        marginRight: '25px'
      };
    }
    let type = options.type;
    type == 'error' && (type = 'danger');
    return (
      <div style={style} className={'alert alerter-alert alert-dismissable alert-' + type}>
        <button type="button" className="close" data-dismiss="alert" onClick={close}>×</button>
        {message}
      </div>
    );
  }
}

const AlerterWithAlert = (withAlert as any)()(Alerter);

export class AlerterContainer extends React.Component {
  public render(): React.ReactNode {
    return (
      <Provider template={AlertTemplate} {...ALERT_OPTIONS}>
        <AlerterWithAlert />
      </Provider>
    )
  }
}
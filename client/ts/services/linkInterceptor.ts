const getHistory = require('react-router-global-history');

export default class LinkInterceptor {
  public static initialise(): void {
    document.addEventListener('click', (event: Event) => {
      const target: HTMLElement = event.target as HTMLElement;
      if (target.tagName !== 'A') {
        return;
      }
      event.preventDefault();
      const href = target.getAttribute('href');
      if (LinkInterceptor._handlesRoute(href)) {
        getHistory().push(href);
      } else {
        window.location.href = href;
      }
    }, true);
  }

  private static _handlesRoute(href: string): boolean {
    const a = document.createElement('a');
    a.href = href;
    return a.hostname == window.location.hostname && a.port == window.location.port && a.protocol === window.location.protocol; 
  }
}
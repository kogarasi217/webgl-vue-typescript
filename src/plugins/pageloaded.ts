const PageLoadedConsole = {
  install (Vue: any, options: any) {
    const observer = new MutationObserver(rec => {
      console.log('mutation observed');
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
}

export default PageLoadedConsole;
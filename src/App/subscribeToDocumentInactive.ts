export const subscribeToDocumentInactive = function(fn: (isActive: boolean, documentHiddenEvent?: Event) => void) {
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
};
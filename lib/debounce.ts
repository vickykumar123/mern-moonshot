export const debounce = (func: () => any, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args as any), delay);
  };
};

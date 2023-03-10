const UrlUtil = new URLSearchParams(window.location.search);
function getQueryUrlKey(key: string) {
    return UrlUtil.get(key);
}
function handleNavigate(key: string, value: any) {
    UrlUtil.set(key, value);
    window.history.pushState({}, '', `?${UrlUtil.toString()}`);
}
export { UrlUtil, getQueryUrlKey, handleNavigate };

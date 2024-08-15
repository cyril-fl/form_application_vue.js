export function toCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export const isValidURL = (value) => {
    try {
        new URL(value);
        return true;
    } catch (_) {
        return false;
    }
};
export const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

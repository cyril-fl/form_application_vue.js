export const define_id = (name, defaultValue) => {
    let temp_id;

    if (name) {
        temp_id = name
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '')
            .toLowerCase();
    } else {
        temp_id = defaultValue;
    }

    return temp_id;
}
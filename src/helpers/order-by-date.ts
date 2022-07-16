export const orderByDate = (prev: string, current: string) => {
    return new Date(current) - new Date(prev);
}
export interface IDrinkListItem {
    id: string,
    name: string,
    thumbnail?: string,
    category?: string,
    ingredients?: string[],
    measurements?: string[],
    callback?: () => void,
}
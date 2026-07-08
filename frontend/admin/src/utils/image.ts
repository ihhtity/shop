const BASE_URL = 'https://picsum.photos'

export function getImage(id: number, width: number, height: number): string {
  return `${BASE_URL}/id/${id}/${width}/${height}`
}

export function getProductImage(id: number, width: number = 400, height: number = 400): string {
  return getImage(id + 100, width, height)
}

export function getBannerImage(id: number, width: number = 1200, height: number = 400): string {
  return getImage(id + 200, width, height)
}

export function getAvatarImage(id: number, size: number = 100): string {
  return getImage(id + 300, size, size)
}

export function getCategoryImage(id: number, width: number = 200, height: number = 200): string {
  return getImage(id + 400, width, height)
}
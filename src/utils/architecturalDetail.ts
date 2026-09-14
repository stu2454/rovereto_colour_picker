/** Extract neutral, local edge contrast only. Never carry foundation hue or
 * broad illumination into paint. Dimensions and pixel positions are unchanged.
 * A dead band makes smooth painted areas fully transparent.
 */
export function architecturalDetail(source: HTMLImageElement): string {
  const width = source.naturalWidth
  const height = source.naturalHeight
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')!
  context.drawImage(source, 0, 0)
  const pixels = context.getImageData(0, 0, width, height)
  const luminance = new Float32Array(width * height)
  const integral = new Float64Array((width + 1) * (height + 1))
  for (let y = 0; y < height; y++) {
    let row = 0
    for (let x = 0; x < width; x++) {
      const i = y * width + x
      const p = i * 4
      luminance[i] = pixels.data[p] * 0.2126 + pixels.data[p + 1] * 0.7152 + pixels.data[p + 2] * 0.0722
      row += luminance[i]
      integral[(y + 1) * (width + 1) + x + 1] = integral[y * (width + 1) + x + 1] + row
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const left = Math.max(0, x - 5), right = Math.min(width, x + 6)
      const top = Math.max(0, y - 5), bottom = Math.min(height, y + 6)
      const sum = integral[bottom * (width + 1) + right] - integral[top * (width + 1) + right]
        - integral[bottom * (width + 1) + left] + integral[top * (width + 1) + left]
      const contrast = luminance[y * width + x] - sum / ((right - left) * (bottom - top))
      const p = (y * width + x) * 4
      const ink = contrast > 0 ? 255 : 0
      pixels.data[p] = pixels.data[p + 1] = pixels.data[p + 2] = ink
      pixels.data[p + 3] = Math.min(190, Math.max(0, Math.abs(contrast) - 12) * 3)
    }
  }
  context.putImageData(pixels, 0, 0)
  return canvas.toDataURL('image/png')
}

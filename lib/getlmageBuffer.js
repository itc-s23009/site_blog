import path from 'node:path'
import fs from 'node:fs/promises'

const getImageBuffer = async src => {
  if (src.startsWith('http')) {
    const res = await fetch(src)
    return Buffer.from(await res.arrayBuffer())
  } else {
    return await fs.readFile(path.join('./public', src))
  }
}

export { getImageBuffer }

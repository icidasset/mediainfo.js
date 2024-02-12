import { join } from 'path'

import { CFLAGS, CPU_CORES, CXXFLAGS, VENDOR_DIR } from '../constants'
import { spawn } from '../utils'

const zenlibDir = join(VENDOR_DIR, 'ZenLib', 'Project', 'GNU', 'Library')

async function task() {
  await spawn('./autogen.sh', [], zenlibDir)
  await spawn(
    'emconfigure',
    [
      './configure',
      '--host=le32-unknown-nacl',
      '--enable-static',
      '--disable-shared',
      `CFLAGS=${CFLAGS}`,
      `CXXFLAGS=${CXXFLAGS}`,
    ],
    zenlibDir
  )
  await spawn('emmake', ['make', `-j${CPU_CORES}`], zenlibDir)
}

task.displayName = 'compile:zenlib'
task.description = 'Compile zenlib'

export default task

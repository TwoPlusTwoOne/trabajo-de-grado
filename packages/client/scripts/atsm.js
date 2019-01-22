const { spawnSync, spawn } = require('child_process')

// Run awesome-typed-sass-modules

const registerSyncOutput = (childProcess, name) => {
  const stderr = childProcess.stderr.toString()
  const stdout = childProcess.stdout.toString()
  if (stdout !== '') console.log(`${name}: ${stdout}`)
  if (stderr !== '') console.error(`${name} errors: ${stderr}`)

  let finishMessage = `${name} finished with code ${childProcess.status}`
  if (childProcess.status === 0) console.log(finishMessage)
  else console.error(finishMessage)
}

const registerOutput = (childProcess, name) => {
  childProcess.stdout.on('data', data => console.log(`${name}: ${data}`))
  childProcess.stderr.on('data', data => console.log(`${name}: ${data}`))
  childProcess.on('close', code =>
    console.log(`${name} process exited with code ${code}`)
  )
}

// Run sync
const sassPattern = 'src/**/*.scss'
const atsmRun = () => {
  registerSyncOutput(spawnSync('atsm', ['-p', sassPattern]), 'atsm sync')
}

// Watch files
const atsmWatch = () => {
  registerOutput(spawn('atsm', ['-w', '-p', sassPattern]), 'atsm')
}

module.exports = {
  atsmRun,
  atsmWatch,
  registerOutput,
  registerSyncOutput,
}

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const projectPath = fileURLToPath(new URL('../', import.meta.url))
const action = process.argv[2]
const name = process.argv[3]

function git(args, quiet = false) {
  const result = spawnSync('git', args, {
    cwd: projectPath,
    encoding: 'utf8',
    stdio: quiet ? 'pipe' : 'inherit',
  })

  if (result.error) throw result.error
  if (result.status !== 0) {
    throw new Error(`Git failed: git ${args.join(' ')}`)
  }

  return result.stdout?.trim() || ''
}

function refExists(ref) {
  const result = spawnSync('git', ['show-ref', '--verify', '--quiet', ref], {
    cwd: projectPath,
  })
  if (result.error) throw result.error
  if (result.status === 0) return true
  if (result.status === 1) return false
  throw new Error(`Cannot check branch: ${ref}`)
}

function savePractice(branch) {
  if (!branch.startsWith('practice/')) {
    throw new Error('Save is allowed only on practice/* branches. Keep main as the blank starter.')
  }

  const changes = git(['status', '--porcelain'], true)
  if (changes) {
    git(['add', '--all'])
    git(['commit', '-m', `Save ${branch}`])
  }

  git(['push', '-u', 'origin', branch])
}

try {
  if (!['new', 'save', 'open'].includes(action)) {
    throw new Error('Use npm run practice:new -- day-2, practice:save, or practice:open -- day-1.')
  }

  const currentBranch = git(['branch', '--show-current'], true)
  if (!currentBranch) throw new Error('Switch to a named branch first.')
  git(['remote', 'get-url', 'origin'], true)

  if (action === 'save') {
    savePractice(currentBranch)
    console.log(`Saved locally and pushed: ${currentBranch}`)
  } else {
    if (!name) throw new Error('Enter a practice name, for example: day-2.')
    const branch = name.startsWith('practice/') ? name : `practice/${name}`
    git(['check-ref-format', '--branch', branch], true)

    // Check the remote and branch name before saving or switching anything.
    git(['fetch', 'origin'])
    const localExists = refExists(`refs/heads/${branch}`)
    const remoteExists = refExists(`refs/remotes/origin/${branch}`)

    if (action === 'new' && (localExists || remoteExists)) {
      throw new Error(`${branch} already exists. Use npm run practice:open -- ${name}.`)
    }
    if (action === 'new' && !refExists('refs/remotes/origin/main')) {
      throw new Error('The remote main starter branch is missing.')
    }
    if (action === 'open' && !localExists && !remoteExists) {
      throw new Error(`${branch} does not exist.`)
    }
    if (action === 'open' && branch === currentBranch) {
      console.log(`Already on ${branch}`)
      process.exit(0)
    }

    if (currentBranch.startsWith('practice/')) {
      savePractice(currentBranch)
    } else {
      const changes = git(['status', '--porcelain'], true)
      if (changes) {
        throw new Error(`Save changes on ${currentBranch} first. The script will not clear them.`)
      }
    }

    if (action === 'new') {
      git(['switch', '-c', branch, 'origin/main'])
      git(['push', '-u', 'origin', branch])
      console.log(`Blank practice ready: ${branch}`)
    } else {
      if (localExists) git(['switch', branch])
      else git(['switch', '--track', '-c', branch, `origin/${branch}`])
      git(['pull', '--ff-only', 'origin', branch])
      console.log(`Opened saved practice: ${branch}`)
    }

    console.log('Run npm install if this branch has different dependencies, then npm run dev.')
  }
} catch (error) {
  console.error(`Stopped: ${error.message}`)
  console.error('Check git status. Existing code and commits were not reset or deleted.')
  process.exitCode = 1
}

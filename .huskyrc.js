const tasks = (arr) => arr.join(' && ')
const lintstaged = 'cross-env TIMING=1 lint-staged --verbose'

module.exports = {
  hooks: {
    /**
     * Move build from circleci to here, save time on pipeline
     */
    'pre-push': tasks(['make build-dev-affected', 'make test-dev-affected']),
    'commit-msg': 'make lint-commit-dev',
    'pre-commit': lintstaged,
  },
}

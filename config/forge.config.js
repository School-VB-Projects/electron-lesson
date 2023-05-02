module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'vbetsch',
            name: 'electron-lesson',
          },
          prerelease: false,
          draft: true,
        },
      },
    ],
  }
const channel = {
  volume: 10,
  mute: true
}

const synth = {
  volume: -5,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.05,
    attackCurve: 'linear',
    decay: 0.1,
    decayCurve: 'linear',
    sustain: 0.1,
    release: 1.5,
    releaseCurve: 'linear'
  },
  oscillator: {
    type: 'triangle',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

const sequence = {
  steps: [
    {
      time: '0:0:0',
      noteName: 'A3',
      duration: '1n',
      velocity: 1
    },
    {
      time: '1:0:0',
      noteName: 'A2',
      duration: '1n',
      velocity: 1
    }
  ],
  duration: '2n'
}

const name = 'A'

export { synth, sequence, name, channel }

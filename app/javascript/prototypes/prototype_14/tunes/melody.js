const synth = {
  volume: -100,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.05,
    attackCurve: 'exponential',
    decay: 1,
    decayCurve: 'exponential',
    sustain: 0.1,
    release: 0.1,
    releaseCurve: 'exponential'
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

const chorus = {
  wet: 0.5,
  type: 'sine',
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
  spread: 180
}

const pingPongDelay = { wet: 0.5, delayTime: 0.25, maxDelayTime: 1 }

const sequence = {
  steps: [
    {
      time: '0:0:0',
      noteName: 'G1',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:0:1',
      noteName: 'G2',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:0:2',
      noteName: 'G1',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:0:3',
      noteName: 'G2',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:0:4',
      noteName: 'G1',
      duration: '16n',
      velocity: 1
    }
  ],
  duration: '4n'
}

const title = "GROUND"

export { synth, chorus, pingPongDelay, sequence, title }
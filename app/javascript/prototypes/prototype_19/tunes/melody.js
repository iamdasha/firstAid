const synth = {
  volume: -8,
  detune: 0,
  portamento: 0.1,
  envelope: {
    attack: 6,
    attackCurve: 'exponential',
    decay: 0.2,
    decayCurve: 'exponential',
    sustain: 0.6,
    release: 1.5,
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
  wet: 0.3,
  type: 'sine',
  frequency: 1.5,
  delayTime: 5,
  depth: 0.7,
  spread: 180
}

const pingPongDelay = { wet: 0.2, delayTime: 0.25, maxDelayTime: 1 }

const distortion = {
  wet: 0.2,
  distortion: 100,
  oversample: '4x'
}

const freeverb = {
  wet: 0.3,
  type: 'sine',
  roomSize: 0.5,
  dampening: 3000
}

const sequence = {
  steps: [
    {
      time: '0:0:0',
      noteName: 'F5',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:0:2',
      noteName: 'C6',
      duration: '4n',
      velocity: 1
    },
    {
      time: '0:0:4',
      noteName: 'F5',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:1:0',
      noteName: 'C5',
      duration: '4n',
      velocity: 1
    },
    {
      time: '0:1:2',
      noteName: 'E5',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:1:4',
      noteName: 'G4',
      duration: '4n',
      velocity: 1
    },
    {
      time: '0:2:0',
      noteName: 'E4',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:2:4',
      noteName: 'F4',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:3:0',
      noteName: 'C5',
      duration: '4n',
      velocity: 1
    },
    {
      time: '0:3:2',
      noteName: 'F4',
      duration: '2n',
      velocity: 1
    }
  ],
  duration: '1m'
}

export { synth, chorus, pingPongDelay, sequence, distortion, freeverb }

const synth = {
    volume: -0,
    detune: 0,
    portamento: 0.05,
    envelope: {
      attack: 0.05,
      attackCurve: 'exponential',
      decay: 1,
      decayCurve: 'exponential',
      sustain: 1,
      release: 1.5,
      releaseCurve: 'exponential'
    },
    oscillator: {
      type: 'sine',
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
  
  const sequence = {
    steps: [
      {
        time: '0:0:0',
        noteName: 'C1',
        duration: '10n',
        velocity: 1
      },
      {
        time: '1:0:0',
        noteName: 'C2',
        duration: '10n',
        velocity: 1
      },
      {
        time: '2:0:0',
        noteName: 'C1',
        duration: '5n',
        velocity: 1
      },
      {
        time: '3:0:0',
        noteName: 'A1',
        duration: '5n',
        velocity: 1
      }
    ],
    duration: '3t'
  }
  
  const title = "UNDER"
  
  export { synth, chorus, sequence, title }
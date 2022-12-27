const channel = {
    volume: 0,
    mute: true
  }
  
  const synth = {
      volume: -3,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'sawtooth',
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
          duration: '16n',
          velocity: 1
        },
        {
          time: '0:0:1',
          noteName: 'A2',
          duration: '16n',
          velocity: 1
        },
        {
          time: '0:0:2',
          noteName: 'A4',
          duration: '16n',
          velocity: 1
        },
        {
          time: '0:0:3',
          noteName: 'A2',
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
    
    const title = "D"
    
    export { synth, sequence, title, channel }
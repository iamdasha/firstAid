const channel = {
    volume: 0,
    mute: true
  }
  
  const synth = {
      volume: 3,
      detune: 1,
      portamento: 0.05,
      envelope: {
        attack: 0.1,
        attackCurve: 'exponential',
        decay: 0.1,
        decayCurve: 'exponential',
        sustain: 1,
        release: 0.1,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'triangle',
        modulationType: 'triangle',
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
          noteName: 'A1',
          duration: '16n',
          velocity: 1
        },
        {
          time: '0:0:1',
          noteName: 'G1',
          duration: '16n',
          velocity: 1
        },
        {
          time: '0:0:2',
          noteName: 'A1',
          duration: '16n',
          velocity: 1
        },
        {
          time: '0:0:3',
          noteName: 'B1',
          duration: '16n',
          velocity: 1
        },
        {
          time: '0:0:4',
          noteName: 'F1',
          duration: '16n',
          velocity: 1
        }
      ],
      duration: '4n'
    }
    
    const title = "B"
    
    export { synth, sequence, title, channel }
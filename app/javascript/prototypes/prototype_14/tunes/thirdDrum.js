const channel = {
    volume: 0,
    mute: true
  }
  
  const synth = {
      volume: 3,
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
          noteName: 'C2',
          duration: '10n',
          velocity: 1
        },
        {
          time: '0:0:1',
          noteName: 'A3',
          duration: '10n',
          velocity: 1
        },
        {
          time: '0:0:2',
          noteName: 'C2',
          duration: '5n',
          velocity: 1
        }
      ],
      duration: '3t'
    }
    
    const title = "C"
    
    export { synth, sequence, title, channel }
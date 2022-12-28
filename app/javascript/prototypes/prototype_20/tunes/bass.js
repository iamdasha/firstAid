const synth = {
  volume: -10,
  detune: 0,
  portamento: 0.25,
  envelope: {
    attack: 0.05,
    attackCurve: "exponential",
    decay: 0.2,
    decayCurve: "exponential",
    sustain: 0.2,
    release: 1.5,
    releaseCurve: "exponential",
  },
  oscillator: {
    type: "sine",
    modulationType: "sine",
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.5,
  },
};

const synthUI = {
  envelopeShow: false,
};

const chorus = {
  wet: 0.3,
  type: "sine",
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
  spread: 180,
};

const distortion = {
  wet: 0,
  distortion: 0,
  oversample: '4x'
}

const bitCrusher = {
  wet: 0,
  bits: 4
}

const pingPongDelay = { wet: 0.2, delayTime: 0.25, maxDelayTime: 1 };

const sequence = {
  steps1: [
    {
      time: "0:0:2",
      noteName: "E2",
      duration: "4n",
      velocity: 1,
    },
    {
      time: "0:1:2",
      noteName: "F3",
      duration: "4n",
      velocity: 1,
    },
    {
      time: "0:2:0",
      noteName: "A3",
      duration: "4n",
      velocity: 1,
    },
    {
      time: "0:2:3",
      noteName: "F3",
      duration: "4n",
      velocity: 1,
    },
    {
      time: "1:1:0",
      noteName: "B3",
      duration: "4n",
      velocity: 1,
    },
    {
      time: "1:1:3",
      noteName: "A3",
      duration: "4n",
      velocity: 1,
    },
    {
      time: "1:2:3",
      noteName: "F3",
      duration: "4n",
      velocity: 1,
    }
  ],
  steps2: [
    {
      time: "0:0:0",
      noteName: "C3",
      duration: "1n",
      velocity: 1,
    },
    {
      time: "1:0:0",
      noteName: "E3",
      duration: "1n",
      velocity: 1,
    },
    {
      time: "2:0:0",
      noteName: "A3",
      duration: "1n",
      velocity: 1,
    },
    {
      time: "3:0:0",
      noteName: "G3",
      duration: "1n",
      velocity: 1,
    },
  ],
  duration: "2m",
  loop: true,
};

export {
  synth,
  synthUI,
  chorus,
  pingPongDelay,
  distortion,
  bitCrusher,
  sequence,
};

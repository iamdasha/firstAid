import * as Tone from 'tone'
import React, { Component } from 'react'

import SC_Button from './SC_Button'

export default class Container extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const synthSettings = {
      volume: 0,
      detune: 1,
      portamento: 0.05,
      envelope: {
        attack: 0.9,
        attackCurve: 'exponential',
        decay: 0.8,
        decayCurve: 'linear',
        sustain: 0.5,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'fatsine',
        modulationType: 'fatsine',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const synth = new Tone.Synth(synthSettings)

    const distortionSettings = {
      wet: 0.5,
      distortion: 1,
      oversample: '2x'
    }

    const distortion = new Tone.Distortion(distortionSettings).toDestination()

    const phaserSettings = {
      wet: 1,
      frequency: 0.5,
      octaves: 3,
      stages: 20,
      Q: 10,
      baseFrequency: 350
    }

    const phaser = new Tone.Phaser(phaserSettings)

    const chorusSettings = {
      wet: 0.3,
      type: 'triangle',
      frequency: 5,
      delayTime: 0.5,
      depth: 0.7,
      spread: 180
    }

    const chorus = new Tone.Chorus(chorusSettings).start()

    const pingPongDelaySettings = { wet: 0.3, delayTime: 0.5, maxDelayTime: 1 }

    const pingPongDelay = new Tone.PingPongDelay(pingPongDelaySettings)

    const jcReverbSettings = {
      wet: 0.5,
      roomSize: 0.2
    }

    const jcReverb = new Tone.JCReverb(jcReverbSettings).toDestination()

    const freeverbSettings = {
      wet: 0.5,
      roomSize: 0.6,
      dampening: 100
    }

    const freeverb = new Tone.Freeverb(freeverbSettings)

    const channelSettings = { volume: 0, pan: 0, mute: false, solo: false }
    const channel = new Tone.Channel(channelSettings).toDestination()

    synth.chain(chorus, freeverb, channel)

    // Тестовая мелодия
    const sequence = [
      {
        time: '0:0:0',
        noteName: 'A3',
        duration: '1m',
        velocity: 1
      },
      {
        time: '1:0:0',
        noteName: 'B3',
        duration: '1m',
        velocity: 1
      },
      {
        time: '2:0:0',
        noteName: 'C4',
        duration: '1m',
        velocity: 1
      },

      {
        time: '3:0:0',
        noteName: 'D4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '3:1:0',
        noteName: 'C4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '3:2:0',
        noteName: 'D4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '3:3:0',
        noteName: 'C4',
        duration: '4n',
        velocity: 1
      }
    ]

    // Создаём партию, добавляем в неё секвенцию
    // и включаем проигрывание
    const part = new Tone.Part((time, note) => {
      synth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, sequence).start(0)

    // Указываем длительность партии
    part.loopEnd = '4m'

    // Включаем зацикливание
    part.loop = true

    // Включаем звук в браузере
    // sampler.context.resume()

    // Включаем отсчёт времени в Tone.js
    Tone.Transport.start()
  }

  render() {
    return (
      <div className="Container">
        <SC_Button text="make some noise" handleClick={this.handleClick} />
      </div>
    )
  }
}

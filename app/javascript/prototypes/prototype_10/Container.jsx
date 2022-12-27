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
        attack: 1,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'fatsquare',
        modulationType: 'sawtooth',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const synth = new Tone.Synth(synthSettings)

    const distortionSettings = {
      wet: 1,
      distortion: 1,
      oversample: '4x'
    }

    const distortion = new Tone.Distortion(distortionSettings).toDestination()

    const phaserSettings = {
      wet: 0.4,
      frequency: 0.1,
      octaves: 1,
      stages: 10,
      Q: 10,
      baseFrequency: 350
    }

    const phaser = new Tone.Phaser(phaserSettings)

    // const chorusSettings = {
    //   wet: 0.3,
    //   type: 'sine',
    //   frequency: 1.5,
    //   delayTime: 3.5,
    //   depth: 0.7,
    //   spread: 180
    // }
    //
    // const chorus = new Tone.Chorus(chorusSettings).start()

    const pingPongDelaySettings = { wet: 0.4, delayTime: 0.5, maxDelayTime: 1 }

    const pingPongDelay = new Tone.PingPongDelay(pingPongDelaySettings)

    const jcReverbSettings = {
      wet: 0.8,
      roomSize: 0.7
    }

    const jcReverb = new Tone.JCReverb(jcReverbSettings).toDestination()

    // const freeverbSettings = {
    //   wet: 1,
    //   roomSize: 0.5,
    //   dampening: 10
    // }
    //
    // const freeverb = new Tone.Freeverb(freeverbSettings)

    const channelSettings = { volume: 0, pan: 0, mute: false, solo: false }
    const channel = new Tone.Channel(channelSettings).toDestination()

    synth.chain(phaser, pingPongDelay, jcReverb, distortion, channel)

    // Тестовая мелодия
    const sequence = [
      {
        time: '0:0:0',
        noteName: 'C5',
        duration: '8t',
        velocity: 1
      },
      {
        time: '0:1:0',
        noteName: 'D5',
        duration: '8t',
        velocity: 1
      },
      {
        time: '0:2:0',
        noteName: 'C5',
        duration: '8t',
        velocity: 1
      },
      {
        time: '0:3:0',
        noteName: 'D5',
        duration: '8t',
        velocity: 0.7
      },
      {
        time: '1:0:0',
        noteName: 'E5',
        duration: '8t',
        velocity: 0.5
      },
      {
        time: '1:0:1',
        noteName: 'D5',
        duration: '8t',
        velocity: 0.2
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
    part.loopEnd = '2m'

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

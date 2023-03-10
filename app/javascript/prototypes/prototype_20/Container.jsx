import * as Tone from "tone";
import React, { Component } from "react";

import * as bassSettings from "./tunes/bass.js";
import * as melodySettings from "./tunes/melody.js";
import * as drumsSettings from "./tunes/drums.js";

import ToneSynth from "./modules/ToneSynth.jsx";
import ChorusEffect from "./modules/ChorusEffect.jsx";
import DistortionEffect from "./modules/DistortionEffect.jsx";
import BitCrusherEffect from "./modules/BitCrusherEffect.jsx";
import PingPongDelayEffect from "./modules/PingPongDelayEffect.jsx";
import Channel from "./modules/Channel.jsx";

import SC_ToggleButtonSet from "./components/SC_ToggleButtonSet.jsx";
import SC_ToggleButton from "./components/SC_ToggleButton";
import SC_Button from "./components/SC_Button";
import SC_Slider from "./components/SC_Slider";
import SC_Knob from "./components/SC_Knob";
import Surface from "./components/Surface";
import Select from "./components/Select";

let bassSynth;
let bassChorus;
let bassDistortion;
let bassBitCrusher;
let bassPingPongDelay;
let bassPart;

let melodySynth;
let melodyChorus;
let melodyDistortion;
let melodyBitCrusher;
let melodyPingPongDelay;
let melodyPart;

let sampler;
let samplerChannel;

let melody;
let melodyChannel;

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStarted: false,
      isUIShown: true,
      bpm: 80,
      melodyChangeMeasureSelect: false,
      melodyChangeMeasure: 8,
      melodyChangeRandom: false,
      melodyChange: false,
      random: false,
      bassSettings,
      melodySettings,
      drumsSettings,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);

    document.addEventListener(
      "click",
      this.handleMelodyChangeMeasureSelectClose
    );
  }

  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      // prettier-ignore
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  handleMelodyChangeMeasureSelectClose = (e) => {
    console.log("handleMelodyChangeMeasureSelectClose");
    const { isUIShown } = this.state;

    // console.log(e.target.classList[0] == 'currentValue')
    //
    // if (isUIShown && e.target.classList[0] == 'currentValue') {
    //   this.setState({
    //     melodyChangeMeasureSelect: false
    //   })
    // } else {
    if (e.target.classList[0] != "currentValue") {
      this.setState({
        melodyChangeMeasureSelect: false,
      });
    }
    // }
  };

  handleMelodyChangeMeasureSelectOpen = () => {
    console.log("handleMelodyChangeMeasureSelectOpen");

    this.setState({
      melodyChangeMeasureSelect: true,
    });
  };

  handleMelodyChangeMeasure = (property, value) => {
    this.setState({
      melodyChangeMeasureSelect: false,
      melodyChangeMeasure: value,
    });
  };

  handleMelodyChangeRandom = () => {
    const { melodyChangeRandom } = this.state;

    this.setState({
      melodyChangeRandom: !melodyChangeRandom,
    });
  };

  handleMelodyChange = () => {
    const { melodyChange } = this.state;

    this.setState({
      melodyChange: !melodyChange,
    });
  };

  handleKeydown = (e) => {
    console.log(e.key, e.code, e.keyCode);

    switch (e.keyCode) {
      case 49:
        this.handleMelodySequenceChange("", "steps1");
        break;
      case 50:
        this.handleMelodySequenceChange("", "steps2");
        break;
      case 81:
        sampler.triggerAttackRelease("A3", "1n");
        break;
    }
  };

  handleStart = () => {
    const { bassSettings, melodySettings, drumsSettings } = this.state;

    //
    //
    bassSynth = new Tone.Synth(bassSettings.synth);
    bassChorus = new Tone.Chorus(bassSettings.chorus).start();

    bassDistortion = new Tone.Distortion(bassSettings.distortion);
    bassBitCrusher = new Tone.BitCrusher(bassSettings.bitCrusher);

    bassPingPongDelay = new Tone.PingPongDelay(
      bassSettings.pingPongDelay
    ).toDestination();

    bassSynth.chain(
      bassChorus,
      bassPingPongDelay,
      bassDistortion,
      bassBitCrusher
    );

    bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      );
    }, bassSettings.sequence.steps1).start(0);

    bassPart.loopEnd = bassSettings.sequence.duration;
    bassPart.loop = bassSettings.sequence.loop;
    //
    //
    melodySynth = new Tone.Synth(melodySettings.synth);
    melodyChorus = new Tone.Chorus(melodySettings.chorus).start();
    melodyDistortion = new Tone.Distortion(melodySettings.distortion);
    melodyBitCrusher = new Tone.BitCrusher(melodySettings.bitCrusher);

    melodyPingPongDelay = new Tone.PingPongDelay(
      melodySettings.pingPongDelay
    ).toDestination();

    melodyChannel = new Tone.Channel(melodySettings.channel).toDestination();

    melodySynth.chain(
      melodyChorus,
      melodyDistortion,
      melodyBitCrusher,
      melodyPingPongDelay,
      melodyChannel
    );

    melodyPart = new Tone.Part((time, note) => {
      melodySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      );
    }, melodySettings.sequence[melodySettings.sequence.current]).start(0);

    melodyPart.loopEnd = melodySettings.sequence.duration;
    melodyPart.loop = melodySettings.sequence.loop;
    //
    //
    sampler = new Tone.Sampler({
      urls: {
        A1: "Swimming_In_Space.wav",
        A2: "Perc09.wav",
        A3: "Perc05.wav",
        A4: "Perc06.wav",
        C1: "Kick07.wav",
        C2: "Rhythmic01(120BPM).wav",
        C3: "Life_Forms.wav",
        C4: "Snare.wav",
        E1: "MiniKit_03(Dub_FX).wav",
        E2: "K01AltWoread160G-03.wav",
        E3: "K01AltPhad160G-01.wav",
        E4: "K01AltWib160G-04.wav",
      },
      baseUrl: "http://localhost:3000/samples/",
      // onload: () => {
      //   sampler.triggerAttackRelease(['A1', 'A2', 'A1', 'A2'], 0.5)
      // }
    });

    samplerChannel = new Tone.Channel(drumsSettings.channel).toDestination();

    sampler.chain(samplerChannel);

    const drumsPart = new Tone.Part((time, note) => {
      sampler.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      );
    }, drumsSettings.sequence.steps).start(0);

    drumsPart.loopEnd = drumsSettings.sequence.duration;
    drumsPart.loop = drumsSettings.sequence.loop;

    this.handleTransportChange("play", true);
  };

  nextMeasure = () => {
    const { melodyChangeMeasure, melodyChangeRandom, melodyChange } =
      this.state;

    if (melodyChange) {
      const position = Tone.Transport.position;
      const regexBefore = /([\w]+)/;
      let measure = parseInt(position.match(regexBefore)[1]) + 1;
      console.log("next measure", measure);

      const squaresPassed = Math.floor(measure / melodyChangeMeasure);

      if (
        measure == melodyChangeMeasure ||
        measure - squaresPassed * melodyChangeMeasure == 0
      ) {
        console.log("change");
        melodyPart.clear();

        if (melodyChangeRandom) {
          console.log("random");

          let notes = [];

          melodySettings.sequence.steps2.forEach((item, i) => {
            notes.push(item.noteName);
          });

          notes = this.shuffle(notes);

          let randomizedSequence = [...melodySettings.sequence.steps2];

          randomizedSequence.forEach((step, i) => {
            let newStep = Object.assign({}, step);
            newStep.noteName = notes[i];
            melodyPart.add(newStep);
          });
        } else {
          melodySettings.sequence.steps2.forEach((step, i) => {
            melodyPart.add(step);
          });
        }
      } else if (
        measure == melodyChangeMeasure + 1 ||
        measure - squaresPassed * melodyChangeMeasure == 1
      ) {
        console.log("change back");
        melodyPart.clear();

        melodySettings.sequence.steps1.forEach((step, i) => {
          melodyPart.add(step);
        });
      }
    }
  };

  handleTransportChange = (property, value) => {
    const { bpm } = this.state;

    switch (property) {
      case "play":
        Tone.Transport.start();
        Tone.Transport.scheduleRepeat(this.nextMeasure, "1m");

        this.setState({
          isStarted: true,
        });
        break;
      case "bpm":
        Tone.Transport.bpm.value = value;

        this.setState({
          bpm: value,
        });
        break;
    }
  };

  handleValueChange = (instrumentName, property, value) => {
    const { bassSettings, melodySettings } = this.state;

    let instrument;
    let chorus;
    let distortion;
    let pingPongDelay;
    let bitCrusher;
    let settings;

    if (instrumentName === "bass") {
      instrument = bassSynth;
      chorus = bassChorus;
      distortion = bassDistortion;
      pingPongDelay = bassPingPongDelay;
      bitCrusher = bassBitCrusher;
      settings = bassSettings;
    } else if (instrumentName === "melody") {
      instrument = melodySynth;
      chorus = melodyChorus;
      distortion = melodyDistortion;
      pingPongDelay = melodyPingPongDelay;
      bitCrusher = melodyBitCrusher;
      settings = melodySettings;
    }

    switch (property) {
      case "synthType":
        instrument.oscillator.type = value;
        settings.synth.oscillator.type = value;
        break;
      case "synthShowEnvelope":
        settings.synthUI.envelopeShow = value;
        break;
      case "synthEnvelopeAttack":
        instrument.envelope.attack = value;
        settings.synth.envelope.attack = value;
        break;
      case "synthEnvelopeDecay":
        instrument.envelope.decay = value;
        settings.synth.envelope.decay = value;
        break;
      case "synthEnvelopeSustain":
        instrument.envelope.sustain = value;
        settings.synth.envelope.sustain = value;
        break;
      case "synthEnvelopeRelease":
        instrument.envelope.release = value;
        settings.synth.envelope.release = value;
        break;
      case "chorusWet":
        chorus.wet.value = value;
        settings.chorus.wet = value;
        break;
      case "chorusType":
        chorus.type = value;
        settings.chorus.type = value;
        break;
      case "chorusFrequency":
        chorus.frequency.value = value;
        settings.chorus.frequency = value;
        break;
      case "chorusDelayTime":
        chorus.delayTime = value;
        settings.chorus.delayTime = value;
        break;
      case "chorusDepth":
        chorus.depth = value;
        settings.chorus.depth = value;
        break;
      case "chorusSpread":
        chorus.spread = value;
        settings.chorus.spread = value;
        break;
      case "distortionWet":
        distortion.wet.value = value;
        settings.distortion.wet = value;
        break;
      case "distortionDistortion":
        distortion.distortion = value;
        settings.distortion.distortion = value;
        break;
      case "distortionOversample":
        distortion.oversample = value;
        settings.distortion.oversample = value;
        break;
      case "bitCrusherWet":
        bitCrusher.wet.value = value;
        settings.bitCrusher.wet = value;
        break;
      case "bitCrusherBits":
        bitCrusher.bits = value;
        settings.bitCrusher.bits = value;
        break;
      case "pingPongDelayWet":
        pingPongDelay.wet.value = value;
        settings.pingPongDelay.wet = value;
        break;
      case "pingPongDelayDelayTime":
        pingPongDelay.delayTime.value = value;
        settings.pingPongDelay.delayTime = value;
        break;
      case "pingPongDelayMaxDelayTime":
        pingPongDelay.maxDelayTime = value;
        settings.pingPongDelay.maxDelayTime = value;
        break;
    }

    this.setState({
      bassSettings,
      melodySettings,
    });
  };

  handleMelodySoundPresetChange = (property, value) => {
    const { melodySettings } = this.state;
    const preset = melodySettings.presets[value];

    const instrument = melodySynth;
    const chorus = melodyChorus;
    const distortion = melodyDistortion;
    const pingPongDelay = melodyPingPongDelay;
    const bitCrusher = melodyBitCrusher;
    const settings = melodySettings;

    const { oscillator, envelope } = preset.synth;

    instrument.oscillator.type = oscillator.type;
    settings.synth.oscillator.type = oscillator.type;

    instrument.envelope.attack = envelope.attack;
    settings.synth.envelope.attack = envelope.attack;

    instrument.envelope.decay = envelope.decay;
    settings.synth.envelope.decay = envelope.decay;

    instrument.envelope.sustain = envelope.sustain;
    settings.synth.envelope.sustain = envelope.sustain;

    instrument.envelope.release = envelope.release;
    settings.synth.envelope.release = envelope.release;

    chorus.wet.value = preset.chorus.wet;
    settings.chorus.wet = preset.chorus.wet;

    chorus.type = preset.chorus.type;
    settings.chorus.type = preset.chorus.type;

    chorus.frequency.value = preset.chorus.frequency;
    settings.chorus.frequency = preset.chorus.frequency;

    chorus.delayTime = preset.chorus.delayTime;
    settings.chorus.delayTime = preset.chorus.delayTime;

    chorus.depth = preset.chorus.depth;
    settings.chorus.depth = preset.chorus.depth;

    chorus.spread = preset.chorus.spread;
    settings.chorus.spread = preset.chorus.spread;

    distortion.wet.value = preset.distortion.wet;
    settings.distortion.wet = preset.distortion.wet;

    distortion.distortion = preset.distortion.distortion;
    settings.distortion.distortion = preset.distortion.distortion;

    distortion.oversample = preset.distortion.oversample;
    settings.distortion.oversample = preset.distortion.oversample;

    bitCrusher.wet.value = preset.bitCrusher.wet;
    settings.bitCrusher.wet = preset.bitCrusher.wet;

    bitCrusher.bits = preset.bitCrusher.bits;
    settings.bitCrusher.bits = preset.bitCrusher.bits;

    pingPongDelay.wet.value = preset.pingPongDelay.wet;
    settings.pingPongDelay.wet = preset.pingPongDelay.wet;

    pingPongDelay.delayTime.value = preset.pingPongDelay.delayTime;
    settings.pingPongDelay.delayTime = preset.pingPongDelay.delayTime;

    pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime;
    settings.pingPongDelay.maxDelayTime = preset.pingPongDelay.maxDelayTime;

    settings.presets.current = value;

    this.setState({
      melodySettings,
    });
  };

  handleMelodySequenceChange = (property, value) => {
    const { melodySettings } = this.state;
    const steps = melodySettings.sequence[value];

    melodySettings.sequence.current = value;
    melodyPart.clear();

    steps.forEach((step, i) => {
      melodyPart.add(step);
    });

    this.setState({
      melodySettings,
    });
  };

  handleMelodyValueChange = (property, value) => {
    const { melodySettings } = this.state;

    if (property === "channelVolume") {
      melodyChannel.volume.value = value;
      melodySettings.channel.volume = value;
    } else if (property === "channelMute") {
      console.log(
        "=====BEFORE=====",
        melodySettings.channel.mute,
        melodyChannel.mute,
        melodySettings.channel.mute,
        melodyChannel
      );

      const mute = !melodySettings.channel.mute;
      melodyChannel.mute = mute;
      melodySettings.channel.mute = mute;

      console.log(
        "=====AFTER=====",
        mute,
        melodyChannel.mute,
        melodySettings.channel.mute,
        melodyChannel
      );
    } else if (property === "channelPan") {
      melodyChannel.pan.value = value;
      melodySettings.channel.pan = value;
    }

    this.setState({
      melodySettings,
    });
  };

  handleDrumsValueChange = (property, value) => {
    const { drumsSettings } = this.state;

    if (property === "channelVolume") {
      samplerChannel.volume.value = value;
      drumsSettings.channel.volume = value;
    } else if (property === "channelMute") {
      console.log(
        "=====BEFORE=====",
        drumsSettings.channel.mute,
        samplerChannel.mute,
        drumsSettings.channel.mute,
        samplerChannel
      );

      const mute = !drumsSettings.channel.mute;
      samplerChannel.mute = mute;
      drumsSettings.channel.mute = mute;

      console.log(
        "=====AFTER=====",
        mute,
        samplerChannel.mute,
        drumsSettings.channel.mute,
        samplerChannel
      );
    } else if (property === "channelPan") {
      samplerChannel.pan.value = value;
      drumsSettings.channel.pan = value;
    }

    this.setState({
      drumsSettings,
    });
  };

  handleToggleUIShow = () => {
    const { isUIShown } = this.state;

    this.setState({
      isUIShown: !isUIShown,
    });
  };

  renderStartButton = () => {
    //return <SC_Button text="PLAY" handleClick={this.handleStart} />;
  };

  renderShowHideButton = () => {
    // return (
    //   <div className="toggleUIButton" onClick={this.handleToggleUIShow}>
    //     Show/Hide UI
    //   </div>
    // );
  };

  renderUI = () => {
    const {
      bpm,
      melodyChangeMeasureSelect,
      melodyChangeMeasure,
      melodyChangeRandom,
      melodyChange,
      bassSettings,
      melodySettings,
      drumsSettings,
    } = this.state;

    const melodyChangeButtonText = melodyChange ? "On" : "Off";

    return (
      <div className="instrumentUI">
        <div className="Header">
          <SC_Button text="play" handleClick={this.handleStart} />
          <div className="Pic"></div>
          <div className="BpmWpapper">
            {/* <div className="Rect"></div> */}
            <div className="BPM">
              <SC_Slider
                name="BPM"
                min={0}
                max={300}
                step={1}
                value={bpm}
                property="bpm"
                handleChange={(property, value) => {
                  this.handleTransportChange(property, value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="Synth">
          <div className="Left">
            <ToneSynth
              title="Vitamin Synth"
              instrumentName="melody"
              settings={melodySettings}
              handleValueChange={this.handleValueChange}
            />

            <Channel
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />

            <div className="SequenceSettings">
              <div className="Sequence">
                <SC_ToggleButtonSet
                  name="Sequence"
                  options={["steps1", "steps2"]}
                  value={melodySettings.sequence.current}
                  property="melodySequence"
                  handleChange={this.handleMelodySequenceChange}
                />
              </div>

              <div className="Sound">
                <SC_ToggleButtonSet
                  name="Sound"
                  options={["default", "preset1", "preset2"]}
                  value={melodySettings.presets.current}
                  property="melodySoundPreset"
                  handleChange={this.handleMelodySoundPresetChange}
                />
              </div>
            </div>

            <Select
              name="Change melody on measure"
              options={[2, 4, 8, 16, 32]}
              isOpened={melodyChangeMeasureSelect}
              value={melodyChangeMeasure}
              property=""
              handleMelodyChangeMeasureSelectOpen={
                this.handleMelodyChangeMeasureSelectOpen
              }
              handleMelodyChangeMeasureSelectClose={
                this.handleMelodyChangeMeasureSelectClose
              }
              handleChange={this.handleMelodyChangeMeasure}
            />
            <div className="DuoButtons">
              <SC_ToggleButton
                text={melodyChangeButtonText}
                isOn={melodyChange}
                handleClick={this.handleMelodyChange}
              />

              <SC_ToggleButton
                text="Random"
                isOn={melodyChangeRandom}
                handleClick={this.handleMelodyChangeRandom}
              />
            </div>

            <div className="Effect">
              <ChorusEffect
                title="Chorus"
                instrumentName="melody"
                settings={melodySettings}
                handleValueChange={this.handleValueChange}
              />
            </div>

            <div className="DuoEffect">
              <div className="Effect">
                <BitCrusherEffect
                  title="BitCrusher"
                  instrumentName="melody"
                  settings={melodySettings}
                  handleValueChange={this.handleValueChange}
                />
              </div>

              <div className="Effect">
                <PingPongDelayEffect
                  title="Ping Pong Delay"
                  instrumentName="melody"
                  settings={melodySettings}
                  handleValueChange={this.handleValueChange}
                />
              </div>
            </div>

            <div className="Effect">
              <DistortionEffect
                title="Distortion"
                instrumentName="melody"
                settings={melodySettings}
                handleValueChange={this.handleValueChange}
              />
            </div>
          </div>

          <div className="Right">
            <ToneSynth
              title="Mineral Synth"
              instrumentName="bass"
              settings={bassSettings}
              handleValueChange={this.handleValueChange}
            />

            <div className="Effect">
              <ChorusEffect
                title="Chorus"
                instrumentName="bass"
                settings={bassSettings}
                handleValueChange={this.handleValueChange}
              />
            </div>

            <div className="DuoEffect">
              <div className="Effect">
                <BitCrusherEffect
                  title="BitCrusher"
                  instrumentName="bass"
                  settings={bassSettings}
                  handleValueChange={this.handleValueChange}
                />
              </div>

              <div className="Effect">
                <PingPongDelayEffect
                  title="Ping Pong Delay"
                  instrumentName="bass"
                  settings={bassSettings}
                  handleValueChange={this.handleValueChange}
                />
              </div>
            </div>

            <div className="Effect">
              <DistortionEffect
                title="Distortion"
                instrumentName="bass"
                settings={bassSettings}
                handleValueChange={this.handleValueChange}
              />
            </div>

            <div className="Boom">
              {/* <div className="Beat">
              <h1>Beat</h1>
              <Channel
                settings={drumsSettings}
                handleValueChange={this.handleDrumsValueChange}
              />
            </div> */}
              <div className="Samples">
                <div className="sampleButtonWrapper">
                  <div className="Square">
                    <SC_Button
                      text="SPACE"
                      handleClick={() => {
                        sampler.triggerAttackRelease("A1", "1n");
                      }}
                    />
                  </div>
                  <SC_Button
                    text="PERC"
                    handleClick={() => {
                      sampler.triggerAttackRelease("A2", "1n");
                    }}
                  />
                  <SC_Button
                    text="GLASS"
                    handleClick={() => {
                      sampler.triggerAttackRelease("A3", "1n");
                    }}
                  />
                  <SC_Button
                    text="RATTLE"
                    handleClick={() => {
                      sampler.triggerAttackRelease("A4", "1n");
                    }}
                  />
                  <SC_Button
                    text="KICK"
                    handleClick={() => {
                      sampler.triggerAttackRelease("C1", "1n");
                    }}
                  />
                  <div className="Square">
                    <SC_Button
                      text="CHCH"
                      handleClick={() => {
                        sampler.triggerAttackRelease("C2", "1n");
                      }}
                    />
                  </div>
                  <SC_Button
                    text="LIFE"
                    handleClick={() => {
                      sampler.triggerAttackRelease("C3", "1n");
                    }}
                  />

                  <div className="Square">
                    <SC_Button
                      text="SNARE"
                      handleClick={() => {
                        sampler.triggerAttackRelease("C4", "1n");
                      }}
                    />
                  </div>
                  <SC_Button
                    text="ECHO"
                    handleClick={() => {
                      sampler.triggerAttackRelease("E1", "1n");
                    }}
                  />
                  <div className="Square">
                    <SC_Button
                      text="SUSPICIOUS"
                      handleClick={() => {
                        sampler.triggerAttackRelease("E3", "1n");
                      }}
                    />
                  </div>
                  <SC_Button
                    text="RADIO"
                    handleClick={() => {
                      sampler.triggerAttackRelease("E2", "1n");
                    }}
                  />

                  <SC_Button
                    text="QUACK"
                    handleClick={() => {
                      sampler.triggerAttackRelease("E4", "1n");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { isStarted, isUIShown } = this.state;

    return (
      <div className="Container">
        {isStarted ? this.renderShowHideButton() : this.renderStartButton()}
        {isUIShown ? this.renderUI() : ""}
      </div>
    );
  }
}

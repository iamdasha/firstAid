@prototypes_data = [
  {
    name: 'First module / First prototype'
  },
  {
    name: 'First oscillator'
  },
  {
    name: 'Homework'
  },
  {
    name: 'Oscillator with React components'
  },
  {
    name: 'Tone.js basics'
  },
  {
    name: 'Experiment_1'
  },
  {
    name: 'Experiment_2'
  },
  {
    name: 'Tone.js with UI'
  },
  {
    name: 'Tone.js with UI, better change function'
  },
  {
    name: 'Experiment_3'
  },
  {
    name: 'Tone.js with UI, Composition'
  },
  {
    name: 'Tone.js with UI, Composition_2'
  },
  {
    name: 'Tone.js with UI, Sampler'
  },
  {
    name: 'My Synth'
  },
  {
    name: 'Aid Synth'
  },
  {
    name: 'JS'
  },
  {
    name: 'Effects modules'
  },
  {
    name: 'Effects UI components'
  },
  {
    name: 'Synth 2.0'
  },
  {
    name: 'FIRST AID KIT SYNTH 2.0'
  }
]

def seed
  reset_db
  create_prototypes
end

def reset_db
  Rake::Task['db:drop'].invoke
  Rake::Task['db:create'].invoke
  Rake::Task['db:migrate'].invoke
end

def create_prototypes
  @prototypes_data.each do |prototype_data|
    prototype = Prototype.create!(prototype_data)
    puts "#{prototype.name} prototype just created"
  end
end

seed

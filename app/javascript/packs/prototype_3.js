document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_3')
  const arc = document.createElement('div')
  const flower = document.createElement('div')
  const leafs = document.createElement('div')
  const leaf = document.createElement('div')
  const leaf2 = document.createElement('div')

  arc.classList.add('arc')
  flower.innerText = 'FLOWER POWER'
  flower.classList.add('flower')
  leafs.classList.add('leafs')
  leaf.classList.add('leaf')
  leaf2.classList.add('leaf2')

  container.appendChild(arc)
  container.appendChild(flower)
  container.appendChild(leafs)
  leafs.appendChild(leaf)
  leafs.appendChild(leaf2)
})

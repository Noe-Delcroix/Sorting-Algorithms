var list = []

let osc
var sorting = false
var shuffling = false

var totalSleeps = 0
var updates = []

var AlgorithmsName = ["Bubble Sort", "Selection Sort", "Insersion Sort", "Odd-Even Sort", "Gnome Sort", "Shaker Sort", "Cocktail Sort", "Counting Sort", "Shell Sort", "Comb Sort", "Quick Sort", "Merge Sort", "Gravity Sort"]

var Bsort
var Bshuffle
var Ealgorithm
var ErenderMode
var Espeed
var Esound

var Cupdated

function createList(listLength) {
  list = []
  for (let i = 0; i < listLength; i++) {
    list.push(i)
  }
}

function setup() {
  let canvas = createCanvas(windowWidth - 170, windowHeight);
  Bsort = createButton('Sort')
  Bsort.style('width', '150px')
  Bsort.style('height', '25px')
  Bsort.position(width, 0)
  Bsort.mousePressed(sortButton)

  Bshuffle = createButton('Shuffle')
  Bshuffle.style('width', '150px')
  Bshuffle.style('height', '25px')
  Bshuffle.position(width, 30)
  Bshuffle.mousePressed(startShuffling)

  p = createP("Selected Algorithm :")
  p.position(width, 50)
  Ealgorithm = createSelect()
  Ealgorithm.position(width, 90)
  for (let o of AlgorithmsName) {
    Ealgorithm.option(o)
  }
  p = createP("Render Mode :")
  p.position(width, 100)
  ErenderMode = createSelect()
  ErenderMode.position(width, 140)
  ErenderMode.option('Bars')
  ErenderMode.option('Pyramid')
  ErenderMode.option('Circle')
  ErenderMode.option('Disparity Dots')
  ErenderMode.changed(renderList)

  p = createP("Array Size :")
  p.position(width, 155)
  EArraySize = createSlider(50, 500, 100, 1)
  EArraySize.position(width, 190)
  EArraySize.input(updateList)

  p = createP("Sorting Speed :")
  p.position(width, 200)
  Espeed = createSlider(1, 100, 1, 1)
  Espeed.position(width, 235)

  Esound = createCheckbox('Sound ?', true)
  Esound.position(width, 265)

  p = createP("Updated Color :")
  p.position(width, 300)
  Cupdated = createColorPicker(color(255))
  Cupdated.position(width, 340)

  createList(EArraySize.value())
  osc = new p5.Oscillator('square')
  osc.amp(1)
  osc.start()
  osc.fade(0, 0)
}


function draw() {
  renderList()
  updates = []
  if (!sorting) {
    EArraySize.show()
    Bshuffle.style('background-color', color(255))
    Bsort.html('Sort')
    Bsort.style('background-color', color(255))
  } else {
    EArraySize.hide()
    Bsort.style('background-color', color(84, 220, 247))
    Bshuffle.style('background-color', color(100))
    Bsort.html('Sorting ...')
  }
  if (shuffling) {
    Bshuffle.html('Suffling ...')
    Bsort.style('background-color', color(100))
    Bshuffle.style('background-color', color(84, 220, 247))
  } else {
    Bshuffle.html('Suffle')
  }

  let sorted = true
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] > list[i + 1]) {
      sorted = false
      break
    }
  }
  if (sorted) {
    sorting = false
  }
}

function updateList() {
  createList(EArraySize.value())
  renderList()
}



function renderList() {
  colorMode(RGB)
  background(30)
  noStroke()
  let a = TWO_PI / list.length
  for (var i = 0; i < list.length; i++) {
    if (!updates.includes(i)) {
      colorMode(HSB, list.length)
      fill(list[i], list.length, list.length)
    } else {
      colorMode(RGB)
      fill(Cupdated.color())
    }

    if (ErenderMode.value() == 'Bars') {
      rectMode(CORNER)
      rect(i * (width / list.length), height, width / list.length, -(list[i] + 1) * (height / list.length))
    } else if (ErenderMode.value() == 'Pyramid') {
      rectMode(CENTER)
      rect(i * (width / list.length) + width / list.length / 2, height / 2, width / list.length, -(list[i] + 1) * (height / list.length))
    } else if (ErenderMode.value() == 'Circle') {
      push()
      translate(width / 2, height / 2)
      triangle(0, 0, width / 2.2 * cos(i * a), height / 2.2 * sin(i * a), width / 2.2 * cos((i + 1) * a), height / 2.2 * sin((i + 1) * a))
      pop()
    } else if (ErenderMode.value() == 'Disparity Dots') {
      let d = min(abs(i - list[i]), abs((i + (list.length - 1)) - list[i]))


      push()
      translate(width / 2, height / 2)
      circle(map(d, 0, list.length / 2, width / 2.2, 0) * cos(i * a), map(d, 0, list.length / 2, height / 2.2, 0) * sin(i * a), 5)
      pop()
    }
  }
  colorMode(RGB)
  fill(255)
  stroke(0)
  strokeWeight(2)
  textSize(15)
  textAlign(LEFT, TOP)
  text('Array Size : ' + EArraySize.value(), 0, 5)
}

async function swap(arr, i1, i2) {
  await sleep(0);
  playSound((i1 + i2) / 2)

  let temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp

}

async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        await swap(arr, j, j + 1)
      }
    }
  }
}

async function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    await swap(arr, i, minIndex)
  }
}

async function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i]
    let j
    for (j=i-1 ; j>=0 && arr[j] > key;j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = key
    playSound(j + 1)
    await sleep(0)
  }
}

async function oddEvenSort(arr) {
  let isSorted = false
  while (!isSorted) {
    isSorted = true
    for (let i = 1; i <= arr.length - 2; i += 2) {
      if (arr[i] > arr[i + 1]) {
        await swap(arr, i, i + 1)
        isSorted = false
      }
    }
    for (let i = 0; i <= arr.length - 2; i += 2) {
      if (arr[i] > arr[i + 1]) {
        await swap(arr, i, i + 1)
        isSorted = false
      }
    }
  }
}

async function gnomeSort(arr) {
  let index = 0
  while (index < arr.length) {
    if (index == 0) {
      index++
    }
    if (arr[index] > arr[index - 1]) {
      index++
    } else {
      await swap(arr, index, index - 1)
      index--
    }
  }
}

async function shakerSort(arr) {
  let perm = true
  let way = 1
  let j = 0
  let start = 0
  let end = arr.length - 2
  while (perm) {
    perm = false
    while ((j < end && way == 1) || (j > start && way == -1)) {
      if (arr[j] > arr[j + 1]) {
        perm = true
        await swap(arr, j, j + 1)
      }
      j += way
    }
    if (way == 1) {
      end -= 1
    } else {
      start += 1
    }
    way *= -1
  }
}

async function cocktailSort(arr) {
  let swapped = true
  let start = 0
  let end = arr.length

  while (swapped) {
    swapped = false
    for (let i = start; i < end - 1; ++i) {
      if (arr[i] > arr[i + 1]) {
        await swap(arr, i, i + 1)
        swapped = true
      }
    }
    if (!swapped) {
      break
    }
    swapped = false
    end--
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        await swap(arr, i, i + 1)
        swapped = true
      }
    }
    start++
  }
}

async function countingSort(arr) {
  let z = 0
  let count = []
  for (let i = 0; i <= arr.length; i++) {
    count[i] = 0
  }
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++
  }
  for (let i = 0; i <= arr.length; i++) {
    while (count[i]-- > 0) {
      list[z++] = i
      await sleep(0)
      playSound(z)
    }

  }

}

async function shellSort(arr) {
  let gap = arr.length / 2
  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      let j = i
      let temp = arr[i]
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        await sleep(0)
        playSound(j)
        j -= gap

      }
      arr[j] = temp
    }
    if (gap == 2) {
      gap = 1
    } else {
      gap = parseInt(gap * 5 / 11)
    }

  }
}

async function combSort(arr) {
  let perm = true
  let gap = arr.length
  while (perm || gap > 1) {
    perm = false
    gap = floor(gap / 1.333)
    if (gap < 1) {
      gap = 1
    }
    for (let i = 0; i < arr.length - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        perm = true
        await swap(arr, i, i + gap)
      }
    }
  }
}

async function partition(arr, start, end) {
  let pivotValue = arr[end]
  let pivotIndex = start
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex)
      pivotIndex++
    }
  }
  await swap(arr, pivotIndex, end)
  return pivotIndex
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return
  }
  let index = await partition(arr, start, end)

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ])
}

async function mergeSort(arr, start, end) {
  if (end - start <= 1) {
    return;
  }
  var mid = Math.round((end + start) / 2);
  await mergeSort(arr, start, mid)
  await mergeSort(arr, mid, end)

  let i = start
  let j = mid
  while (i < end && j < end) {
    if (arr[i] > arr[j]) {
      let t = arr[j]
      arr.splice(j, 1)
      playSound(j)
      await sleep(0)
      arr.splice(i, 0, t)
      j++
    }
    i++
    if (i == j) j++
    values = arr.slice()
  }
}

  
  
  
function sleep(ms) {
  if (totalSleeps < Espeed.value()) {
    totalSleeps++
  } else {
    totalSleeps = 0
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

async function sortButton() {
  let sorted = true
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] > list[i + 1]) {
      sorted = false
      break
    }
  }

  if (!sorting && !shuffling && !sorted) {
    sorting = true
    let selected = AlgorithmsName.indexOf(Ealgorithm.value())
    await sleep(0)
    if (selected == 0) {
      bubbleSort(list)
    } else if (selected == 1) {
      selectionSort(list)
    } else if (selected == 2) {
      insertionSort(list)
    } else if (selected == 3) {
      oddEvenSort(list)
    } else if (selected == 4) {
      gnomeSort(list)
    } else if (selected == 5) {
      shakerSort(list)
    } else if (selected == 6) {
      cocktailSort(list)
    } else if (selected == 7) {
      countingSort(list)
    } else if (selected == 8) {
      shellSort(list)
    } else if (selected == 9) {
      combSort(list)
    } else if (selected == 10) {
      quickSort(list, 0, list.length - 1)
    } else if (selected == 11) {
      mergeSort(list, 0, list.length)
    } else if (selected == 12){
    }
  }
}
async function startShuffling() {
  totalSleeps = 0
  if (!sorting && !shuffling) {
    shuffling = true
    for (let i = 0; i < list.length; i++) {
      await swap(list, i, int(random(0, list.length)))
    }
    shuffling = false
  }
}

function playSound(index) {
  updates.push(int(index))
  if (Esound.checked()) {
    osc.freq(map(index, 0, list.length, 0, 1500))
    osc.fade(1, 0)
    osc.fade(0, 0.01)
  }
}
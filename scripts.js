const speed = document.getElementById("speed");
let Stopped = false, n, width = 5, delay, step = 0, max_step = 10000;
const currentSpeed = document.getElementById("currentSpeed");
speed.addEventListener("input", () => {
    let cur_speed = parseInt(speed.value);
    currentSpeed.innerText = cur_speed + "%";
    delay = 1000 - cur_speed*10;
    max_step = -9*delay+10000;
})
const container = document.getElementById("container"),
 collection = container.children,
 bw = document.getElementById("bw"),
 currentWidth = document.getElementById("currentWidth");
bw.addEventListener("input", () => {
    width = parseFloat(bw.value);
    currentWidth.innerText = width + "px";
})
function getInput() {
    container.innerHTML = "";
    n = parseInt(document.getElementById("n").value);
    if (n > 1000000) {
        window.alert("Warning: n should not greater than 1000000 or the page may not respond!!!");
        return;
    }
    stopSorting();
    for (let i = 0; i < n; i++) {
        const childDiv = document.createElement("div");
        childDiv.className = "child";
        childDiv.style.height = Math.floor(Math.random() * 99) + 0.2 + Math.random() + "%";
        childDiv.style.width = width + "px";
        childDiv.style.marginLeft = width/5;
        childDiv.style.marginRight = width/5;
        container.appendChild(childDiv);
    }
}
function hidenote() {
    const note = document.getElementById("note");
    const button = document.getElementById("hidenote");
    note.style.display = "none";
    button.style.display = "none";
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function stopSorting() {
    Stopped = true;
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(frequency, duration=100) {
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = 'sine'; // You can try: 'sine', 'square', 'triangle', 'sawtooth'
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime); // start at 0.1

    // Fade out
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration / 1000);
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration / 1000);
}
async function selectionSort(left, right) {
    for (let i = left; i <= right; i++) {
        let min_idx = i;
        collection[i].style.backgroundColor = "red";
        for (let j = i+1; j <= right; j++) {
            collection[j].style.backgroundColor = "red";
            collection[j-1].style.backgroundColor = "blue";
            collection[min_idx].style.backgroundColor = "orange";
            if (parseFloat(collection[j].style.height) < parseFloat(collection[min_idx].style.height)) {
                collection[min_idx].style.backgroundColor = "blue";
                collection[i].style.backgroundColor = "red";
                min_idx = j;
                collection[min_idx].style.backgroundColor = "orange";
            }
            if (Stopped) return;
            if (delay >= 10) await sleep(delay-10);
            else {
                step++;
                if (step >= max_step) {
                    await sleep(0);
                    step = 0;
                    playTone(parseFloat(collection[j].style.height)*3+200);
                }
            }
            if (delay >= 10) playTone(parseFloat(collection[j].style.height)*3+200);
        }
        let tmp = collection[i].style.height;
        collection[i].style.height = collection[min_idx].style.height;
        collection[min_idx].style.height = tmp;
        collection[i].style.backgroundColor = "blue";
        collection[right].style.backgroundColor = "blue";
        collection[min_idx].style.backgroundColor = "blue";
        collection[i].style.backgroundColor = "green";
    }
    collection[right].style.backgroundColor = "green";
}
async function bubbleSort(left, right) {
    for (let i = left; i <= right; i++) {
        for (let j = left; j <= right-i-1; j++) {
            collection[j].style.backgroundColor = "red";
            collection[j+1].style.backgroundColor = "red";
            if (parseFloat(collection[j+1].style.height) < parseFloat(collection[j].style.height)) {
                collection[j+1].style.backgroundColor = "orange";
                let tmp = collection[j].style.height;
                collection[j].style.height = collection[j+1].style.height;
                collection[j+1].style.height = tmp;
            }
            if (Stopped) return;
            if (delay >= 10) await sleep(delay-10);
            else {
                step++;
                if (step >= max_step) {
                    await sleep(0);
                    step = 0;
                    playTone(parseFloat(collection[j].style.height)*3+200);
                }
            }
            if (delay >= 10) playTone(parseFloat(collection[j].style.height)*3+200);
            collection[j].style.backgroundColor = "blue";
            collection[j+1].style.backgroundColor = "blue";
        }
        collection[right-i].style.backgroundColor = "green";
    }
}
async function qSort(left, right) {
    if (left > right) return;
    let pivot = parseInt((left + right) / 2);
    let i = left;
    let j = right;
    collection[i].style.backgroundColor = "red";
    collection[j].style.backgroundColor = "red";
    while (true) {
        collection[pivot].style.backgroundColor = "purple";
        while (parseFloat(collection[i].style.height) <= parseFloat(collection[pivot].style.height)) {
            if (i < pivot) {
                i++;
                collection[i].style.backgroundColor = "red";
                collection[i-1].style.backgroundColor = "blue";
            }
            else break;
            if (delay >= 10) await sleep((delay-10)/2);
            else {
                step++;
                if (step >= max_step) {
                    await sleep(0);
                    step = 0;
                    playTone(parseFloat(collection[i].style.height)*3+200);
                }
            }
            if (Stopped) return;
            if (delay >= 10) playTone(parseFloat(collection[i].style.height)*3+200);
        }
        while (parseFloat(collection[j].style.height) >= parseFloat(collection[pivot].style.height)) {
            if (j > pivot) {
                j--;
                collection[j].style.backgroundColor = "red";
                collection[j+1].style.backgroundColor = "blue";
            }
            else break;
            if (delay >= 10) await sleep((delay-10)/2);
            else {
                step++;
                if (step >= max_step) {
                    await sleep(0);
                    step = 0;
                    playTone(parseFloat(collection[j].style.height)*3+200);
                }
            }
            if (Stopped) return;
            if (delay >= 10) playTone(parseFloat(collection[j].style.height)*3+200);
        }
        if (i == j) break;
        collection[i].style.backgroundColor = "orange";
        collection[j].style.backgroundColor = "orange";
        let tmp = collection[i].style.height;
        collection[i].style.height = collection[j].style.height;
        collection[j].style.height = tmp;
        if (i == pivot) pivot = j;
        else if (j == pivot) pivot = i;
        if (delay >= 10) await sleep(delay-10);
        else {
            step++;
            if (step >= max_step) {
                await sleep(0);
                step = 0;
                playTone(parseFloat(collection[j].style.height)*3+200);
            }
        }
        if (Stopped) return;
    }
    collection[i].style.backgroundColor = "green";
    collection[j].style.backgroundColor = "green";
    collection[pivot].style.backgroundColor = "green";
    await qSort(left, pivot-1);
    await qSort(pivot+1, right);
}
async function mSort(left, right) {
    if (left >= right) return;
    let mid = Math.floor((left + right) / 2);
    if (delay >= 10) await sleep(delay-10);
        else {
            step++;
            if (step >= max_step) {
                await sleep(0);
                step = 0;
            }
        }
        if (Stopped) return;
    await mSort(left, mid);
    await mSort(mid+1, right);
    let tmp = [];
    let i = left;
    let j = mid+1;
    collection[left].style.backgroundColor = "purple";
    collection[right].style.backgroundColor = "purple";
    while (i <= mid && j <= right) {
        let a = parseFloat(collection[i].style.height);
        let b = parseFloat(collection[j].style.height);
        collection[i].style.backgroundColor = "red";
        collection[j].style.backgroundColor = "orange";
        collection[left].style.backgroundColor = "purple";
        collection[right].style.backgroundColor = "purple";
        if (a < b) {
            tmp.push(a);
            if (delay >= 10) playTone(parseFloat(collection[i].style.height)*3+200);
            i++;
            collection[left].style.backgroundColor = "purple";
            collection[right].style.backgroundColor = "purple";
        }
        else {
            tmp.push(b);
            if (delay >= 10) playTone(parseFloat(collection[j].style.height)*3+200);
            j++;
            collection[left].style.backgroundColor = "purple";
            collection[right].style.backgroundColor = "purple";
        }
        if (delay >= 10) await sleep(delay-10);
        else {
            step++;
            if (step >= max_step) {
                await sleep(0);
                step = 0;
                playTone(parseFloat(collection[j].style.height)*3+200);
            }
        }
        if (Stopped) return;
        
    }
    while (i <= mid) {
        collection[i].style.backgroundColor = "red";
        tmp.push(parseFloat(collection[i].style.height));
        collection[left].style.backgroundColor = "purple";
        collection[right].style.backgroundColor = "purple";
        if (delay >= 10) await sleep((delay-10)/2);
        else {
            step++;
            if (step >= max_step) {
                await sleep(0);
                step = 0;
                playTone(parseFloat(collection[i].style.height)*3+200);
            }
        }
        if (Stopped) return;
        if (delay >= 10) playTone(parseFloat(collection[i].style.height)*3+200);
        i++;
    }
    while (j <= right) {
        collection[j].style.backgroundColor = "orange";
        tmp.push(parseFloat(collection[j].style.height));
        collection[left].style.backgroundColor = "purple";
        collection[right].style.backgroundColor = "purple";
        if (delay >= 10) await sleep((delay-10)/2);
        else {
            step++;
            if (step >= max_step) {
                await sleep(0);
                step = 0;
                playTone(parseFloat(collection[j].style.height)*3+200);
            }
        }
        if (Stopped) return;
        if (delay >= 10) playTone(parseFloat(collection[j].style.height)*3+200);
        j++;
    }
    for (let i = 0; i < tmp.length; i++) {
        collection[i + left].style.height = tmp[i] + "%";
        collection[i + left].style.backgroundColor = "green";
        if (delay >= 10) await sleep(delay-10);
        else {
            step++;
            if (step >= max_step) {
                await sleep(0);
                step = 0;
                playTone(parseFloat(collection[i].style.height)*3+200);
            }
        }
        if (Stopped) return;
        if (delay >= 10) playTone(parseFloat(collection[i].style.height)*3+200);
    }
}
// async function insertionSort()
async function StartSorting(Sort) {
    const check = document.getElementById("checker");
    check.innerText = "Sorting...";
    check.style.color = "aliceblue";
    if (n) {
        Stopped = false;
        for (let i = 0; i < n; i++) {
            collection[i].style.backgroundColor = "blue";
        }
        await Sort(0, n-1);
    }
    let isSorted = true;
    for (let i = 1; i < n; i++) {
        if (parseFloat(collection[i-1].style.height) > parseFloat(collection[i].style.height)) {
            isSorted = false;
            break;
        }
    }
    if (isSorted) {
        check.innerText = "Sorted!";
        check.style.color = "green";
    }
    else {
        check.innerText = "Error!";
        check.style.color = "red";
    }
}

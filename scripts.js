const speed = document.getElementById("speed");
let Stopped = false;
let n;
let delay;
let step = 0;
const currentSpeed = document.getElementById("currentSpeed");
speed.addEventListener("input", () => {
    let cur_speed = parseInt(speed.value);
    currentSpeed.innerText = cur_speed + "%";
    delay = (100 - cur_speed) * (1000 / 99);
})
const container = document.getElementById("container");
const collection = container.children;
function getInput() {
    container.innerHTML = "";
    n = parseInt(document.getElementById("n").value);
    stopSorting();
    for (let i = 0; i < n; i++) {
        const childDiv = document.createElement("div");
        childDiv.className = "child";
        childDiv.style.height = Math.floor(Math.random() * 101) + Math.random() + "%";
        container.appendChild(childDiv);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function sleepFrame() {
    return new Promise(requestAnimationFrame);
}
function stopSorting() {
    Stopped = true;
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
            if (delay > 0) await sleep(delay);
            else {
                step++;
                if (step===100) {
                    await sleep(0);
                    step = 0;
                }
            }
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
            if (delay > 0) await sleep(delay);
            else {
                step++;
                if (step===100) {
                    await sleep(0);
                    step = 0;
                }
            }
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
            if (delay > 0) await sleep(delay/2);
            else {
                step++;
                if (step===100) {
                    await sleep(0);
                    step = 0;
                }
            }
            if (Stopped) return;
        }
        while (parseFloat(collection[j].style.height) >= parseFloat(collection[pivot].style.height)) {
            if (j > pivot) {
                j--;
                collection[j].style.backgroundColor = "red";
                collection[j+1].style.backgroundColor = "blue";
            }
            else break;
            if (delay > 0) await sleep(delay/2);
            else {
                step++;
                if (step===100) {
                    await sleep(0);
                    step = 0;
                }
            }
            if (Stopped) return;
        }
        if (i == j) break;
        collection[i].style.backgroundColor = "orange";
        collection[j].style.backgroundColor = "orange";
        let tmp = collection[i].style.height;
        collection[i].style.height = collection[j].style.height;
        collection[j].style.height = tmp;
        if (i == pivot) pivot = j;
        else if (j == pivot) pivot = i;
        if (delay > 0) await sleep(delay);
        else {
            step++;
            if (step===100) {
                await sleep(0);
                step = 0;
            }
        }
        if (Stopped) return;
    }
    collection[i].style.backgroundColor = "green";
    collection[j].style.backgroundColor = "green";
    collection[pivot].style.backgroundColor = "green";
    qSort(left, pivot-1);
    qSort(pivot+1, right);
}
function StartSorting(Sort) {
    Stopped = false;
    for (let i = 0; i < n; i++) {
        collection[i].style.backgroundColor = "blue";
    }
    Sort(0, n-1);
}
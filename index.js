let time, clock, date, pomodoroCount, myInterval, pomodoroStartBtn, pomodoroResetBtn, pomodoroTime, pomodoroRestTime, restCounter, workIntervals, restIntervals
const startingMinutes = 25
const restMinutes = 5
const longRestMinutes = 15

const prepareDOMElements = () => {
    time = document.querySelector('.time')
    date = document.querySelector('.date')
    pomodoroCount = document.querySelector('.pomodoro__time')
    pomodoroStartBtn = document.querySelector('.pomodoro__buttons>.action:nth-of-type(1)')
    pomodoroResetBtn = document.querySelector('.pomodoro__buttons>.action:nth-of-type(2)')
    workIntervals = document.querySelectorAll('.work')
    restIntervals = document.querySelectorAll('.rest')

    pomodoroTime = startingMinutes * 60
    pomodoroRestTime = restMinutes * 60
    longRestTime = longRestMinutes * 60
    workCounter = 0
}
const formatClock = (data) => {
    data < 10 ? data = '0' + data : data
    return data
}
const getTime = () => {

    const date = new Date();
    time.textContent =
        `${formatClock(date.getHours())}
        :${formatClock(date.getMinutes())}
        :${formatClock(date.getSeconds())}`
}
const getDate = () =>{
    const today = new Date()
    date.textContent = today.toDateString()
}

const workTimer = () => {
    workIntervals[workCounter].classList.add('active')
    pomodoroTime--
    const minutes = Math.floor(pomodoroTime * 60 / 3600)
    const seconds = pomodoroTime % 60
    pomodoroCount.textContent = `${formatClock(minutes)}:${formatClock(seconds)}`

    if (pomodoroTime === 0) {
        clearInterval(myInterval)
        pomodoroRestTime = restMinutes * 60
        workCounter++
        if (workCounter == 4) {
            workCounter = 0
            restartProgressBar()
            myInterval = setInterval(longBreak, 1000)
        } else {
            restIntervals[workCounter-1].classList.add('active')
            myInterval = setInterval(restTimer, 1000)
        }
    }
}
const restartProgressBar = () =>{
    workIntervals.forEach(el=>el.classList.remove('active'))
    restIntervals.forEach(el=>el.classList.remove('active'))
}
const restTimer = () => {
    pomodoroRestTime--
    const minutes = Math.floor(pomodoroRestTime * 60 / 3600)
    const seconds = pomodoroRestTime % 60
    pomodoroCount.textContent = `${formatClock(minutes)}:${formatClock(seconds)}`
    if (pomodoroRestTime == 0) {
        clearInterval(myInterval)
        pomodoroTime = startingMinutes * 60
        myInterval = setInterval(workTimer, 1000)
    }

}
const longBreak = () => {
    longRestTime--
    const minutes = Math.floor(longRestTime * 60 / 3600)
    const seconds = longRestTime % 60
    pomodoroCount.textContent = `${formatClock(minutes)}:${formatClock(seconds)}`
    if (longRestTime == 0) {
        clearInterval(myInterval)
        longRestTime = longRestMinutes*60
        pomodoroTime=startingMinutes*60
        myInterval = setInterval(workTimer, 1000)
    }
}

const startPomodoro = () => {
    pomodoroStartBtn.addEventListener('click', () => {
        myInterval = setInterval(workTimer, 1000)
        pomodoroStartBtn.classList.remove('visible')
        pomodoroResetBtn.classList.add('visible')
    })
}

const rest = () => {
    pomodoroTime = 25 * 60
    clearInterval(myInterval)
    restInterval = setInterval(() => {
        pomodoroTimer()
    })
}
const resetPomodoro = () =>{
    pomodoroResetBtn.addEventListener('click',()=>{
        clearInterval(myInterval)
        restartProgressBar()
        pomodoroTime = startingMinutes*60
        pomodoroCount.textContent=`25:00`
        pomodoroResetBtn.classList.remove('visible')
        pomodoroStartBtn.classList.add('visible')
    })
}

const prepareDOMEvents = () => {}
const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
    setInterval(getTime, 60)
    getDate()
    startPomodoro()
    resetPomodoro()
}
window.addEventListener('DOMContentLoaded', main)
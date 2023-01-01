const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const NOTE_PATH = path.join(__dirname, './data/notes.json')

if (!fs.existsSync(NOTE_PATH)) {
    fs.mkdirSync(path.join(__dirname, './data'))
    fs.writeFileSync(NOTE_PATH, '[]')
}

const getNotesData = () => JSON.parse(fs.readFileSync(NOTE_PATH))

const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        transparent: true,
        show: false,
        resizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
        }
    })

    win.loadURL('http://localhost:5173/')
    // win.loadFile(path.join(__dirname, './dist/index.html'))

    win.on('ready-to-show', () => {
        win.show()
    })

    ipcMain.handle('get-notes-data', () => getNotesData())

    ipcMain.on('insert-note', (event, data) => {
        let notesData = getNotesData()
        notesData.unshift(data)
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })

    ipcMain.on('update-note', (event, index, data) => {
        let notesData = getNotesData()
        notesData[index] = data
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })

    ipcMain.on('delete-note', (event, index) => {
        let notesData = getNotesData()
        notesData.splice(index, 1)
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })

    ipcMain.on('window-close', () => {
        win.close()
    })

    ipcMain.on('log', (event, text) => {
        console.log(text)
    })

    // win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
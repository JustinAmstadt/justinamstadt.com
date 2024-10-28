let map = {};

const loadAceEditor = (sessionMode, startCode, editorName) => {
    const aceScript = document.createElement('script');
    aceScript.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/ace.js";
    aceScript.crossOrigin = "anonymous";
    aceScript.integrity = "sha384-1ZVI9BKoeGVH9iTUTlkS+6MYu+L/iAk4aFxwrSP7He7DPTBGLo44OKmfOukTMung";
    aceScript.onload = () => initializeEditor(sessionMode, startCode, editorName);
    document.head.appendChild(aceScript);
};

const initializeEditor = (sessionMode, startCode, editorName) => {
    const editor = ace.edit(editorName);
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/" + sessionMode);
    editor.setValue(startCode, -1);
    editor.setOptions({
        fontSize: "14pt",
        showLineNumbers: true,
        showGutter: true,
        wrap: true
    });

    map[editorName] = editor;

    const getEditorContent = (editorName) => {
        return map[editorName].getValue();
    }

    window.getEditorContent = getEditorContent;
};

window.loadAceEditor = loadAceEditor;

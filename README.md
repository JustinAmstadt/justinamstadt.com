Here is a first prototype for a browser application that can edit a webgl canvas on my website:

Click [this link](https://justinamstadt.com/opengl-tutorials/) to see!

**Current Notes:**

- I will figure out the css, but I figured it was best to show you things earlier rather than later. If you have a specific layout you want, let me know!

- I used [Ace Editor](https://ace.c9.io/) to create an editor and modified your code to delete and recompile the shader program.

**Code Locations:**

- [Html Page](https://github.com/JustinAmstadt/justinamstadt.com/blob/main/interactive_opengl/templates/interactive_opengl/cubeTest.html)

- [Javascript Files](https://github.com/JustinAmstadt/justinamstadt.com/tree/main/static/js/interactive_opengl)

Upcoming Goals:
- Be able to support multiple webgl canvases in the same page with their corresponding editors.
- Fix the css issues currently present
- Add javascript editing support to teach important concepts such as draw calls, creating vertices/indices as done in the cube assignment, and any other

**Potential Security Concern**

I am wondering what potential issues can arise by letting people edit code that directly affects the way their browser behaves. I have been thinking it's okay because all changes the user makes only affects their machine, but I want to raise this concern to ensure this isn't an issue.
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
- Fix the css issues currently present.
- Add javascript editing support to teach important concepts such as draw calls, creating vertices/indices as done in the cube assignment, and any other important javascript calls you want to emphasize.

**Potential Security Concern**

I am wondering what potential issues can arise by letting people edit code that directly affects the way their browser behaves. I have been thinking it's okay because all changes the user makes only affects their machine, but I want to raise this concern to ensure this isn't an issue.

**My Idea for How This Would Work**

I used [this website](https://cryptozombies.io/) this summer to get an introduction into Solidity and their whole learning model is to incrementally teach the user coding by having them add only 1 or 2 lines at a time before doing an automated string check to see if the new code is correct.

In our case, the same idea can be used, but the user can compare between a sample webgl output and their output to see if their code is correct, removing the need for automated checking.

**Example Problem**

The code editor is already pre-filled with the following code:

```
void main()
{
    const vec4 frontColor = vec4(0.0, 1.0, 1.0, 1.0);
    const vec4 backColor = vec4(1.0, 0.0, 0.0, 1.0);

    fragColor = gl_FrontFacing ? frontColor : backColor;
}
```

As you know, this code will error without setting `fragColor` as an `out` variable. So, all the user has to do is update their code editor and click the button to update their canvas and see if it works!

Correct Output:

```
out vec4 fragColor;

void main()
{
    const vec4 frontColor = vec4(0.0, 1.0, 1.0, 1.0);
    const vec4 backColor = vec4(1.0, 0.0, 0.0, 1.0);

    fragColor = gl_FrontFacing ? frontColor : backColor;
}
```
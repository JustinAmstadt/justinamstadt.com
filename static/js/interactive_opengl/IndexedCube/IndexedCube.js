/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        this.vertexShader ||= `
            in vec4 aPosition;

            uniform mat4 P;
            uniform mat4 MV;

            void main() {
                gl_Position = P * MV * aPosition;
            }
        `;

        this.fragmentShader ||= `
            out vec4 fragColor;

            void main()
            {
                const vec4 frontColor = vec4(0.0, 1.0, 1.0, 1.0);
                const vec4 backColor = vec4(1.0, 0.0, 0.0, 1.0);

                fragColor = gl_FrontFacing ? frontColor : backColor;
            } 
        `;

        this.vertices = new Float32Array([
            // Front
            0.5, 0.5, 0.5, // Top right
            -0.5, 0.5, 0.5, // Top left
            0.5, -0.5, 0.5, // Bottom right
            -0.5, -0.5, 0.5, // Bottom left
        
            // Back
            0.5, 0.5, -0.5, // Top right
            -0.5, 0.5, -0.5, // Top left
            0.5, -0.5, -0.5, // Bottom right
            -0.5, -0.5, -0.5 // Bottom left
        ]);
        
        this.indices = new Uint16Array([
            // Front face
            0, 1, 2,
            1, 3, 2,
        
            // Back face
            4, 6, 5,
            5, 6, 7,
        
            // Top face
            0, 4, 1,
            1, 4, 5,
        
            // Bottom face
            2, 3, 6,
            3, 7, 6,
        
            // Left face
            1, 5, 3,
            3, 5, 7,
        
            // Right face
            0, 2, 4,
            2, 6, 4 
        ]);

        this.initShader = () => {
            if (this.program !== undefined) {
                gl.deleteProgram(this.program.program);
            }
            this.program = new ShaderProgram(gl, this, this.vertexShader, this.fragmentShader);
            this.posAttribute = new Attribute(gl, this.program, "aPosition", this.vertices, 3, gl.FLOAT, false, 0, 0);
        }

        this.indicesBuffer = new Indices(gl, this.indices);

        this.initShader();

        this.draw = () => {
            this.program.use();

            this.posAttribute.enable();
            this.indicesBuffer.enable()

            gl.drawElements(gl.TRIANGLES, this.indicesBuffer.count, this.indicesBuffer.type, 0);

            this.indicesBuffer.disable()
            this.posAttribute.disable();
        };

        this.updateShaderProgram = (vertexShader, fragmentShader) => {

            this.vertexShader = vertexShader || this.vertexShader;
            this.fragmentShader = fragmentShader || this.fragmentShader;
            this.initShader();
        }
    }
};

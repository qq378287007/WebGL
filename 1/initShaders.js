function initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, VSHADER_SOURCE)
    gl.shaderSource(fragmentShader, FSHADER_SOURCE)

    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    return program
}
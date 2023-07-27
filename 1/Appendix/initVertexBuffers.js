function initVertexBuffers(gl, vertices, name, num) {
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, name);
    gl.vertexAttribPointer(a_Position, num, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vertices.length / num;
}

function initVertexBuffers2(gl, verticesColors, name1, num1, name2, num2) {
    const FSIZE = verticesColors.BYTES_PER_ELEMENT;

    const vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

    const num = num1 + num2;

    const a_Position = gl.getAttribLocation(gl.program, name1);
    gl.vertexAttribPointer(a_Position, num1, gl.FLOAT, false, FSIZE * num, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(gl.program, name2);
    gl.vertexAttribPointer(a_Color, num2, gl.FLOAT, false, FSIZE * num, FSIZE * num1);
    gl.enableVertexAttribArray(a_Color);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return verticesColors.length / num;
}

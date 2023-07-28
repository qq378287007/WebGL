function initArrayBuffer(gl, data, name, num) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const attribute = gl.getAttribLocation(gl.program, name);
    gl.vertexAttribPointer(attribute, num, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribute);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return data.length / num;
}

function initArrayBuffer2(gl, verticesColors, name1, num1, name2, num2) {
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

function initElementBuffer(gl, data) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

    return data.length;
}

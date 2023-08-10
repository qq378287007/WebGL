function writeAttribF(gl, name) {
    const attribute = gl.getAttribLocation(gl.program, name);
    switch (arguments.length - 2) {
        case 1:
            gl.vertexAttrib1f(attribute, arguments[2]);
            break;
        case 2:
            gl.vertexAttrib2f(attribute, arguments[2], arguments[3]);
            break;
        case 3:
            gl.vertexAttrib3f(attribute, arguments[2], arguments[3], arguments[4]);
            break;
        case 4:
            gl.vertexAttrib4f(attribute, arguments[2], arguments[3], arguments[4], arguments[5]);
            break;
    }
}

function writeAttribFv(gl, name, value) {
    const attribute = gl.getAttribLocation(gl.program, name);
    switch (value.length) {
        case 1:
            gl.vertexAttrib1fv(attribute, value);
            break;
        case 2:
            gl.vertexAttrib2fv(attribute, value);
            break;
        case 3:
            gl.vertexAttrib3fv(attribute, value);
            break;
        case 4:
            gl.vertexAttrib4fv(attribute, value);
            break;
    }
}

function writeUniformF(gl, name) {
    const uniform = gl.getUniformLocation(gl.program, name);
    switch (arguments.length - 2) {
        case 1:
            gl.uniform1f(uniform, arguments[2]);
            break;
        case 2:
            gl.uniform2f(uniform, arguments[2], arguments[3]);
            break;
        case 3:
            gl.uniform3f(uniform, arguments[2], arguments[3], arguments[4]);
            break;
        case 4:
            gl.uniform4f(uniform, arguments[2], arguments[3], arguments[4], arguments[5]);
            break;
    }
}

function writeUniformFv(gl, name, value) {
    const uniform = gl.getUniformLocation(gl.program, name);
    switch (value.length) {
        case 1:
            gl.uniform1fv(uniform, value);
            break;
        case 2:
            gl.uniform2fv(uniform, value);
            break;
        case 3:
            gl.uniform3fv(uniform, value);
            break;
        case 4:
            gl.uniform4fv(uniform, value);
            break;
    }
}

function writeUniformMatrix4fv(gl, name, value) {
    const uniformMatrix4 = gl.getUniformLocation(gl.program, name);
    gl.uniformMatrix4fv(uniformMatrix4, false, value);
}


function writeUniformI(gl, name) {
    const uniform = gl.getUniformLocation(gl.program, name);
    switch (arguments.length - 2) {
        case 1:
            gl.uniform1i(uniform, arguments[2]);
            break;
        case 2:
            gl.uniform2i(uniform, arguments[2], arguments[3]);
            break;
        case 3:
            gl.uniform3i(uniform, arguments[2], arguments[3], arguments[4]);
            break;
        case 4:
            gl.uniform4i(uniform, arguments[2], arguments[3], arguments[4], arguments[5]);
            break;
    }
}
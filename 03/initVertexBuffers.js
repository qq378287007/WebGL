function initVertexBuffers(gl, vertices, name, num) {
    const vertexBuffer = gl.createBuffer();//创建缓冲区对象，gl.deleteBuffer(buffer)删除缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//绑定缓冲区对象（ARRAY_BUFFER顶点数据，ELEMENT_ARRAY_BUFFER顶点索引值）
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);//数据写入缓冲区对象（STATIC_DRAW：一次写入多次绘制；）

    const a_Position = gl.getAttribLocation(gl.program, name);
    gl.vertexAttribPointer(a_Position, num, gl.FLOAT, false, 0, 0);//缓冲区对象分配给一个attribute变量（顶点分量num，false表示不将非浮点型数据归一化，0相邻两顶点间字节数，0偏移量）
    gl.enableVertexAttribArray(a_Position);//开启（分配）attribute变量，让缓冲区对attribute变量的分配生效，gl.disableVertexArray(location)关闭分配

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vertices.length / 2;
}

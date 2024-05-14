function loadTexture(gl, image, texUnit, name) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//gl.UNPACK_FLIP_Y_WEBGL：Y轴方向翻转

  switch (texUnit) {//激活纹理单元
    case 0:
      gl.activeTexture(gl.TEXTURE0);
      break;
    case 1:
      gl.activeTexture(gl.TEXTURE1);
      break;
    case 2:
      gl.activeTexture(gl.TEXTURE2);
      break;
    case 3:
      gl.activeTexture(gl.TEXTURE3);
      break;
    case 4:
      gl.activeTexture(gl.TEXTURE4);
      break;
    case 5:
      gl.activeTexture(gl.TEXTURE5);
      break;
    case 6:
      gl.activeTexture(gl.TEXTURE6);
      break;
    case 7:
      gl.activeTexture(gl.TEXTURE7);
      break;
  }

  const texture = gl.createTexture();//创建纹理对象，gl.deleteTexture(texture)删除纹理对象
  gl.bindTexture(gl.TEXTURE_2D, texture);//开启纹理对象，及绑定纹理对象到纹理单元（之前激活的），TEXTURE_2D：二维纹理
  //通过操作纹理单元来操作纹理对象

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);//缩小方法，四个像素平均
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);//纹理图像分配给纹理对象

  writeUniformI(gl, name, texUnit);//纹理单元传递给着色器中的取样器变量
}

function initTextures(gl, n, files, names) {
  const num = files.length;

  var flag = 0;
  for (var i = 0; i < num; i++) {
    const ii = i;
    const image = new Image();
    image.src = files[ii];
    image.onload = function () {
      loadTexture(gl, image, ii, names[ii]);

      flag++;
      if (flag == num) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
      }
    };
  }
}
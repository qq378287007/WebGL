var Vector3 = function (opt_src) {
    const v = new Float32Array(3);
    if (opt_src && typeof opt_src === 'object') {
        v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2];
    }
    this.elements = v;
};

Vector3.prototype.normalize = function () {
    const v = this.elements;
    const c = v[0], d = v[1], e = v[2];
    const g = Math.sqrt(c * c + d * d + e * e);
    if (g) {
        if (g == 1)
            return this;
    } else {
        v[0] = 0; v[1] = 0; v[2] = 0;
        return this;
    }
    v[0] /= g; v[1] /= g; v[2] /= g;
    return this;
};

var Vector4 = function (opt_src) {
    const v = new Float32Array(4);
    if (opt_src && typeof opt_src === 'object') {
        v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2]; v[3] = opt_src[3];
    }
    this.elements = v;
};

var Matrix4 = function (opt_src) {
    const d = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ]);
    if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
        const s = opt_src.elements;
        for (var i = 0; i < 16; ++i)
            d[i] = s[i];
    }
    this.elements = d;
};

Matrix4.prototype.setIdentity = function () {
    const e = this.elements;
    e[0] = 1; e[4] = 0; e[8] = 0; e[12] = 0;
    e[1] = 0; e[5] = 1; e[9] = 0; e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    return this;
};

Matrix4.prototype.set = function (src) {
    const s = src.elements;
    const d = this.elements;

    if (s === d)
        return;

    for (var i = 0; i < 16; ++i)
        d[i] = s[i];

    return this;
};

Matrix4.prototype.concat = function (other) {
    const e = this.elements;
    const a = this.elements;
    const b = other.elements;

    if (e === b) {
        b = new Float32Array(16);
        for (var i = 0; i < 16; ++i)
            b[i] = e[i];
    }

    for (var i = 0; i < 4; i++) {
        const ai0 = a[i]; const ai1 = a[i + 4]; const ai2 = a[i + 8]; const ai3 = a[i + 12];
        e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
        e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
        e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
        e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }

    return this;
};

Matrix4.prototype.multiply = Matrix4.prototype.concat;

Matrix4.prototype.multiplyVector3 = function (pos) {
    const e = this.elements;
    const p = pos.elements;
    const v = new Vector3();
    const result = v.elements;

    result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + e[12];
    result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + e[13];
    result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[14];

    return v;
};

Matrix4.prototype.multiplyVector4 = function (pos) {
    const e = this.elements;
    const p = pos.elements;
    const v = new Vector4();
    const result = v.elements;

    result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + p[3] * e[12];
    result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + p[3] * e[13];
    result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
    result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];

    return v;
};

Matrix4.prototype.translate = function (x, y, z) {
    const e = this.elements;
    e[12] += e[0] * x + e[4] * y + e[8] * z;
    e[13] += e[1] * x + e[5] * y + e[9] * z;
    e[14] += e[2] * x + e[6] * y + e[10] * z;
    e[15] += e[3] * x + e[7] * y + e[11] * z;
    return this;
};

Matrix4.prototype.setInverseOf = function (other) {
    const s = other.elements;
    const d = this.elements;
    const inv = new Float32Array(16);

    inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
        + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
    inv[4] = - s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
        - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
    inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
        + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
    inv[12] = - s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
        - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];

    inv[1] = - s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
        - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
    inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
        + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
    inv[9] = - s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
        - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
    inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
        + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];

    inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
        + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
    inv[6] = - s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
        - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
    inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
        + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
    inv[14] = - s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
        - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];

    inv[3] = - s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
        - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
    inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
        + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
    inv[11] = - s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
        - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
    inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
        + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];

    const det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
    if (det === 0)
        return this;

    for (var i = 0; i < 16; i++)
        d[i] = inv[i] / det;

    return this;
};

Matrix4.prototype.invert = function () {
    return this.setInverseOf(this);
};

Matrix4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
    if (left === right || bottom === top || near === far)
        throw 'null frustum';

    const rw = 1 / (right - left);
    const rh = 1 / (top - bottom);
    const rd = 1 / (far - near);

    const e = this.elements;

    e[0] = 2 * rw;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = 2 * rh;
    e[6] = 0;
    e[7] = 0;

    e[8] = 0;
    e[9] = 0;
    e[10] = -2 * rd;
    e[11] = 0;

    e[12] = -(right + left) * rw;
    e[13] = -(top + bottom) * rh;
    e[14] = -(far + near) * rd;
    e[15] = 1;

    return this;
};

Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
    return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
};

Matrix4.prototype.setFrustum = function (left, right, bottom, top, near, far) {
    if (left === right || top === bottom || near === far)
        throw 'null frustum';

    if (near <= 0)
        throw 'near <= 0';

    if (far <= 0)
        throw 'far <= 0';

    const rw = 1 / (right - left);
    const rh = 1 / (top - bottom);
    const rd = 1 / (far - near);

    const e = this.elements;

    e[0] = 2 * near * rw;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = 2 * near * rh;
    e[6] = 0;
    e[7] = 0;

    e[8] = (right + left) * rw;
    e[9] = (top + bottom) * rh;
    e[10] = -(far + near) * rd;
    e[11] = -1;

    e[12] = 0;
    e[13] = 0;
    e[14] = -2 * near * far * rd;
    e[15] = 0;

    return this;
};

Matrix4.prototype.frustum = function (left, right, bottom, top, near, far) {
    return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
};

Matrix4.prototype.setPerspective = function (fovy, aspect, near, far) {
    if (near === far || aspect === 0)
        throw 'null frustum';

    if (near <= 0)
        throw 'near <= 0';

    if (far <= 0)
        throw 'far <= 0';

    fovy = Math.PI * fovy / 180 / 2;
    const s = Math.sin(fovy);
    if (s === 0)
        throw 'null frustum';

    const rd = 1 / (far - near);
    const ct = Math.cos(fovy) / s;

    const e = this.elements;

    e[0] = ct / aspect;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = ct;
    e[6] = 0;
    e[7] = 0;

    e[8] = 0;
    e[9] = 0;
    e[10] = -(far + near) * rd;
    e[11] = -1;

    e[12] = 0;
    e[13] = 0;
    e[14] = -2 * near * far * rd;
    e[15] = 0;

    return this;
};

Matrix4.prototype.perspective = function (fovy, aspect, near, far) {
    return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
};

Matrix4.prototype.setScale = function (x, y, z) {
    const e = this.elements;
    e[0] = x; e[4] = 0; e[8] = 0; e[12] = 0;
    e[1] = 0; e[5] = y; e[9] = 0; e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] = z; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    return this;
};

Matrix4.prototype.scale = function (x, y, z) {
    const e = this.elements;
    e[0] *= x; e[4] *= y; e[8] *= z;
    e[1] *= x; e[5] *= y; e[9] *= z;
    e[2] *= x; e[6] *= y; e[10] *= z;
    e[3] *= x; e[7] *= y; e[11] *= z;
    return this;
};

Matrix4.prototype.setTranslate = function (x, y, z) {
    const e = this.elements;
    e[0] = 1; e[4] = 0; e[8] = 0; e[12] = x;
    e[1] = 0; e[5] = 1; e[9] = 0; e[13] = y;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = z;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    return this;
};

Matrix4.prototype.translate = function (x, y, z) {
    const e = this.elements;
    e[12] += e[0] * x + e[4] * y + e[8] * z;
    e[13] += e[1] * x + e[5] * y + e[9] * z;
    e[14] += e[2] * x + e[6] * y + e[10] * z;
    e[15] += e[3] * x + e[7] * y + e[11] * z;
    return this;
};

Matrix4.prototype.setRotate = function (angle, x, y, z) {
    angle *= Math.PI / 180;
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const e = this.elements;

    if (0 != x && 0 == y && 0 == z) {
        if (x < 0)
            s = -s;
        e[0] = 1; e[4] = 0; e[8] = 0; e[12] = 0;
        e[1] = 0; e[5] = c; e[9] = -s; e[13] = 0;
        e[2] = 0; e[6] = s; e[10] = c; e[14] = 0;
        e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    } else if (0 == x && 0 != y && 0 == z) {
        if (y < 0)
            s = -s;
        e[0] = c; e[4] = 0; e[8] = s; e[12] = 0;
        e[1] = 0; e[5] = 1; e[9] = 0; e[13] = 0;
        e[2] = -s; e[6] = 0; e[10] = c; e[14] = 0;
        e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    } else if (0 == x && 0 == y && 0 != z) {
        if (z < 0)
            s = -s;
        e[0] = c; e[4] = -s; e[8] = 0; e[12] = 0;
        e[1] = s; e[5] = c; e[9] = 0; e[13] = 0;
        e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
        e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    } else {
        const len = Math.sqrt(x * x + y * y + z * z);
        if (len != 1) {
            const rlen = 1 / len;
            x *= rlen;
            y *= rlen;
            z *= rlen;
        }
        const nc = 1 - c;
        const xy = x * y;
        const yz = y * z;
        const zx = z * x;
        const xs = x * s;
        const ys = y * s;
        const zs = z * s;

        e[0] = x * x * nc + c;
        e[1] = xy * nc + zs;
        e[2] = zx * nc - ys;
        e[3] = 0;

        e[4] = xy * nc - zs;
        e[5] = y * y * nc + c;
        e[6] = yz * nc + xs;
        e[7] = 0;

        e[8] = zx * nc + ys;
        e[9] = yz * nc - xs;
        e[10] = z * z * nc + c;
        e[11] = 0;

        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;
    }
    return this;
};

Matrix4.prototype.rotate = function (angle, x, y, z) {
    return this.concat(new Matrix4().setRotate(angle, x, y, z));
};

Matrix4.prototype.setLookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    var fx = centerX - eyeX;
    var fy = centerY - eyeY;
    var fz = centerZ - eyeZ;
    const rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
    fx *= rlf;
    fy *= rlf;
    fz *= rlf;

    var sx = fy * upZ - fz * upY;
    var sy = fz * upX - fx * upZ;
    var sz = fx * upY - fy * upX;
    const rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
    sx *= rls;
    sy *= rls;
    sz *= rls;

    const ux = sy * fz - sz * fy;
    const uy = sz * fx - sx * fz;
    const uz = sx * fy - sy * fx;

    const e = this.elements;
    e[0] = sx;
    e[1] = ux;
    e[2] = -fx;
    e[3] = 0;

    e[4] = sy;
    e[5] = uy;
    e[6] = -fy;
    e[7] = 0;

    e[8] = sz;
    e[9] = uz;
    e[10] = -fz;
    e[11] = 0;

    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;

    return this.translate(-eyeX, -eyeY, -eyeZ);
};

Matrix4.prototype.lookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
};

Matrix4.prototype.dropShadow = function (plane, light) {
    const mat = new Matrix4();
    const e = mat.elements;
    const dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];

    e[0] = dot - light[0] * plane[0];
    e[1] = - light[1] * plane[0];
    e[2] = - light[2] * plane[0];
    e[3] = - light[3] * plane[0];

    e[4] = - light[0] * plane[1];
    e[5] = dot - light[1] * plane[1];
    e[6] = - light[2] * plane[1];
    e[7] = - light[3] * plane[1];

    e[8] = - light[0] * plane[2];
    e[9] = - light[1] * plane[2];
    e[10] = dot - light[2] * plane[2];
    e[11] = - light[3] * plane[2];

    e[12] = - light[0] * plane[3];
    e[13] = - light[1] * plane[3];
    e[14] = - light[2] * plane[3];
    e[15] = dot - light[3] * plane[3];

    return this.concat(mat);
};

Matrix4.prototype.dropShadowDirectionally = function (normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
    const a = planeX * normX + planeY * normY + planeZ * normZ;
    return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
};

"use strict";

var canvas;
var gl;

//var vertices_t = [];
var vertices_a = [];
var vertices_b = [];
var vertices_c = [];

//var slider_angle;
var slider_angle_a;
var slider_angle_b;
var slider_angle_c;

//animetion
var slider_angle_a_old = 0;
var slider_angle_b_old = 0;
var slider_angle_c_old = 0;
var animation;
var speed = 20; 
var jump =5;
//end animation


window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');

    if (!gl) {
        alert("WebGL 2.0 isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var aResolution = gl.getUniformLocation(program, "aResolution");
    gl.uniform2f(aResolution, canvas.width, canvas.height);

    vertices_a = [vec2(0, 0), vec2(250.0, 0), vec2(250.0, -100.0), vec2(0, -100.0)];

    vertices_b = [vec2(250.0, 0), vec2(450.0, 0), vec2(450.0, -100.0), vec2(250.0, -100.0)];

    vertices_c = [vec2(450.0, 0), vec2(650.0, 0), vec2(650, -100.0), vec2(450.0, -100.0)];

    slider_angle_a = 0;
    slider_angle_b = 0;
    slider_angle_c = 0;

    renderCoordinate(program, 0, 0);
    renderT(program, vertices_a);
    renderT(program, vertices_b);
    renderT(program, vertices_c);

   
    document.getElementById("slider_angle_a").onchange = function(event) {


        let target_value = parseFloat(event.target.value);

        let start_value = slider_angle_a_old;
        slider_angle_a_old = target_value;

        clearInterval(animation);
        if(target_value < start_value){
            animation = setInterval(function(){ 
                
                start_value -=jump;
                if(target_value >= start_value){
                    clearInterval(animation);
                }
                changePosisionA(start_value);
            }, speed);
        }
        else if(target_value > start_value){
            animation = setInterval(function(){ 
                
                start_value +=jump;
                if(target_value <= start_value){
                    clearInterval(animation);
                }
                changePosisionA(start_value);
            }, speed);
        } 
    };

    function changePosisionA(start_value) {
        var sliderAngleBElm = document.getElementById("slider_angle_b").value;
        var sliderAngleCElm = document.getElementById("slider_angle_c").value;

        slider_angle_a = start_value;
        slider_angle_b = parseFloat(sliderAngleBElm) + slider_angle_a;
        slider_angle_c = parseFloat(sliderAngleCElm) + slider_angle_b;


        var vertices_new_a = transform_rotate(vertices_a, slider_angle_a, 0, 0);

        var ponitB = vertices_new_a[1];
        vertices_b = [vec2(0, 0), vec2(200.0, 0), vec2(200.0, -100), vec2(0, -100.0)];
        var vertices_new_b = transform_rotate(vertices_b, slider_angle_b, ponitB[0], ponitB[1]);

        var ponitC = vertices_new_b[1];
        vertices_c = [vec2(0, 0), vec2(200.0, 0), vec2(200.0, -100), vec2(0, -100.0)];
        var vertices_new_c = transform_rotate(vertices_b, slider_angle_c, ponitC[0], ponitC[1]);

        renderCoordinate(program, 0, 0);
        renderT(program, vertices_new_a);
        renderT(program, vertices_new_b);
        renderT(program, vertices_new_c);
    }

    document.getElementById("slider_angle_b").onchange = function(event) {
        let target_value = parseFloat(event.target.value);

        let start_value = slider_angle_b_old;
        slider_angle_b_old = target_value;


       clearInterval(animation);
        if(target_value < start_value){
            animation = setInterval(function(){ 
                
                start_value -=jump;
                if(target_value >= start_value){
                    clearInterval(animation);
                }
                changePosisionB(start_value);
            }, speed);
        }
        else if(target_value > start_value){
            animation = setInterval(function(){ 
                
                start_value +=jump;
                if(target_value <= start_value){
                    clearInterval(animation);
                }
                changePosisionB(start_value);
            }, speed);
        } 
    };
    function changePosisionB(start_value){
        var sliderAngleAElm = document.getElementById("slider_angle_a").value;
        var sliderAngleCElm = document.getElementById("slider_angle_c").value;

        slider_angle_a = parseFloat(sliderAngleAElm);
        slider_angle_b = parseFloat(start_value) + slider_angle_a;
        slider_angle_c = parseFloat(sliderAngleCElm) + slider_angle_b;

        var vertices_new_a = transform_rotate(vertices_a, slider_angle_a, 0, 0);

        var ponitB = vertices_new_a[1];
        vertices_b = [vec2(0, 0), vec2(200.0, 0), vec2(200.0, -100), vec2(0, -100.0)];
        var vertices_new_b = transform_rotate(vertices_b, slider_angle_b, ponitB[0], ponitB[1]);

        var ponitC = vertices_new_b[1];
        vertices_c = [vec2(0, 0), vec2(200.0, 0), vec2(200.0, -100), vec2(0, -100.0)];
        var vertices_new_c = transform_rotate(vertices_b, slider_angle_c, ponitC[0], ponitC[1]);

        renderCoordinate(program, 0, 0);
        renderT(program, vertices_new_a);
        renderT(program, vertices_new_b);
        renderT(program, vertices_new_c);
    }


    document.getElementById("slider_angle_c").onchange = function(event) {
        let target_value = parseFloat(event.target.value);

        let start_value = slider_angle_c_old;
        slider_angle_c_old = target_value;


       clearInterval(animation);
        if(target_value < start_value){
            animation = setInterval(function(){ 
                
                start_value -=jump;
                if(target_value >= start_value){
                    clearInterval(animation);
                }
                changePosisionC(start_value);
            }, speed);
        }
        else if(target_value > start_value){
            animation = setInterval(function(){ 
                
                start_value +=jump;
                if(target_value <= start_value){
                    clearInterval(animation);
                }
                changePosisionC(start_value);
            }, speed);
        }         
    };
    function changePosisionC(start_value){
        var sliderAngleAElm = document.getElementById("slider_angle_a").value;
        var sliderAngleBElm = document.getElementById("slider_angle_b").value;

        slider_angle_a = parseFloat(sliderAngleAElm);
        slider_angle_b = parseFloat(sliderAngleBElm) + slider_angle_a;
        slider_angle_c = parseFloat(start_value) + slider_angle_b;

        var vertices_new_a = transform_rotate(vertices_a, slider_angle_a, 0, 0);
        var ponitB = vertices_new_a[1];
        vertices_b = [vec2(0, 0), vec2(200.0, 0), vec2(200.0, -100), vec2(0, -100.0)];
        var vertices_new_b = transform_rotate(vertices_b, slider_angle_b, ponitB[0], ponitB[1]);

        var ponitC = vertices_new_b[1];
        vertices_c = [vec2(0, 0), vec2(200.0, 0), vec2(200.0, -100), vec2(0, -100.0)];
        var vertices_new_c = transform_rotate(vertices_b, slider_angle_c, ponitC[0], ponitC[1]);

        renderCoordinate(program, 0, 0);

        renderT(program, vertices_new_a);
        renderT(program, vertices_new_b);
        renderT(program, vertices_new_c);
  }
};

  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderCoordinate(program, x, y) {
    var vertices = [
        vec2(x, -canvas.height),
        vec2(x, canvas.height),
        vec2(-canvas.width, y),
        vec2(canvas.width, y)
    ];
    supportRender(program, vertices);
    gl.drawArrays(gl.LINES, 0, vertices.length);
}

function renderT(program, vertices) {
    setRectangle(program, vertices[0], vertices[1], vertices[2], vertices[3]);
    //setRectangle(program, vertices_t[4], vertices_t[5], vertices_t[6], vertices_t[7]);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function supportRender(program, vertices) {
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
}

function setRectangle(program, v1, v2, v3, v4) {
    var vertices = [v1, v2, v3, v4];

    supportRender(program, vertices);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function transform_rotate(vertices_in, angle, x, y) {
    var angleInRadians = angle * Math.PI / 180;

    var mat3_t = mat3(
        Math.cos(angleInRadians), -Math.sin(angleInRadians), x,
        Math.sin(angleInRadians), Math.cos(angleInRadians), y,
        0.0, 0.0, 1.0
    );

    var vertices_out = [];

    for (var i = 0; i < vertices_in.length; i++) {
        var vec3_p = vec3(vertices_in[i][0], vertices_in[i][1], 1.0);
        var vec3_q = mult(mat3_t, vec3_p);

        vertices_out.push(vec2(vec3_q[0], vec3_q[1]));
    }

    return vertices_out;

}
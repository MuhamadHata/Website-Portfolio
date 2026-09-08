import React, { useEffect, useRef, useState } from 'react';
import { playP5PaperTear } from '../utils/soundEffects';

/**
 * P5TearRevealOverlay — Authentic Persona 5 Paper Tear Transition
 * 
 * Uses real-time WebGL GPU shader to convert "Paper Tear transition.mp4" into a dynamic
 * luminance mask:
 * - White regions in the reference video represent the opening tear hole (transparent, revealing the modal beneath)
 * - Black regions represent the dark Persona 5 paper covering the screen
 * - Fiber highlights along the tear edge glow with authentic paper texture
 * - Zero black screen blocking; the dossier content is revealed through the expanding tear hole
 */
export default function P5TearRevealOverlay({ onComplete }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const reqIdRef = useRef(null);

  useEffect(() => {
    playP5PaperTear();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = document.createElement('video');
    video.src = '/animation/Paper Tear transition.mp4';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    videoRef.current = video;

    let gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      gl = canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false });
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    if (gl) {
      const vsSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
          v_texCoord = a_texCoord;
        }
      `;

      const fsSource = `
        precision mediump float;
        uniform sampler2D u_video;
        varying vec2 v_texCoord;

        void main() {
          vec4 col = texture2D(u_video, v_texCoord);
          float luma = dot(col.rgb, vec3(0.299, 0.587, 0.114));
          
          // Where luma is high (white tear opening), alpha = 0.0 (transparent -> modal visible)
          // Where luma is low (black paper sheet), alpha = 1.0 (paper covering)
          float alpha = 1.0 - smoothstep(0.12, 0.65, luma);
          
          // Deep velvet Persona 5 black background
          vec3 paperColor = vec3(0.04, 0.04, 0.055);
          
          // Paper fiber edge highlight along the tear rim
          float fiber = smoothstep(0.1, 0.35, luma) * (1.0 - smoothstep(0.65, 0.95, luma));
          vec3 fiberColor = vec3(1.0, 1.0, 1.0);
          
          vec3 finalColor = mix(paperColor, fiberColor, fiber * 0.95);
          gl_FragColor = vec4(finalColor, alpha);
        }
      `;

      const createShader = (glContext, type, source) => {
        const shader = glContext.createShader(type);
        glContext.shaderSource(shader, source);
        glContext.compileShader(shader);
        return shader;
      };

      const program = gl.createProgram();
      gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
      gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
      gl.linkProgram(program);
      gl.useProgram(program);

      // Setup quad geometry
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,  1, -1, -1,  1,
          -1,  1,  1, -1,  1,  1,
        ]),
        gl.STATIC_DRAW
      );

      const aPosition = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      // Texture coords (flip Y for video coordinate orientation)
      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          0, 1,  1, 1,  0, 0,
          0, 0,  1, 1,  1, 0,
        ]),
        gl.STATIC_DRAW
      );

      const aTexCoord = gl.getAttribLocation(program, 'a_texCoord');
      gl.enableVertexAttribArray(aTexCoord);
      gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);

      // Texture binding
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const render = () => {
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        if (!video.ended && !video.paused) {
          reqIdRef.current = requestAnimationFrame(render);
        }
      };

      video.addEventListener('play', () => {
        reqIdRef.current = requestAnimationFrame(render);
      });

      video.addEventListener('ended', () => {
        if (onComplete) onComplete();
      });

      video.play().catch((err) => {
        console.warn('Tear video play error:', err);
        setTimeout(() => { if (onComplete) onComplete(); }, 750);
      });
    } else {
      // Fallback if WebGL unsupported
      const ctx = canvas.getContext('2d');
      const render2D = () => {
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        if (!video.ended) {
          reqIdRef.current = requestAnimationFrame(render2D);
        }
      };
      video.addEventListener('play', () => { reqIdRef.current = requestAnimationFrame(render2D); });
      video.addEventListener('ended', () => { if (onComplete) onComplete(); });
      video.play().catch(() => setTimeout(onComplete, 750));
    }

    // Safety timeout
    const fallbackTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(fallbackTimer);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      if (video) {
        video.pause();
        video.src = '';
      }
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 9999999 }}
    >
      {/* Comic Slash Flash Light Beam across opening point */}
      <div 
        className="p5-slash-flash absolute w-[220vw] h-6 bg-white -rotate-35 shadow-[0_0_40px_#FFFFFF,0_0_80px_#E60012] pointer-events-none z-30"
      />

      {/* Real-time WebGL Mask Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
}

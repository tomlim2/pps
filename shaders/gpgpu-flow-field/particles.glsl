void main()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particle = texture(uParticles, uv);
    particle.x += 0.01;
    gl_FragColor = particle;
    // gl_FragColor = vec4(1.,1.,0.,0.);
}
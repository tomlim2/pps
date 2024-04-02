varying vec3 vNormal;
varying vec3 vPosition;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;
uniform vec2 uResolution;

varying vec3 vColor;

attribute float aIntensity;
attribute float aAngle;

void main()
{
    // Displacement
    vec3 newPosition = position;
    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);

    vec3 displacement = vec3(
        cos(aAngle) * 0.2,
        sin(aAngle) * 0.2,
        1.0
    );
    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 3.0;
    displacement *= aIntensity;
    
    newPosition += displacement;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Picture
    float pictureIntensity = texture(uPictureTexture, uv).r;
    // float pictureIntensity = texture(uDisplacementTexture, uv).r;

    // Point size
    gl_PointSize = 0.05 * pictureIntensity * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

     // Varyings
    vColor = vec3(pow(pictureIntensity, 2.0));
}